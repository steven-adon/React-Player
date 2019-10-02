import React, { useState, useEffect } from 'react'
import { Pagination } from 'antd'
import fetch from '../../utils/request'
import VideoDetail from './VideoDetail'

import { connect } from 'react-redux'
import $ from 'jquery'

const Videos = props => {
  const [resources, setResources] = useState([])

  const [curentPage, setCurrentPage] = useState(1)

  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    ;(function(w, d) {
      let domArr = d.getElementsByClassName('like-wrap')
      Array.from(domArr).forEach(function(ele) {
        ele.addEventListener('click', function(e) {
          this.classList.toggle('like-active')
          addLike(e)
        })
      })

      var likeArr = [] //like队列
      function addLike(e) {
        var likeDiv = d.createElement('div') //创建div
        likeDiv.classList.add('like') //添加样式like
        likeDiv.innerHTML = '<i class="fas fa-heart"></i><span>+1</span>' //添加like内容
        d.body.appendChild(likeDiv) //往body添加该div
        // 每点击一次往队列添加一个like的对象
        likeArr.push({
          el: likeDiv, //div源
          top: e.clientY - 20, //e为传入的点击事件，client取得点击位置像素
          left: e.clientX - 10,
          opacity: 1, //透明度
          scale: 1, //放大倍数
          color: `rgb(${255 * Math.random()},${255 * Math.random()},${255 *
            Math.random()})`
          //随机颜色，``反单引号为ES6写法，${}插入变量，也可用使用字符串拼接
        })
        moveLike()
      }

      function moveLike() {
        for (var i = 0; i < likeArr.length; i++) {
          if (likeArr[i].opacity <= 0) {
            //透明小于0时
            d.body.removeChild(likeArr[i].el) //body去除like
            likeArr.splice(i, 1) //队列删减
            return //跳出moveLike函数
          }
          likeArr[i].top-- //刷新一次top-1
          likeArr[i].opacity -= 0.01 //透明度操作,根据喜好自定义
          likeArr[i].scale += 0.01 //放大倍数操作，根据喜好自定义
          // 往div源添加style样式，``同样是ES6写法
          likeArr[i].el.style.cssText = `
          top: ${likeArr[i].top}px;
          left: ${likeArr[i].left}px;
          color: ${likeArr[i].color};
          opacity: ${likeArr[i].opacity};
          transform: scale(${likeArr[i].scale});`
        }
        //请求动画帧，以屏幕刷新为准，一般是每秒60帧，每刷新调用一次moveLike
        w.requestAnimationFrame(moveLike)
      }
    })(window, document)
    // return () => {
    //   cleanup
    // };
  }, [resources])

  useEffect(() => {
    ;(async () => {
      // eslint-disable-next-line
      const response = await fetch.get(`/video/pageList`, {
        params: {
          group: curentPage,
          // eslint-disable-next-line
          videoType: props.videoSelectType == '-1' ? 0  : props.videoSelectType
        }
      })
      // eslint-disable-next-line
      if(props.videoSelectType == '-1') {
        let userInfo = JSON.parse(window.localStorage.getItem('userVideo'))

        let finalVideo = response.data.records.filter((item) => {
          let flagArr = userInfo.viewedList.filter((filterItem) => {
            let timestamp = Date.parse(new Date());
            // eslint-disable-next-line
            if(timestamp < filterItem.validityPeriod && filterItem.videoId == item.id) {
              return true
            }else{
              return false
            }
          })
          if(flagArr.length > 0) {
            return true
          }else{
            return false
          }
        })

        setResources(finalVideo)
        setPageCount(finalVideo.length)
      }else{
        setResources(response.data.records)
        setPageCount(response.data.total)
      }
      $('body,html').animate({ scrollTop: 0 }, 500)
    })()
  }, [curentPage, props.videoSelectType])

  const onChange = curentPage => {
    setCurrentPage(curentPage)
  }

  return (
    <>
      <div className="videosContainer">
        {resources.map(videoItem => (
          <VideoDetail key={videoItem.id} videoItem={videoItem} />
        ))}
      </div>

      <Pagination
        current={curentPage}
        total={pageCount}
        onChange={onChange}
        hideOnSinglePage={true}
      />
    </>
  )
}

const mapStateToProps = state => {
  return {
    videoSelectType: state.videoSelectType
  }
}

export default connect(
  mapStateToProps,
  null
)(Videos)
