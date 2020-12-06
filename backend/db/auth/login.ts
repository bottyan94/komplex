import { pool } from "../.."

export const login = async (username, password) => {
  const db = await pool.connect()
  try {
    const result = await db.query(`select * from users where name = '${username}' AND password = '${password}'`)
    if (!result || result.rows[0].length === 0) {
      return { success: false, msg: 'Hibás felhsaználónév vagy jelszó!' }
    }
    return { success: true, user: result.rows[0], msg: 'Sikeres bejelentkezés' }
  }
  catch (err) {
    console.log(err)
    return { success: false, msg: err.message }
  }
  finally {
     db.release();
  }
}