// src/handler/timeHandler.js
const moment = require('moment-timezone');

/**
 * Mengembalikan waktu saat ini dalam zona waktu Asia/Jakarta dengan format MySQL TIMESTAMP.
 * @returns {string} Waktu dalam format "YYYY-MM-DD HH:mm:ss"
 */
const getCurrentTimestamp = () => {
  return moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
};

/**
 * Mengonversi timestamp ke zona waktu Asia/Jakarta dalam format MySQL TIMESTAMP.
 * @param {string|Date} timestamp - Waktu yang akan dikonversi.
 * @returns {string|null} Waktu dalam format "YYYY-MM-DD HH:mm:ss" atau null jika tidak valid.
 */
const convertToJakartaTime = (timestamp) => {
  if (!timestamp) return null;
  return moment(timestamp).tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
};


/**
 * Menghasilkan objek stamp berdasarkan status verification yang diberikan.
 * @param {string} status - Status verification: "waiting_verification", "called_verification", "recalled_verification", "pending_verification", "processed_verification", atau "completed_verification"
 * @returns {Object} Objek yang memuat semua field stamp dengan nilai timestamp atau null.
 */


module.exports = { getCurrentTimestamp, convertToJakartaTime};
