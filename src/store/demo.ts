import { observable } from 'mobx'

const demoStore = observable({
  list: ['3D翻牌旋转', '背景图螺旋变化', '连线小游戏', '解忧电影院'],
  pages: ['page1', 'page2', 'page3', 'page4']
})

export default demoStore