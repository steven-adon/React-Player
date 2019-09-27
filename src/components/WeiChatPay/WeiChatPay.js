import React from 'react'
import { connect } from 'react-redux'
import { postPay, clearPostPay, queryServerPayStatus } from '../../actions'
// var QRCode = require('qrcode.react')
// var QRCode = require('qrcode.react')
import QRCode from './qrcode/index'
import classNames from 'classnames'

let interval
class WeiChatPay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 60,
      payMoney: 7,
      helpActived: false
    }
    this.myRef = React.createRef()
  }

  componentDidMount() {
    // const randomNumber = this.getRandomNum(1, 2) * 0.1
    const randomNumber = Number(this.props.videoItem.price)
    this.setState({
      payMoney: randomNumber
    })
    this.props.postPay(randomNumber)
    interval = setInterval(this.decrease, 1000)
    // setTimeout(() => {
    //   this.downloadQR()
    // }, 3000)
  }

  decrease = () => {
    if (this.state.count > 0 && this.state.count % 3 === 0) {
      if (this.state.count < 50) {
        this.props.queryServerPayStatus()
      }
    }
    this.setState(
      ({ count }) => ({
        count: count - 1
      }),
      () => {
        if (this.state.count === 0) {
          clearInterval(interval)
          this.props.history.push(`/lists`)
        }
      }
    )
  }

  // getRandomNum(Min, Max) {
  //   var Range = Max - Min
  //   var Rand = Math.random()
  //   return Min + Math.round(Rand * Range)
  // }

  componentWillUnmount() {
    clearInterval(interval)
    this.props.clearPostPay()
  }

  downloadQR = () => {
    let fatherQrcode = document.getElementById('QRCode') //
    if (fatherQrcode) {
      //先清除fatherQrcode的img子节点：防止重复添加
      let childs = fatherQrcode.children
      for (let i = childs.length - 1; i >= 0; i--) {
        if (childs[i].className === 'QRCode') {
          fatherQrcode.removeChild(childs[i])
        }
      }
      const myCanvas = document.getElementById('canvas')
      console.log(myCanvas)
      if (myCanvas) {
        const pngUrl = myCanvas
          .toDataURL('image/png')
          .replace('image/png', 'image/octet-stream')
        console.log(pngUrl)
        myCanvas.style.display = 'none' //隐藏生成的canvas
        let imageFoo = document.createElement('img')
        imageFoo.src = pngUrl
        imageFoo.style.width = '128px'
        imageFoo.style.height = '128px'
        imageFoo.classList.add('QRCode')
        fatherQrcode.append(imageFoo)
      }
    }
  }

  queryPayStatusFix = () => {
    this.props.queryServerPayStatus()
  }

  goBack = () => {
    this.props.history.push(`/`)
  }

  toggleHelp = () => {
    this.setState(({helpActived}) => ({
      helpActived : !helpActived
    }))
  }

  render() {
    const { count, helpActived } = this.state
    const { qr_price, qr_url } = this.props.qrCode
    return (
      <div className="ui relaxed divided list">
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <span style={{ color: '#f90' }}>
            {/* 您要购买的是：Sister Caught Pervy Step Brother Jerking Off To Her
              POV */}
            您要购买的是：
            {this.props.videoItem.videoDesc
              ? this.props.videoItem.videoDesc
              : `Sister Caught Pervy Step Brother Jerking Off To Her
              POV`}
          </span>
        </div>
        <button onClick={this.goBack} className="backBtn">
          {' '}
          返回{' '}
        </button>
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <span style={{ color: '#f90' }}>
            提醒: 优惠价: {qr_price} &yen; , 视频质量取决于您的网络状况
          </span>
        </div>

        <div
          id="QRCode"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {qr_url ? <QRCode value={qr_url} id="canvas" /> : null}
        </div>

        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <span
            style={{
              color: '#f90',
              fontSize: '13px'
            }}
          >
            请常按二维码,点击“识别图中二维码”进入支付，支付后点击“完成”按钮，然后等待跳转，不可擅自退出，或切换页面
          </span>
        </div>

        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <span
            style={{
              color: '#f90',
              fontSize: '13px'
            }}
          >
            [请在 {count} 秒之内完成支付]
          </span>
        </div>

        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <button onClick={this.queryPayStatusFix} className="queryBtn">
            正在查询订单支付状态...
          </button>
        </div>

        <div className="helpCenter">
            <div className={classNames({
              wrapperHelp: true,
              actived: helpActived,
              })}
              onClick={this.toggleHelp}
              >
              <button className="u-userLauncherColor">
                <span className="classSpan">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <title></title>
                    <g id="Layer_4">
                      <path d="M11,12.3V13c0,0-1.8,0-2,0v-0.6c0-0.6,0.1-1.4,0.8-2.1c0.7-0.7,1.6-1.2,1.6-2.1c0-0.9-0.7-1.4-1.4-1.4 c-1.3,0-1.4,1.4-1.5,1.7H6.6C6.6,7.1,7.2,5,10,5c2.4,0,3.4,1.6,3.4,3C13.4,10.4,11,10.8,11,12.3z"></path>
                      <circle cx="10" cy="15" r="1"></circle>
                      <path d="M10,2c4.4,0,8,3.6,8,8s-3.6,8-8,8s-8-3.6-8-8S5.6,2,10,2 M10,0C4.5,0,0,4.5,0,10s4.5,10,10,10s10-4.5,10-10S15.5,0,10,0 L10,0z"></path>
                    </g>
                  </svg>
                </span>
              </button>

              <div className="contentHelp">
                <div className="contentItem">
                  <span>1, 支付成功后无法跳转，请联系客服补单</span>
                </div>
                <div className="contentItem">
                  <span>2, 寻求合作推广请联系QQ：721535507</span>
                </div>
              </div>
            </div>
          </div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    qrCode: state.qrCode,
    videoItem: state.videoItem
  }
}

export default connect(
  mapStateToProps,
  {
    postPay,
    clearPostPay,
    queryServerPayStatus
  }
)(WeiChatPay)
