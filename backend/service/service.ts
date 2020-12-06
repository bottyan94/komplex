import * as db from '../db/db'

export const login = async (username: string, password: string) => {
  return await db.login(username, password)
}
export const getAllItem = async () => {
  return await db.getAllItem()
}
export const getFreqList = async () => {
  return await db.getFreqList()
}
export const getUserItemList = async (userID: number) => {
  return await db.getUserItemList(userID)
}
export const addItemToUserList = async (item: object, userID: number) => {
  return await db.addItemToUserList(item, userID)
}
export const removeItemToUserList = async (item: object, userID: number) => {
  return await db.removeItemToUserList(item, userID)
}
export const addItem = async (item: string, userID: number) => {
  const result = await db.addItem(item)
  return await db.addItemToUserList(result, userID)
}
