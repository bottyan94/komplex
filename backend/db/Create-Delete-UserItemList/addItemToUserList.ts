import { pool } from "../.."

export const addItemToUserList = async (item, userID) => {
  const db = await pool.connect()
  try {
    const result = await db.query(`INSERT INTO  public."userItemList" 
      SELECT ${userID},${item.id}
      WHERE
          NOT EXISTS (
              SELECT * FROM public."userItemList"  WHERE  public."userItemList"."itemID" = ${item.id}
          )`);
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