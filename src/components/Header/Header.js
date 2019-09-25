import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import './index.scss'

function mapStateToProps(state) {
  return {}
}

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebarIsOpen: false,
      isScroll: false,
      jsHeaderHidden: false
    }
  }

  toogle = () => {
    this.setState(({ sidebarIsOpen }) => ({
      sidebarIsOpen: !sidebarIsOpen
    }))
  }

  componentDidMount() {
    window.onscroll = () => {
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
  }

  render() {
    const { sidebarIsOpen, isScroll, jsHeaderHidden } = this.state
    return (
      <div>
        <header
          id="mobileHeader"
          className={classNames({
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
          leftBar
        </aside>

        <div
          className={classNames({
            uiOverlay: true,
            active: sidebarIsOpen
          })}
          onClick={this.toogle}
        ></div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Header)
