import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import './index.styl'
// import { url } from 'inspector'

type PageStateProps = {
  counterStore: {
    counter: number,
    increment: Function,
    decrement: Function,
    incrementAsync: Function
  },
  demoStore: {
    list: String[]
  }
}

// function debounce(fn: Function, wait: number) {
//   var timer: any = null;
//   return function () {
//       var context = this
//       var args = arguments
//       if (timer) {
//           clearTimeout(timer);
//           timer = null;
//       }
//       timer = setTimeout(function () {
//           fn.apply(context, args)
//       }, wait)
//   }
// }

// function throttle(fn: Function, gapTime: number) {
//   let _lastTime: any = null

//   return function () {
//     let _nowTime = + new Date()
//     if (_nowTime - _lastTime > gapTime || !_lastTime) {
//       fn();
//       _lastTime = _nowTime
//     }
//   }
// }

interface Index {
  props: PageStateProps;
}

@inject('counterStore', 'demoStore')
@observer
class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    // navigationBarTitleText: '首页'
  }
  state = {
    cls: 'box',
    dx: 0,
    dy: 0,
    dz: 0
  }

  componentWillMount () { }

  componentWillReact () {
    console.log('componentWillReact')
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    // const that = this
    // setTimeout(() => {
    //   Taro.startDeviceMotionListening({
    //     success: () => {
    //       Taro.onDeviceMotionChange(res => {
    //         console.log(res)
    //         that.setState({
    //           dy: res.beta + 50,
    //           dx: res.gamma,
    //           dz: res.alpha
    //         })
    //       })
    //     }
    //   })
    // }, 2000)
  }

  componentDidHide () { }

  increment = () => {
    const { counterStore } = this.props
    counterStore.increment()
  }

  decrement = () => {
    const { counterStore } = this.props
    counterStore.decrement()
  }

  incrementAsync = () => {
    const { counterStore } = this.props
    counterStore.incrementAsync()
  }

  start = () => {
    this.setState({
      cls: 'box on'
    })
    setTimeout(_ => this.setState({cls: 'box'}), 5000)
  }

  login = () => {
    Taro.login({
      success: function (res) {
        console.log(res)
      }
    })
  }

  goPage (index) {
    console.log(index)
    Taro.navigateTo({
      url: '../page' + (index + 1) + '/index'
    })
  }

  render () {
    const { counterStore: { counter }, demoStore: { list } } = this.props
    // const { cls, dx, dy } = this.state
    // const boxs = Array.from({length: 3}, (_, index) => index)
    // const x = parseInt(dx * 3)
    // const y = parseInt(dy * 3)
    // const demoStyle = {
    //   background: 'url(cloud://leeapps-b71pw.6c65-leeapps-b71pw/2019-09-04-poster.jpg)'
    //   backgroundSize: '100% 100%'
    // }
    return (
      <View className='index-demo'>
        {/* <View className={cls}>
          {
            boxs.map((v, index) => <View key={index} className={`box${v}`}></View>)
          }
        </View>
        <Button className='start' onClick={this.start}>开始折叠</Button>
        <View className='box-2'>
          <Image className='poster' style={{transform: `translate3d(${x}px, ${y}px, 0)`}} mode="aspectFill" src="cloud://leeapps-b71pw.6c65-leeapps-b71pw/2019-09-04-poster.jpg" />
        </View>
        <Button className='start' onClick={this.login}>登陆</Button> */}
        <View className='demo-bg'>
          <Image className='demo-poster' mode="aspectFill" src="cloud://leeapps-b71pw.6c65-leeapps-b71pw/2019-09-04-poster.jpg" />
        </View>
        {
          list.map((v, index) => <Button key={index} onClick={this.goPage.bind(this, index)}>{v}</Button>)
        }
      </View>
    )
  }
}

export default Index  as ComponentType
