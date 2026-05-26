import { apiConfig } from '@/api/config'
import { request } from '@/api/request'
import { Constants } from '@/utils/constants'
import { getSign } from '@/utils/auth'
export const gameModel = {

  userIndexList: function (address) {
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.userIndexList,
        method: 'GET',
        data: {
          address
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
  userRecommend: function (page) {
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.userRecommend,
        method: 'GET',
        data: {
          page: page
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
  userRecommendL: function (num, page) {
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.userRecommendL,
        method: 'GET',
        data: {
          page: page,
          num: num
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
  userLand: function (page, status = "0") {
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.userLand,
        method: 'GET',
        data: {
          page: page,
          status: status
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
  userBackList: function (page, num, propType = '0') {//num:1道具 2种子 3盲盒; propType:11化肥, 12水, 13手套,14除虫剂,15铲子
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.userBackList,
        method: 'GET',
        data: {
          page: page,
          num: num,
          propType: propType,
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
  userStakeRewardList: function (page) {
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.userStakeRewardList,
        method: 'GET',
        data: {
          page,
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
  userStakeGitStakeList: function (isQueue = 0, page = 1) {
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.userStakeGitStakeList,
        method: 'GET',
        data: {
          page,
          isQueue
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
  userSkateRewardList: function () {
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.userSkateRewardList,
        method: 'GET',
        data: {
          page: 1
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
  userBoxList: function () {
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.userBoxList,
        method: 'GET',
        data: {
          page: 1
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
  userNoticeList: function (page) {
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.userNoticeList,
        method: 'GET',
        data: {
          page: page
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
  userOrderList: function (page, address) {
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.userOrderList,
        method: 'GET',
        data: {
          page: page,
          address: address,
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
  userOrderListTwo: function (page, address) {
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.userOrderListTwo,
        method: 'GET',
        data: {
          page: page,
          address: address,
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
  userMarketSeedList: function (page) {
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.userMarketSeedList,
        method: 'GET',
        data: {
          page: page
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
  userMarketLandList: function (page) {
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.userMarketLandList,
        method: 'GET',
        data: {
          page: page
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
  userMarketPropList: function (page, propType) {//propType:11化肥，12水，13手套，14除虫剂，15铲子
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.userMarketPropList,
        method: 'GET',
        data: {
          page: page,
          propType: propType
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
  userMarketRentLandList: function (page, rentType) {
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.userMarketRentLandList,
        method: 'GET',
        data: {
          page: page,
          rentType: rentType,
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
  userMarketMyList: function (page, num) {
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.userMarketMyList,
        method: 'GET',
        data: {
          page: page,
          num: num
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
  buyBox: function () {
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.buyBox,
        method: 'POST',
        data: {
          num: 1,
          sign: getSign(),
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
  openBox: function (id) {
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.openBox,
        method: 'POST',
        data: {
          id: id,
          sign: getSign(),
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
  sell: function (id, landIds, num, sellType, amount) {
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.sell,
        method: 'POST',
        data: {
          id: id,
          landIds: landIds,
          num: num, // 出售1，下架2
          sellType: sellType, // 出售类型，1种子，2道具，3土地
          amount: amount,
          sign: getSign(),
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
  buy: function (id, buyType) {
    id = parseInt(id) || 0
    buyType = parseInt(buyType) || 0
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.buy,
        method: 'POST',
        data: {
          id: id,
          buyType: buyType, // 类型，1种子，2道具，3土地
          sign: getSign(),
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
  withdraw: function (amount, withdrawType) {
    // amount = parseInt(amount) || 0
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.withdraw,
        method: 'POST',
        data: {
          amount: amount,
          withdrawType: withdrawType,
          sign: getSign(),
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
  transfer: function (amount, address) {
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.transfer,
        method: 'POST',
        data: {
          amount: amount,
          address: address,
          sign: getSign(),
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
  exchange: function (amount, exchangeType) {
    // amount = parseInt(amount) || 0
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.exchange,
        method: 'POST',
        data: {
          amount: amount,
          exchangeType: exchangeType,
          sign: getSign(),
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
  stakeGit: function (num, amount, id, day) {
    num = parseInt(num) || 0
    id = parseInt(id) || 0
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.stakeGit,
        method: 'POST',
        data: {
          amount: amount,
          num: num, // 类型，质押1，解压2
          id: id, // 类型，质押1，解压2
          day: day,
          sign: getSign(),
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
  skateGet: function (num, amount) {
    amount = parseInt(amount) || 0
    num = parseInt(num) || 0
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.skateGet,
        method: 'POST',
        data: {
          amount: amount,
          num: num, // 类型，质押1，解压2
          sign: getSign(),
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
  skateGetPlay: function (amount) {
    amount = parseInt(amount) || 0
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.skateGetPlay,
        method: 'POST',
        data: {
          amount: amount,
          sign: getSign(),
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
  userBuy: function () {
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.userBuy,
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
  userBuyList: function (page, num) {
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.userBuyList,
        method: 'GET',
        data: {
          page: page,
          num: num,// 1认购 2直推 3静态 4直推加速 5团队 6平级 7全网
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
  buyTwo: function (amount) {
    amount = parseInt(amount)
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.buyTwo,
        method: 'POST',
        data: {
          amount: amount,
          sign: getSign(),
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
  getBuyLand: function () {
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.getBuyLand,
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
  buyLandRecord: function () {
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.buyLandRecord,
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
  buyLand: function (buyType, amount) {
    buyType = parseInt(buyType)
    amount = parseInt(amount)
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.buyLand,
        method: 'POST',
        data: {
          buyType: buyType, //一口价1，默认0
          amount: amount,
          sign: getSign(),
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
  landPlay: function (num, locationNum, landId, landTwoId, userAddress) {
    landId = parseInt(landId)
    landTwoId = landTwoId ? parseInt(landTwoId) : 0
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.landPlay,
        method: 'POST',
        data: {
          num: num, // 1收回土地，2替换土地, 3放置土地
          locationNum: locationNum,
          landId: landId, // 土地id，必须
          landTwoId: landTwoId, // 替换土地必须
          userAddress: userAddress, // 土地所属的addr
          sign: getSign(),
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
  rentLand: function (num, landId, landIds, rate) {
    landId = parseInt(landId)
    rate = rate ? parseFloat(rate) : 1
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.rentLand,
        method: 'POST',
        data: {
          num: num,  // 1出租，2结束出租
          landId: landId, // 土地id，必须
          landIds: landIds,
          rate: rate, // 收获比例 1-6个挡位
          sign: getSign(),
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
  getLand: function (num, landOneId, landTwoId) {
    landOneId = parseInt(landOneId) || 0
    landTwoId = parseInt(landTwoId) || 0
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.getLand,
        method: 'POST',
        data: {
          num: num,  // 合成方式：化肥1，土地2，
          landOneId: landOneId, // num=2，必须
          landTwoId: landTwoId, // num=2，必须
          sign: getSign(),
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
  landAddOutRate: function (landId, id) {
    landId = parseInt(landId) || 0
    id = parseInt(id) || 0
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.landAddOutRate,
        method: 'POST',
        data: {
          landId: landId,
          id: id, // 选择的道具化肥id
          sign: getSign(),
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
  landPlayOne: function (landId, seedId) {
    landId = parseInt(landId) || 0
    seedId = parseInt(seedId) || 0
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.landPlayOne,
        method: 'POST',
        data: {
          landId: landId,
          seedId: seedId,
          sign: getSign(),
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
  landPlayTwo: function (landUseId) {
    landUseId = parseInt(landUseId) || 0
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.landPlayTwo,
        method: 'POST',
        data: {
          landUseId: landUseId,
          sign: getSign(),
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
  landPlayThree: function (landUseId, id) {
    landUseId = parseInt(landUseId) || 0
    id = parseInt(id) || 0
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.landPlayThree,
        method: 'POST',
        data: {
          landUseId: landUseId,
          id: id,
          sign: getSign(),
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
  landPlayFour: function (landUseId, id) {
    landUseId = parseInt(landUseId) || 0
    id = parseInt(id) || 0
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.landPlayFour,
        method: 'POST',
        data: {
          landUseId: landUseId,
          id: id,
          sign: getSign(),
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
  landPlayFive: function (landUseId, id) {
    landUseId = parseInt(landUseId) || 0
    id = parseInt(id) || 0
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.landPlayFive,
        method: 'POST',
        data: {
          landUseId: landUseId,
          id: id,
          sign: getSign(),
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
  landPlaySix: function (landUseId, id) {
    landUseId = parseInt(landUseId) || 0
    id = parseInt(id) || 0
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.landPlaySix,
        method: 'POST',
        data: {
          landUseId: landUseId,
          id: id,
          sign: getSign(),
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
  landPlaySeven: function (landUseId, id) {
    landUseId = parseInt(landUseId) || 0
    id = parseInt(id) || 0
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.landPlaySeven,
        method: 'POST',
        data: {
          landUseId: landUseId,
          id: id,
          sign: getSign(),
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
  addMessage: function (content) {
    return new Promise(function (resolve, reject) {
      request({
        url: apiConfig.addMessage,
        method: 'POST',
        data: {
          content: content,
          sign: getSign(),
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