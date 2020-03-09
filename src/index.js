import _ from 'lodash'
import PrintMe from './print.js'
import { getGdc, GdcJuejin, testReflect } from './obj.js'

function component() {
  // 检测process.env.NODE_ENV
  console.log(process.env.NODE_ENV)

  var element = document.createElement('div');

  var btn = document.createElement('button');

  btn.innerHTML = 'Click me and check the console!';

  btn.onclick = testReflect;

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack fuck'], ' ');

  // 添加图
  // const MyIcon = new Image()
  // MyIcon.src = Icon

  // element.appendChild(MyIcon)

  return btn;
}

document.body.appendChild(component());