import React from 'react'
import { connect } from 'react-redux'

import './index.scss'

class Navigation extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      navigation: true
    }
  }

  render() {
    return (
      <div className="navigation-container">
        {[1, 2, 3, 5, 6, 7, 8].map(index => (
          <div
            key={index}
            style={{
              height: '300px',
              color: 'gold',
              border: '1px solid green'
            }}
          >
            {index}
          </div>
        ))}
        Navigation
      </div>
    )
  }
}

const mapStateToProps = ({ theme, location }) => ({
  theme,
  location
})

const mapDispatchToProps = dispatch => ({
  // setLocation(location) {
  //   dispatch(changeLocation(location));
  // },
  // setTheme(theme) {
  //   dispatch(changeTheme(theme));
  // }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)
