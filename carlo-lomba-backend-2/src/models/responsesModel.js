const { getDb } = require('../config/db');

class ResponsesModel {
  static async create(phone_number) {
    const pool = await getDb();
    const conn = await pool.getConnection();
    try {
          const query = 'INSERT INTO responses (phone_number) VALUES (?)';
    const [result] = await conn.query(query, [phone_number]);
    return result;
    } catch (error) {
      throw error
    }finally{
      conn.release();
    }

  }

  static async readAll() {
    const pool = await getDb();
    const conn = await pool.getConnection();

    try {
       const query = 'SELECT * FROM responses';
    const [rows] = await conn.query(query);
    return rows;
    } catch (error) {
      throw error
    }finally{
      conn.release();
    }
   
  }

  static async readById(id) {
    const pool = await getDb();
    const conn = await pool.getConnection();

    try {
          const query = 'SELECT * FROM responses WHERE response_id = ?';
    const [rows] = await conn.query(query, [id]);
    return rows[0];
    } catch (error) {
      throw error
    }finally{
      conn.release();
    }

  }

  
  static async readByPhoneNumber(phone_number) {
    const pool = await getDb();
    const conn = await pool.getConnection();

    try {
          const query = 'SELECT * FROM responses WHERE phone_number = ?';
    const [rows] = await conn.query(query, [phone_number]);
    return rows[0];
    } catch (error) {
      throw error
    }finally{
      conn.release();
    }

  }
    static async readByPhoneNumber(phone_number) {
    const pool = await getDb();
    const conn = await pool.getConnection();

    try {
          const query = 'SELECT * FROM responses WHERE phone_number = ?';
    const [rows] = await conn.query(query, [phone_number]);
    return rows[0];
    } catch (error) {
      throw error
    }finally{
      conn.release();
    }

  }

  static async updateById(id, data) {
    const conn = await getDb();
    const query = 'UPDATE responses SET choice = ?, phone_number = ?, success = ?, otp = ?, authorized=? WHERE response_id = ?';
    const [result] = await conn.query(query, [
      data.choice,
      data.phone_number,
      data.success,
      data.otp,
      data.authorized,
      id,
    ]);
    return result.affectedRows === 1;
  }

  
  static async updateByNumber( data) {
    const pool = await getDb();
    const conn = await pool.getConnection();
    try {
    const query = 'UPDATE responses SET choice = ?, success = ?, otp = ?, authorized=? WHERE phone_number = ?';
    const [result] = await conn.query(query, [
      data.choice,
      data.success,
      data.otp,
      data.authorized,
            data.phone_number
    ]);
    return result.affectedRows === 1;
    } catch (error) {
      throw error
    }finally{
      conn.release();
    }
    }
  
  

  static async deleteById(id) {
    const conn = await getDb();
    const query = 'DELETE FROM responses WHERE response_id = ?';
    const [result] = await conn.query(query, [id]);
    return result.affectedRows === 1;
  }


  static async countResponses(){
        const pool = await getDb();
        const conn = await pool.getConnection();
    try {
        const query = `
          SELECT
              COUNT(*) AS total,
              COUNT(CASE WHEN success = 1 AND authorized = 1 THEN 1 END) AS total_success,
              COUNT(CASE WHEN success = 0 AND authorized = 1 THEN 1 END) AS total_authorized,
              COUNT(CASE WHEN success = 0 AND authorized = 0 THEN 1 END) AS total_not_authorized
          FROM responses
          WHERE DATE(date_created) = CURDATE();

        `;
          const [rows] = await conn.query(query);
          console.log(rows);
    return rows;
    } catch (error) {
      throw error
    }
    finally{
      conn.release();
    }

  }


}



module.exports = ResponsesModel;