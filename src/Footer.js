import React from 'react'

const Footer = () => {
  return (
    <footer>
      <ul className="footerThumbs">
        <li>
          <p>
          <span className="videos"></span>
          Videos{' '}

          </p>

        </li>
        <li>
          <p>
            <span className="categories"></span>
            Categories{' '}
          </p>
        </li>
        <li>
          <p>
            <span className="gifs"></span>
            GIFs{' '}
          </p>
        </li>
        <li>
          <p>
            <span className="pornstars "></span>
            Pornstars{' '}
          </p>
        </li>
        <li>
          <p>
            <span className="gay"></span>
            Gay{' '}
          </p>
        </li>
      </ul>
      <nav>
        <p
          className="platformChange"
        >
          <i className="desktopIcon"></i>
          <span>Desktop</span>
        </p>

        <p
          className="platformChange platformChangeMiddle"
        >
          <i className="tabletIcon"></i>
          <span>Tablet</span>
        </p>

        <p
          className="platformChange"
        >
          <i className="mobileLiteIcon"></i>
          <span>Mobile Lite</span>
        </p>
      </nav>
      <span className="privacyProtocol">
        本网站仅用于法律允许观看的美国和欧盟，以及在世界上其他国家观看无码的成人内容是合法的。
      </span>
      <p className="copyrightInfo">© Younghub, 2019</p>
    </footer>
  )
}

export default Footer
