import { ComponentType } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { Canvas, View, Button, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import tools from '../../utils/tools'

import './index.styl'

class Index extends Component {
  state = {
    rpx: 1
  }
  componentDidMount () {
    Taro.getSystemInfo()
      .then(res => {
        console.log(res)
        this.setState({
          innerWidth: res.windowWidth,
          innerHeight: res.windowHeight,
          rpx: res.windowWidth / 750
        })
      })
  }
  toRpx (num) {
    const { rpx } = this.state
    return num * rpx
  }
  render () {
    return (
      <View className="page1">
        <Image className='demo-poster' mode="aspectFill" src="cloud://leeapps-b71pw.6c65-leeapps-b71pw/2019-09-04-poster.jpg" />
      </View>
    )
  }
}

export default Index as ComponentType