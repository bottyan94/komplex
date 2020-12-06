import { pool } from "../.."

export const addItem = async (itemname) => {
  const db = await pool.connect()
  try {
    const allList = await db.query('select * from public."items"');
    const findItem = allList.rows.find(row => row.name.toLowerCase() === itemname.toLowerCase())
    if (findItem) {
      return findItem
    } else {
      const result = await db.query(`
      INSERT INTO public."items"(id, name, used) VALUES ( default , '${itemname}', 1) RETURNING *`)
      return result.rows[0]
    }
  }
  catch (err) {
    console.log(err)
  }
  finally {
     db.release();
  }
}