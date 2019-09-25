import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import fetch from '../../utils/request'

const VideoPlayer = props => {
  console.log(props)
  const [video, setVideo] = useState({})

  useEffect(() => {
    ;(async () => {
      const response = await fetch.get(`/video`, {
        params: {
          id: Number(props.match.params.id)
        }
      })
      setVideo(response.data)
    })()
  }, [props.match.params.id])

  const goBack = () => {
    props.history.push(`/`)
  }

  if (Object.keys(video).length > 0) {
    return (
      <div
        className="wrapper container"
        style={{ margin: '0px', padding: '0px' }}
      >
        <div className="row" style={{ marginLeft: '0px', marginRight: '0px' }}>
          <div className="col-md-12">
            <h1>Younghub</h1>
            <div className="videocontent">
              <button onClick={goBack} className="backBtn">
                {' '}
                返回{' '}
              </button>
              <iframe
                title="This is a unique title"
                className="sproutvideo-player"
                src={`https://videos.sproutvideo.com/embed/${video.videoUrl}?autoPlay=true`}
                height="240px"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
            <h4>{video.videoDesc}</h4>
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default withRouter(VideoPlayer)
