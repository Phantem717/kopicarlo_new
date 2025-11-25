export function encodeBase64(payload: any) {
  const str = JSON.stringify(payload);
  return Buffer.from(str, "utf-8").toString("base64");
}

export function decodeBase64(encoded: string) {
  const str = Buffer.from(encoded, "base64").toString("utf-8");
  try {
    return JSON.parse(str);
  } catch {
    return str; // kalau bukan JSON, kembalikan string biasa
  }
}
