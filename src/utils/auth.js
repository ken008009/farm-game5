const tagToken = 'jwt_token'
const tagAddr = 'address'
const tagSign = 'sign'
const tagCanLand = 'canLand'
const tagCanPlayAdd = 'canPlayAdd'


export function setToken(token) {
  localStorage.setItem(tagToken, `Bearer ${token}`)
}
export function getToken() {
  // return 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBZGRyZXNzIjoiMHhjMjkwN2JCMEI2MDEwRjYzRDEyRmFEMEQyYzMyNzBjYTU2MzM1RTE2IiwiaXNzIjoiZ2FtZSIsImV4cCI6MTc0MjMxMzQ4NywibmJmIjoxNzQyMTQwNjg3fQ.JjGGNxzDf9Otl-bNx5h53TQKhhtnQpi5hVWnoKrAwZo'
  return localStorage.getItem(tagToken) || ''
}

export function setAddr(addr) {
  localStorage.setItem(tagAddr, addr)
}
export function getAddr() {
  return localStorage.getItem(tagAddr) || ''
}

export function setSign(sign) {
  localStorage.setItem(tagSign, sign)
}
export function getSign() {
  return localStorage.getItem(tagSign) || ''
}
export function setCanLand(status) {
  localStorage.setItem(tagCanLand, status)
  
}
export function getCanLand() {
  const flag = localStorage.getItem(tagCanLand) || ''
  return flag == '1'
}
export function setCanPlayAdd(status) {
  localStorage.setItem(tagCanPlayAdd, status)
  
}
export function getCanPlayAdd() {
  const flag = localStorage.getItem(tagCanPlayAdd) || ''
  return flag == '1'
}

export function clearAllStorage() {
  localStorage.clear()
}
