import { pool } from "../.."

export const getFreqList = async () => {
  const db = await pool.connect()
  try {
    const result = await db.query(`select * from items`)
    result.rows.sort((a, b) => { b.used - a.used })
    return { items: result.rows }
  }
  catch (err) {
    console.log(err)
  }
  finally {
     db.release();
  }
}
