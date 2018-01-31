/**
 * Created by mas on 2017/11/15.
 */
import {OTHERLOGINTOKEN, OTHERLIVTOKENT} from '@/config'

let key = CryptoJS.enc.Utf8.parse(OTHERLOGINTOKEN)

let iv = CryptoJS.enc.Utf8.parse(OTHERLIVTOKENT)

/**
 * 加密
 * @param word
 * @returns {string}
 * @constructor
 */
export function Encrypt (word) {
  let srcs = CryptoJS.enc.Utf8.parse(word)
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7})
  return encrypted.ciphertext.toString().toLowerCase()
}

/**
 * 解密
 * @param word
 * @constructor
 */
export function Decrypt(word) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word)
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  let decrypt = CryptoJS.AES.decrypt(srcs, key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7})
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}
