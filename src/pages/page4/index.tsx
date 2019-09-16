import { ComponentType } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { Canvas, View, Button, Image, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import tools from '../../utils/tools'

import './index.styl'
import p0bg from '../../assets/p0-bg.png'
import p0Title from '../../assets/p1-title.png'
import p0r1 from '../../assets/p0-r1.png'
import p0l1 from '../../assets/p0-l1.png'
import p0l2 from '../../assets/p0-l2.png'
import p0l0 from '../../assets/p0-l0.png'
import p0l00 from '../../assets/p0-l00.png'
import p0l3 from '../../assets/p0-l3.png'

class Index extends Component {
  state = {
    innerWidth: 0,
    innerHeight: 0,
    rpx: 1,
    p0Title,
    p0r1,
    p0bg,
    p0l0,
    p0l00,
    p0l1,
    p0l2,
    p0l3
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
    const { p0bg, p0r1, p0l0, p0l00, p0l1, p0l2, p0l3, p0Title } = this.state
    return (
      <View className="page4">
        {/* 背景 */}
        <Image className="p0-bg" mode="widthFix" src={p0bg} />
        {/* 灯光 */}
        <Image className="p0-l0" mode="widthFix" src={p0l0} />
        <Image className="p0-l00" mode="widthFix" src={p0l00} />
        <Image className="p0-l1" mode="widthFix" src={p0l1} />
        <Image className="p0-l2" mode="widthFix" src={p0l2} />
        {/* 旋转光盘 */}
        <Image className="p0-r1" mode="widthFix" src={p0r1} />
        <Image className="p0-r2" mode="widthFix" src={p0r1} />
        {/* 文字 */}
        <Image className="p0-title" mode="widthFix" src={p0Title} />
        <Text className="p0-num">96%</Text>
        {/* 背景黑线条 */}
        <Image className="p0-l3" mode="widthFix" src={p0l3} />
      </View>
    )
  }
}

export default Index as ComponentType