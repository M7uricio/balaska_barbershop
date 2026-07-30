/**
 * Move o átomo `moov` (índice/duração) para o início do arquivo MP4 sem
 * recodificar — equivalente a `ffmpeg -movflags +faststart`, mas em Node
 * puro, porque esta máquina não tem ffmpeg instalado.
 *
 * Por que isso é necessário: vídeos exportados por algumas ferramentas de
 * IA colocam o `moov` no FIM do arquivo. O navegador só descobre a
 * duração/pontos de busca depois de ler o moov, então com ele no fim o
 * <video> reporta `duration: NaN` e a busca (seek) do scroll-scrub falha.
 *
 * Uso: node scripts/faststart.js <entrada.mp4> <saida.mp4>
 */
const fs = require("fs");

const CONTAINER_BOXES = new Set([
  "moov",
  "trak",
  "mdia",
  "minf",
  "stbl",
  "mvex",
  "edts",
  "udta",
]);

function readBoxes(buf, start, end) {
  const boxes = [];
  let offset = start;
  while (offset < end) {
    let size = buf.readUInt32BE(offset);
    const type = buf.toString("ascii", offset + 4, offset + 8);
    let headerSize = 8;
    if (size === 1) {
      // 64-bit box size in bytes [offset+8, offset+16)
      size = Number(buf.readBigUInt64BE(offset + 8));
      headerSize = 16;
    } else if (size === 0) {
      size = end - offset; // extends to end of parent
    }
    boxes.push({ type, start: offset, size, headerSize });
    offset += size;
  }
  return boxes;
}

/** Soma `shift` a todo offset dentro de stco/co64, em qualquer profundidade. */
function patchChunkOffsets(buf, start, end, shift) {
  for (const box of readBoxes(buf, start, end)) {
    const payloadStart = box.start + box.headerSize;
    const payloadEnd = box.start + box.size;

    if (box.type === "stco") {
      // stco: 4 bytes versão/flags, 4 bytes contagem, N x 4 bytes offset (32-bit)
      const count = buf.readUInt32BE(payloadStart + 4);
      for (let i = 0; i < count; i++) {
        const p = payloadStart + 8 + i * 4;
        buf.writeUInt32BE(buf.readUInt32BE(p) + shift, p);
      }
    } else if (box.type === "co64") {
      // co64: igual, mas offsets de 8 bytes (64-bit)
      const count = buf.readUInt32BE(payloadStart + 4);
      for (let i = 0; i < count; i++) {
        const p = payloadStart + 8 + i * 8;
        const value = buf.readBigUInt64BE(p) + BigInt(shift);
        buf.writeBigUInt64BE(value, p);
      }
    } else if (CONTAINER_BOXES.has(box.type)) {
      patchChunkOffsets(buf, payloadStart, payloadEnd, shift);
    }
  }
}

function faststart(inputPath, outputPath) {
  const buf = fs.readFileSync(inputPath);
  const topBoxes = readBoxes(buf, 0, buf.length);

  const ftyp = topBoxes.find((b) => b.type === "ftyp");
  const moov = topBoxes.find((b) => b.type === "moov");
  const mdat = topBoxes.find((b) => b.type === "mdat");

  if (!ftyp || !moov || !mdat) {
    throw new Error(
      `Caixas essenciais não encontradas (ftyp=${!!ftyp} moov=${!!moov} mdat=${!!mdat}).`,
    );
  }
  if (moov.start < mdat.start) {
    console.log("moov já está antes do mdat — nada a fazer.");
    fs.copyFileSync(inputPath, outputPath);
    return;
  }

  const moovBuf = Buffer.from(buf.subarray(moov.start, moov.start + moov.size));
  const mdatBuf = buf.subarray(mdat.start, mdat.start + mdat.size);
  const ftypBuf = buf.subarray(ftyp.start, ftyp.start + ftyp.size);

  // Novo início do mdat = tudo que vem antes dele no arquivo final.
  const newMdatStart = ftypBuf.length + moovBuf.length;
  const oldMdatPayloadStart = mdat.start + mdat.headerSize;
  const newMdatPayloadStart = newMdatStart + mdat.headerSize;
  const shift = newMdatPayloadStart - oldMdatPayloadStart;

  patchChunkOffsets(moovBuf, 0, moovBuf.length, shift);

  fs.writeFileSync(outputPath, Buffer.concat([ftypBuf, moovBuf, mdatBuf]));
  console.log(`OK: moov (${moov.size} bytes) movido para antes do mdat. Shift aplicado: ${shift} bytes.`);
}

const [, , input, output] = process.argv;
if (!input || !output) {
  console.error("Uso: node scripts/faststart.js <entrada.mp4> <saida.mp4>");
  process.exit(1);
}
faststart(input, output);
