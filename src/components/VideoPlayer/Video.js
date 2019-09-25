// taken from https://github.com/videojs/video.js/blob/master/docs/guides/react.md
import React from 'react';
import videojs from 'video.js';

export default class VideoPlayer extends React.Component {
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this);
      // this.src('blob:https://www.pornhub.com/a20d5cee-91a8-4c09-a281-04363eea31c4');
    });
    // this.player.fluid(true)
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div data-vjs-player >
        <video ref={node => (this.videoNode = node)} className="video-js vjs-default-skin vjs-big-play-centered vjs-fluid vjs-16-9" />
      </div>
    );
  }
}
