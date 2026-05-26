import { apiConfig } from '@/api/config'
import { requestFile } from '@/api/requestFile'
import { request } from '@/api/request'
import { Constants } from '@/utils/constants'

export const fileModel = {
  uploadFile: function (url, file, fnProgress) {
    return new Promise(function (resolve, reject) {
      requestFile({
        url: url,
        method: 'PUT',
        file,
        success: (response) => {
          resolve(response)
        },
        fail: (error) => {
          reject(error)
        },
        progress: (p) => {
          fnProgress(p)
        }
      })
    }).then(function (res) {
      return { ok: true, data: res }
    }).catch(function (err) {
      return { ok: false, ...err }
    })
  },
  getSignUrl: function (filename) {
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.getUploadSignUrl,
        method: 'POST',
        data: {
          filename: filename,
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
  checkUploadFile: function (filename, checksum) {
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.checkUploadFile,
        method: 'POST',
        data: {
          filename: filename,
          checksum: checksum,
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
  noticeUploadFile: function (filename, checksum, resource_no) {
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.noticeUploadFile,
        method: 'POST',
        data: {
          resource_no: resource_no,
          filename: filename,
          checksum: checksum,
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