import { apiConfig } from '@/api/config'
import { request } from '@/api/request'
import { Constants } from '@/utils/constants'

export const userModel = {

  ethAuth: function (address, code, sign) {
    return new Promise(function (resolve, reject) {
      const data = { address, sign }
      if (code) {
        data['code'] = code
      }
      request({
        url: apiConfig.ethAuth,
        method: 'POST',
        data,
        success: (response) => {
          resolve(response)
        },
        fail: (error) => {
          reject(error)
        }
      })
    }).then(function (res) {
      return { ok: true, data: res }
    }).catch(function (err) {
      return { ok: false, ...err }
    })
  },
  userInfo: function () {
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.userInfo,
        method: 'GET',
        data: {
        },
        success: (response) => {
          resolve(response)
        },
        fail: (error) => {
          reject(error)
        }
      })
    }).then(function (res) {
      return { ok: true, data: res }
    }).catch(function (err) {
      return { ok: false, ...err }
    })
  },

}