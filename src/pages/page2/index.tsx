import { ComponentType } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { Canvas, View, Button } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import tools from '../../utils/tools'

import './index.styl'

class Index extends Component {
  state = {
    boxWidth: 720,
    innerWidth: 0,
    innerHeight: 0,
    rpx: 1,
    allBoxs: [
      ['A', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'D', '0', '0', 'B', 'D', 'C', '0', 'A', 'C', '0', '0', '0', 'B'],
      ['A', '0', 'B', 'C', 'D','0', '0', '0', '0', '0','0', '0', '0', 'D', '0','0', 'B', '0', '0', 'C','0', '0', '0', '0', 'A'],
      ['0', '0', '0', 'C', 'D','0', 'A', 'B', 'D', '0','0', '0', '0', '0', '0',
      '0', '0', '0', '0', 'B','0', '0', 'C', '0', 'A'],
      ['0', '0', '0', 'C', 'D','C', '0', '0', '0', '0','0', '0', 'A', '0', '0','0', '0', '0', 'B', '0','D', 'B', 'A', '0', '0']
    ],
    boxs: ['A', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'D', '0', '0', 'B', 'D', 'C', '0', 'A', 'C', '0', '0', '0', 'B'],
    boxsColor: {
      'A': '#E9370C',
      'B': '#FCB620',
      'C': '#FC6A6B',
      'D': '#9664C5'
    },
    nowboxs: Array.from({length: 25}, _ => '0'),
    nowboxsColor: {
      'A': 'rgba(233,55,12, .3)',
      'B': 'rgba(252,182,32, .3)',
      'C': 'rgba(252,106,107, .3)',
      'D': 'rgba(150,100,197, .3)'
    },
    willDraw: false,
    willNum: '0',
    willGo: false,
    inNum: -1
  }
  componentDidMount () {
    Taro.getSystemInfo()
      .then(res => {
        console.log(res)
        this.setState({
          innerWidth: res.windowWidth,
          innerHeight: res.windowHeight,
          rpx: res.windowWidth / 750
        }, () => this.drawBoxs())
      })
  }
  toRpx (num) {
    const { rpx } = this.state
    return num * rpx
  }
  drawBoxs () {
    const { boxWidth, boxs, boxsColor, willGo } = this.state
    const ctx = Taro.createCanvasContext('mycanvas', this)

    ctx.clearRect(0, 0, boxWidth, boxWidth)
    // 描格式
    ctx.setStrokeStyle("#000")
    const lineWidth = this.toRpx(boxWidth / 5)
    for (let i = 0; i < 6; i ++) {
      ctx.moveTo(0, lineWidth * i)
      ctx.lineTo(this.toRpx(boxWidth), lineWidth * i)

      ctx.moveTo(lineWidth * i, 0)
      ctx.lineTo(lineWidth * i, this.toRpx(boxWidth))
    }
    ctx.stroke()

    // 画关卡
    for (let i = 0; i < 25; i++) {
      const x = i % 5
      const y = ~~(i / 5)
      const box = boxs[i]
      if (box !== '0') {
        ctx.beginPath()
        ctx.arc(lineWidth * x + this.toRpx(boxWidth / 10), lineWidth * y + this.toRpx(boxWidth / 10), this.toRpx(boxWidth * .8 / 10), 0, 2 * Math.PI)
        ctx.setFillStyle(boxsColor[box])
        ctx.fill()
      }
    }

    // 画完成动作

    if (willGo) this.drawInBoxs(ctx)
    else ctx.draw()
  }
  drawInBoxs (ctx) {
    const { boxWidth, nowboxs, nowboxsColor } = this.state
    const lineWidth = this.toRpx(boxWidth / 5)
    for (let i = 0; i < 25; i++) {
      const x = i % 5
      const y = ~~(i / 5)
      const box = nowboxs[i]
      if (box !== '0') {
        ctx.beginPath()
        ctx.rect(x * lineWidth, y * lineWidth, lineWidth, lineWidth)
        ctx.setFillStyle(nowboxsColor[box])
        ctx.fill()
      }
    }
    ctx.draw()
  }
  componentDidShow () {
  }
  toNumber (ev) {
    const { boxWidth } = this.state
    const pos = ev.changedTouches[0]
    const lineWidth = this.toRpx(boxWidth / 5)
    const dx = ~~(pos.x / lineWidth)
    const dy = ~~(pos.y / lineWidth)
    const num = dy * 5 + dx
    return num
  }
  start = (ev) => {
    const { boxs, nowboxs } = this.state
    const num = this.toNumber(ev)
    console.log(num, ev)
    if (boxs[num] === '0') return
    const willNum = boxs[num]
    const _nowboxs = nowboxs.map(v => {
      if (v === willNum) return '0'
      else return v
    })
    _nowboxs[num] = String(willNum)
    this.setState({
      willGo: true,
      willDraw: true,
      willNum,
      nowboxs: _nowboxs
    })
  }
  move = (ev) => {
    const { boxs, willDraw, willNum, inNum, nowboxs } = this.state
    if (!willDraw) return
    const num = this.toNumber(ev)
    if (inNum === num) return
    if (boxs[num] === '0' || boxs[num] === willNum) {
      console.log(num)
      nowboxs[num] = String(willNum)
      this.setState({
        inNum: num,
        nowboxs
      }, () => this.drawBoxs())
    }
  }
  end = (ev) => {
    const { boxs, willNum, nowboxs } = this.state
    const num = this.toNumber(ev)
    console.log(num, ev)
    const nullLen = nowboxs.filter(v => v === '0').length
    if (!nullLen) {
      console.log('成功了')
      return Taro.showToast({
        title: '成功啦',
        icon: 'success',
        duration: 2000
      })
    }
    if (willNum === boxs[num]) {
      console.log('完成一个')
      this.setState({
        willGo: false,
        willDraw: false
      })
    } else {
      console.log('未完成败')
      this.setState({
        willDraw: false
      })
    }
  }
  playNum (index) {
    const { allBoxs } = this.state
    this.setState({
      boxs: allBoxs[index],
      nowboxs: Array.from({length: 25}, _ => '0')
    }, () => this.drawBoxs())
  }
  render () {
    const { boxWidth, allBoxs } = this.state
    const cWidth = this.toRpx(boxWidth)
    const cHeight = this.toRpx(boxWidth)
    return (
      <View>
        <Canvas style={{width: cWidth + 'px', height: cHeight + 'px'}} canvasId="mycanvas" className="mycanvas" onTouchStart={this.start} onTouchMove={this.move} onTouchEnd={this.end}></Canvas>
        {
          allBoxs.map((_, index) => <Button key={index} onClick={this.playNum.bind(this, index)}>第{index + 1}关</Button>)
        }
      </View>
    )
  }
}

export default Index as ComponentType