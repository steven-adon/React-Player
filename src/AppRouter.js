import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import history from './history'
import Videos from './components/VideoContainer/Videos'
import VideoPlayer from './components/VideoPlayer/VideoPlayer'
import WeiChatPay from './components/WeiChatPay/WeiChatPay'
import Navigation from './components/Navigation/Navigation'
import Footer from './Footer'
import fetch from './utils/request'
import { connect } from 'react-redux'

import classNames from 'classnames'

import { saveSelectVideoType, saveShareCode } from './actions'

import $ from 'jquery'

class AppRouter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebarIsOpen: false,
      isScroll: false,
      jsHeaderHidden: false,
      videoType: [],
      selectType: '0'
    }
  }

  toogle = () => {
    this.setState(
      ({ sidebarIsOpen }) => ({
        sidebarIsOpen: !sidebarIsOpen
      }),
      () => {
        $('body,html').animate({ scrollTop: 0 }, 500)
      }
    )
  }

  componentDidMount() {
    let shareCode = this.getUrlParams('code')
    this.props.saveShareCode(shareCode)
    // history.push('/')
    ;(async () => {
      const response = await fetch.get(`/video/sysconfig`, {
        params: {
          dictGroup: 'videoType'
        }
      })

      response.data.unshift({ dictName: '全部', dictVal: '0', sort: 0 })

      this.setState({
        videoType: response.data
      })
    })()

    // window.addEventListener('scroll', this.Scroll, false)

    // scrool
    $(function() {
      var page_heig = $(
        document
      ).scrollTop() /* 初始化。用于第一次获取滚动条的高度 */
      var navigation = $('.navigation').outerHeight() /* 获取该元素的高度 */

      $(window).scroll(function() {
        /* 滚动条触发事件 */
        var real_heig = $(document).scrollTop() /* 事件触发后获取滚动条高度 */

        if (real_heig > navigation) {
          /* 触发后的高度 与 元素的高度对比 */
          $('.navigation').addClass('hide') /* True 添加隐藏属性 */
        } else {
          $('.navigation').removeClass('hide') /* False 删除隐藏属性 */
        }

        if (real_heig < page_heig) {
          /* 触发后的高度 与 上次触发后的高度 */
          $('.navigation').removeClass('hide') /* True 删除隐藏属性 */
        }
        page_heig = $(
          document
        ).scrollTop() /* 再次获取滚动条的高度，用于下次触发事件后的对比 */
      })
    })

    // eslint-disable-next-line
    if (!this.getIsWxClient() && process.env.NODE_ENV == 'production') {
      setTimeout(() => {
        window.open('https://www.sina.com.cn/', '_self')
      }, 0)
    }
  }

  getUrlParams = (names) => {
    //获取？后面的参数
    var urlSearch = window.location.search
    var urlValue = ''
    //以？*&来拆分
    var params = urlSearch.split(/[?*&]/)
    for (var i = 0; i < params.length; i++) {
      //如果url参数里包含传递过来names字段，则取=后面的部分
      if (params[i].indexOf(names) >= 0) {
        urlValue = params[i].split('=')[1]
        return urlValue
      }
    }

    return urlValue
  }

  ScrollStart = () => {
    let osTop = document.documentElement.scrollTop || document.body.srcollTop
    if (osTop > 0) {
      if (!this.state.isScroll) {
        this.setState({ isScroll: true })
      }
      if (osTop > 600) {
        if (!this.setState.jsHeaderHidden) {
          this.setState({ jsHeaderHidden: true })
        }
      } else {
        if (this.state.jsHeaderHidden) {
          this.setState({ jsHeaderHidden: false })
        }
      }
    } else {
      this.setState({ isScroll: false })
    }
  }

  Scroll = () => {
    let osTop = document.documentElement.scrollTop || document.body.srcollTop
    if (osTop > 0) {
      if (!this.state.isScroll) {
        this.setState({ isScroll: true })
      }
      if (osTop > 600) {
        if (!this.setState.jsHeaderHidden) {
          this.setState({ jsHeaderHidden: true })
        }
      } else {
        if (this.state.jsHeaderHidden) {
          this.setState({ jsHeaderHidden: false })
        }
      }
    } else {
      this.setState({ isScroll: false })
    }
  }

  selectTypeClick = value => {
    this.setState({
      selectType: value
    })
    this.toogle()
    history.push('/')
    this.props.saveSelectVideoType(value)
  }

  getIsWxClient = () => {
    var ua = navigator.userAgent.toLowerCase()
    // eslint-disable-next-line
    if (ua.match(/MicroMessenger/i) == 'micromessenger' || ua.match(/QQ/i) == 'qq') {
      return true
    }
    return false
  }

  render() {
    const {
      sidebarIsOpen,
      isScroll,
      jsHeaderHidden,
      videoType,
      selectType
    } = this.state



    // eslint-disable-next-line
    if (this.getIsWxClient() || process.env.NODE_ENV == 'development') {
      return (
        <React.Fragment>
          <header
            id="mobileHeader"
            className={classNames({
              navigation: true,
              active: sidebarIsOpen,
              scroll: isScroll,
              jsHeaderHidden: jsHeaderHidden
            })}
          >
            <nav onClick={this.toogle}>
              <div className="topNav clearfix">
                <button
                  id="mobileNavigation"
                  type="button"
                  className={sidebarIsOpen ? 'active' : ''}
                >
                  <i className="spriteUi"></i>
                </button>
                <div className="logoWrapper" title="YoungHub">
                  YoungHub
                </div>
              </div>
            </nav>
          </header>

          <aside id="leftMenu" className={sidebarIsOpen ? 'active' : ''}>
            {videoType.map(item => {
              return (
                <div
                  key={item.sort}
                  className={classNames({
                    actived: item.dictVal === selectType,
                    labelItem: true
                  })}
                  onClick={() => this.selectTypeClick(item.dictVal)}
                >
                  {item.dictName}
                </div>
              )
            })}
          </aside>

          <div
            className={classNames({
              uiOverlay: true,
              active: sidebarIsOpen
            })}
            onClick={this.toogle}
          ></div>

          <Router history={history}>
            <div className="mainContainer">
              <Switch>
                <Route path="/" exact component={Videos} />
                <Route path="/lists" exact component={Videos} />
                <Route path="/weiChatPay" exact component={WeiChatPay} />
                <Route path="/play/:id" exact component={VideoPlayer} />
                <Route path="/navigation" exact component={Navigation} />
              </Switch>
              <Footer></Footer>
            </div>
          </Router>
        </React.Fragment>
      )
    } else {
      return <div>对不起，请在微信环境中使用</div>
    }
  }
}

export default connect(
  null,
  { saveSelectVideoType,
    saveShareCode }
)(AppRouter)
