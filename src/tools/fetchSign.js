// import { Toast } from 'antd-mobile'
import { ETH } from "./contract"
import { getAddr, setAddr, getSign, setSign, clearAllStorage } from '@/utils/auth';


export const checkAccount = async () => {
  const account = await ETH.getAccount();
  const accountLac = getAddr()

  if (account !== accountLac) {
    clearAllStorage()
  }
  console.log(account)
  return account
}

export const fetchSign = async () => {
  const account = await checkAccount()

  try {
    const sign = await ETH.signMessage();
    setSign(sign)
    setAddr(account)
  } catch (error) {
    // Toast.show('签名失败'); // 显示失败的提示信息
    throw '签名失败' // 抛出错误信息
  }
}
