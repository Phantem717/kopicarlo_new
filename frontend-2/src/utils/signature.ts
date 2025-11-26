import CryptoJS from "crypto-js";

export default function generateSignature(
  consId: string,
  secretKey: string
): { timestamp: string; signature: string } {
  
//   console.log("DATA", consId, secretKey);

  // Timestamp in seconds
  const timestamp = Math.floor(Date.now() / 1000).toString();

  // Concatenate consId & timestamp
  const dataToSign = `${consId}&${timestamp}`;

  // Create HMAC SHA256 signature
  const signature = CryptoJS.HmacSHA256(dataToSign, secretKey);

  // Convert to Base64
  const signatureBase64 = CryptoJS.enc.Base64.stringify(signature);

  return {
    timestamp,
    signature: signatureBase64,
  };
}
