import apisauce from "apisauce";
import CryptoJS from "crypto-js";

const generateSignature = (
  consId: string,
  secretKey: string,
  type?: string
) => {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  let message = timestamp + consId;
  if (type == "erssc") {
    message = `${consId}&${timestamp}`;
  }
  const signatureHmacSHA256 = CryptoJS.HmacSHA256(message, secretKey);

  const signatureBase64 = CryptoJS.enc.Base64.stringify(signatureHmacSHA256);

  return { signatureBase64, timestamp };
};

export async function apiAdmin(apiKey?: string) {
  const baseURL = process.env.API_BASE_URL_PROD;
  return apisauce.create({
    baseURL,
    headers: {
      "X-API-KEY": apiKey,
      "access-token": process.env.TOKEN,
      Accept: "application/json",
    },
    timeout: 300000, // timeout mamenit..
  });
}

export async function apiPublic(apiKey?: string) {
  const baseURL = `${process.env.URL_GOOGLE}/medapp-v2/public/medapp/api/v1/display/`;
  return apisauce.create({
    baseURL,
    headers: {
      "X-API-KEY": apiKey,
      "access-token": process.env.TOKEN,
      Accept: "application/json",
    },
    timeout: 300000, // timeout mamenit..
  });
}

export async function apiPublic2() {
  const baseURL = `http://192.168.6.136:8080/v1/callback/carolus`;
  return apisauce.create({
    baseURL,
    headers: {
      "X-API-KEY": "test-key",
    },
    timeout: 300000, // timeout mamenit..
  });
}

export async function apiStatusObatFarmasi() {
  const baseURL = process.env.API_STATUS_OBAT_FARMASI || "";
  const consId = process.env.CONSUMER_ID || "";
  const secretKey = process.env.PASSWORD || "";
  const signature = generateSignature(consId, secretKey);
  return apisauce.create({
    baseURL,
    headers: {
      Accept: "application/json",
      "x-cons-id": consId,
      "x-timestamp": signature.timestamp,
      "x-signature": signature.signatureBase64,
    },
    timeout: 300000, // timeout mamenit..
  });
}

export async function apiERSSC() {
  const baseURL = process.env.API_ERSSC || "";
  const consId = process.env.CONSUMER_ID || "";
  const secretKey = process.env.PASSWORD || "";
  const signature = generateSignature(consId, secretKey, "erssc");
  return apisauce.create({
    baseURL,
    headers: {
      Accept: "application/json",
      "x-cons-id": consId,
      "x-timestamp": signature.timestamp,
      "x-signature": signature.signatureBase64,
    },
    timeout: 300000, // timeout mamenit..
  });
}
