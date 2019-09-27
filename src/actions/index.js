import fetch from '../utils/request'
import md5 from 'md5'
import uuid from 'uuid/v1'
import history from '../history'


// save shareCode
export const saveShareCode = shareCode => async dispatch => {
  dispatch({ type: 'SAVE_SHARE_CODE', payload: shareCode })
}

// save videoType
export const saveSelectVideoType = selectType => async dispatch => {
  dispatch({ type: 'SAVE_VIDEO_SELECT_TYPE', payload: selectType })
}

// save videoId
export const saveVideoId = videoItem => async dispatch => {
  dispatch({ type: 'SAVE_VIDEO_ITEM', payload: videoItem })
}

// 获取支付状态
export const queryServerPayStatus = () => async (dispatch, getState) => {
  const order_id = getState().videoUuid
  const videoItem = getState().videoItem
  // const response = await fetch.get('/video/order', {
  //   params: {
  //     orderId: order_id
  //   }
  // })
  const response = await fetch.post('/api/queryPayStatus', {
    order_id: order_id
  })

  console.log(response)

  if(response.hasOwnProperty('pay_status')) {
    if(response['pay_status'] === '已支付') {
      history.push(`/play/${videoItem.id}`)
    }
  }

  // if (response.data) {
  //   console.log('路由')
  //   if (response.data) {
  //     history.push(`/play/${videoItem.id}`)
  //   }
  // }
}

// 获取支付二维码
export const postPay = randomNumber => async (dispatch, getState) => {
  const order_id = uuid()
  const videoItem = getState().videoItem
  const shareCode = getState().shareCode
  const order_price = randomNumber
  const secretkey = 'yioMe'
  const sign = md5(md5(order_id + order_price) + secretkey)

  dispatch({ type: 'SAVE_UUID', payload: order_id })

  const response = await fetch.post('/api/order', {
    order_id: order_id,
    video_id: videoItem.videoUrl,
    shareCode: shareCode,
    order_type: 'wechat',
    order_price: order_price,
    order_name: '冲击器',
    sign: sign,
    redirect_url: 'http://104.233.252.68/video/order',
    extension: '32323'
  })

  dispatch({ type: 'PAY_QRCODE', payload: response })
}

// 清空上一轮数据二维码数据
export const clearPostPay = () => async (dispatch, getState) => {
  // dispatch({ type: 'SAVE_UUID', payload: order_id })
  dispatch({ type: 'PAY_QRCODE', payload: {} })
}


