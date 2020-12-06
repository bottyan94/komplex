import { pool } from "../.."

export const getUserItemList = async (userID: number) => {
  const db = await pool.connect()
  try {
    const result = await db.query(`SELECT * FROM public."userItemList" 
      inner join items on items.id = public."userItemList"."itemID"
      where public."userItemList"."userID" = ${userID} `)
    return { items: result.rows }
  }
  catch (err) {
    console.log(err)
  }
  finally {
     db.release();
  }
}