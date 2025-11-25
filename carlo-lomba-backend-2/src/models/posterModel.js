const mysql = require('mysql2/promise');
const { getDb } = require('../config/db');

class PosterModel {
  static async create(data) {

  const pool = await getDb();
  const conn = await pool.getConnection(); // ? Explicit connection

    try {
    const query = 'INSERT INTO posters (image_url, poster_name, pembuat,description) VALUES (?,?,?,?)';
    const [result] = await conn.query(query, [
      data.image_url,
      data.poster_name,
      data.pembuat,
      data.description
    ]);
    return result;
    } catch (error) {
          throw error;

    }finally{
      conn.release();
    }
   
  }

  static async readAll() {

  const pool = await getDb();
  const conn = await pool.getConnection(); // ? Explicit connection
    
    try {
       const query = 'SELECT poster_id as `id`, image_url as `imageUrl`, poster_name as `title`, pembuat `from`, description, votes FROM posters';
    const [rows] = await conn.query(query);
    return rows;
    } catch (error) {
      throw error
    }finally{
      conn.release();
    }
 
  }

  static async readById(id) {
    
    const conn = await getDb();
    const query = 'SELECT poster_id as `id`, image_url as `imageUrl`, poster_name as `title`, pembuat `from`, description, votes FROM posters WHERE poster_id = ?';
    const [rows] = await conn.query(query, [id]);
    return rows[0];
  }

  static async updateById(id, data) {
    const conn = await getDb();
    const query = 'UPDATE posters SET image_url = ?, poster_name = ?, pembuat = ?, description = ?, votes = ? WHERE poster_id = ?';
    const [result] = await conn.query(query, [
      data.image_url,
      data.poster_name,
      data.pembuat,
      data.description,
      data.votes,
      id,
    ]);
    return result.affectedRows === 1;
  }

static async updateVoting(id) {
  const pool = await getDb();
  const conn = await pool.getConnection();

  try {
    const query = 'UPDATE posters SET votes = votes + 1 WHERE poster_id = ?';
    const [result] = await conn.query(query, [id]);

    return result.affectedRows === 1;
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
}


  static async deleteById(id) {
    const conn = await getDb();
    const query = 'DELETE FROM posters WHERE poster_id = ?';
    const [result] = await conn.query(query, [id]);
    return result.affectedRows === 1;
  }
}

module.exports = PosterModel;
