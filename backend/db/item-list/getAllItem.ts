import { pool } from "../.."

export const getAllItem = async () => {
  const db = await pool.connect()
  try {
    const result = await db.query(`select * from items`)
    return { items: result.rows }
  }
  catch (err) {
    console.log(err)
    return { success: false, msg: err.message }
  }
  finally {
     db.release();
  }
}