import { pool } from "../.."

export const removeItemToUserList = async (item, userID) => {
  const db = await pool.connect()
  try {
    const result = await db.query(`
      DELETE FROM public."userItemList" 
      WHERE public."userItemList"."userID" = ${userID} AND public."userItemList"."itemID" = ${item.id}
      `)
    let row = result.rowCount
    return { success: row > 0 ? true : false }
  }
  catch (err) {
    console.log(err)
  }
  finally {
     db.release();
  }
}