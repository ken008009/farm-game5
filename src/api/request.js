
import { hostname } from './config'
import { Constants } from '@/utils/constants'
import { getToken, clearAllStorage } from '@/utils/auth'
import axios from 'axios'
import { showToast } from 'vant'
const isDev = import.meta.env.DEV

export const request = ({ url, data, method = 'POST', success, fail }) => {
  
  // axios cnofig
  axios.defaults.timeout = 100000

  // data deal
  if (!url) {
    console.log('url err', url)
    return false
  }
  // host
  // 拼接 host (生产环境才加)
  if (!url.startsWith('http')) {
    url = isDev ? `/api${url}` : hostname + url
  }
  // if (url.indexOf('http:') < 0 && url.indexOf('https:') < 0) {
  //   url = hostname + url
  // }
  // GET deal
  if (method === 'GET') {
    if (typeof data === 'object') {
      const arr = Object.keys(data)
      for (let i = 0, len = arr.length; i < len; i++) {
        if (url.indexOf('?') < 0) {
          url += '?'
        }
        if (i === 0) {
          url += `${arr[i]}=${data[arr[i]]}`
        } else {
          url += `&${arr[i]}=${data[arr[i]]}`
        }
      }
    }
  }
  const token = getToken()
  try {
    return axios({
      method,
      url,
      data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
    }).then(function (res) {
      // console.log(res, 'axios')
      if (res && res.status === 200) {
        const _data = res.data
        // request data
        if (_data && _data.status === Constants.SUCCESS_CODE) {
          typeof success === 'function' && success(_data)
        } else {
          if (_data.status == '不存在用户') {
            clearAllStorage()
            window.location.reload()
          }
          if ((_data.status !== 'errcode')&&(_data.status !== '锁定用户')) {
            //中英文提示
            const isZh = localStorage.getItem('language') == 'zh'
            const errMsg = isZh ? _data.status : (_data.statusTwo || _data.status)
            showToast(errMsg)
          }
          console.log(_data.status, '_data.status')
          typeof fail === 'function' && fail(_data)
        }
      } else {
        showToast('Net Error')
        console.log(err, 'Net Error')
        typeof fail === 'function' && fail(res)
      }
    }).catch(error => {
      console.log(error)
      if (error.status == 429) {
        console.log('请求次数频繁')
        typeof fail === 'function' && fail(error)
      } else if (error.status == 401) {
        clearAllStorage()
        window.location.reload()
      } else {
        showToast(`Net Error:${error.status?error.status:''}`)
        typeof fail === 'function' && fail(error)
      }
    });
  } catch (err) {
    console.log(err, 'api error')
  }
}
