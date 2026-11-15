import fs from 'node:fs';
import path from 'node:path';

export type Size = { width: number; height: number };

// Reads the pixel size of an image in public/ from its header, so pages can
// give every <img> a width and height (like a hand-written 1998 page would)
// and nothing jumps around while it loads. Sniffs the bytes rather than the
// extension: waterloo-hand.png, for one, is really a JPEG.
export function imageSize(src: string): Size | undefined {
  if (!src.startsWith('/')) return undefined;
  let bytes: Buffer;
  try {
    bytes = fs.readFileSync(path.join(process.cwd(), 'public', src));
  } catch {
    return undefined;
  }

  // PNG: width and height are the first two fields of the IHDR chunk.
  if (bytes.length > 24 && bytes.readUInt32BE(0) === 0x89504e47) {
    return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
  }

  // GIF: little-endian width and height right after the signature.
  if (bytes.length > 10 && bytes.toString('ascii', 0, 3) === 'GIF') {
    return { width: bytes.readUInt16LE(6), height: bytes.readUInt16LE(8) };
  }

  // JPEG: walk the markers until a start-of-frame one.
  if (bytes.length > 4 && bytes[0] === 0xff && bytes[1] === 0xd8) {
    let i = 2;
    while (i + 9 < bytes.length) {
      if (bytes[i] !== 0xff) return undefined;
      const marker = bytes[i + 1];
      const length = bytes.readUInt16BE(i + 2);
      const isFrame = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
      if (isFrame) {
        return { width: bytes.readUInt16BE(i + 7), height: bytes.readUInt16BE(i + 5) };
      }
      i += 2 + length;
    }
  }

  return undefined;
}
