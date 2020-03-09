// class GithubUser {
//   static getPublicServices () {
//     return ['login']
//   }

//   constructor (username, password) {
//     this.username = username
//     this.password = password
//   }

//   login () {
//     console.log(this.username + '要登录Github，密码是' + this.password)
//   }
// }

// 一般把公有方法放在类的原型上，所以不使用this.login = function () {}这种写法，
// 写在.prototype上是为了让所有的实例都能访问到

// 如何实现private方法呢？
// 如何实现protected属性/方法呢？


// 使用ES 5实现一个类 然后去继承它
function GithubUser (username, password) {
  let _password = password
  this.username = username

  GithubUser.prototype.login = function () {
    console.log(this.username + '要登录Github，密码是' + _password)
  }
}

  GithubUser.getPublicServices = function () {
  return ['login']
}

//  类式继承111111111111111111111111111111111111111111111111
// 掘金 继承自GithubUser类
// 类式继承
// 此时GdcJuejin instanceof JuejinUser不成立
function JuejinUser (username, password, article) {
  this.article = article

  const prototype = new GithubUser(username, password)

  prototype.readArticle = function () {
    console.log(`Read article ${this.article} times.`)
  }

  this.__proto__ = prototype
}

// new
export const GdcJuejin = new JuejinUser('guodongchao', '199411', 999)

// 构造函数式继承222222222222222222222222222222222222222222
// 构造函数式继承并不能继承父类原型上的方法
// 通过call 或者apply来继承
function ZhihuUser (username, password, article) {
  GithubUser.call(this, username, password)
  this.article = article
}

const ZhihuGdc = new ZhihuUser('guodongchao', 1994, 888)

// 组合式继承333333333333333333333333333333333
// 将类式继承和构造函数式继承结合起来
function WechatUser (username, password, article) {

  GithubUser.call(this, username, password)

  this.article = article
}

WechatUser.prototype = new GithubUser()
WechatUser.prototype.readArticle = function () {
  console.log(`Read article ${this.article} times.......`)
}

const WechatGdc = new WechatUser('ggchao', '199408', '777')

// 原型继承44444444444444444444444444444444444
// 实际上是对类式继承的一种封装，独特之处在于定义了一个干净的中间类

// 中间
function createObj (obj) {
  function fun () {}

  fun.prototype = obj

  return new fun()
}

// 寄生继承5555555555555555555555555555555555555
// 依托于一个对象而生的继承方式  *寄生
// const AliUserGdc = {
//   username: 'guodongchao',
//   password: '199408'
// }

// function AliUser (obj) {
//   const o = Object.create(obj)
//   o.prototype.readArticle = function () {
//     console.log(1)
//   }

//   return o
// }

// const AliGdc = new AliUser({ username: 'guodongchao', password: '199411' })

// 继生组合式继承66666666666666666666666666666666666666
// *缺点： 子类想要在原型上添加方法，必须在继承之后添加，
// *否则将覆盖掉原有原型上的方法。这样的话 若是已经存在的两个类，就不好办了。
// function inherit (child, parent) {
//   const p = Object.create(parent.prototype)

//   // 重写父类的原型
//   // *因为使用的Object.assign()方法，所以只适用于copy原型链上可枚举的方法
//   child.prototype = Object.assign(p, child.prototype)

//   // 重写被污染的child的constructor
//   p.constructor = child
// }

// // 子类
// function ByteUser (username, password, article) {
//   GithubUser.call(this, username, password)

//   this.article = article
// }

// ByteUser.prototype.readArticle = function () {
//   console.log(this.article)
// }

// inherit(ByteUser, GithubUser)

// // 在继承之后再添加方法 所以如果是已存在的类 那就无能为力了 方法会被覆盖掉

// // 实例化
// const ByteGdc = new ByteUser('gdc', '199411', '6666')

// 终极方法 完全体 77777777777777777777777777

// 复制所有的源键
function finalShadowMerge(target, source) {
  for (const key of Reflect.ownKeys(source)) {
    Reflect.defineProperty(target, key, Reflect.getOwnPropertyDescriptor(source, key))
  }

  return target
}

// core
function inherit (child, parent) {
  const objPrototype = Object.prototype

  // 继承父类的原型
  const parentPrototype = Object.create(parent.prototype)

  const childPrototype = Object.create(child.prototype)

  // 若子类没有继承任何类，就直接合并子类和父类上的所有方法
  // 包含可枚举、不可枚举的所有方法
  if (Reflect.getPrototypeOf(childPrototype) === objPrototype) {
    child.prototype = finalShadowMerge(parentPrototype, childPrototype)
  } else {
    // 子类继承了其它类
    while (Reflect.getPrototypeOf(childPrototype) !== objectPrototype) {
      childPrototype = Reflect.getPrototypeOf(childPrototype)
    }

    Reflect.setPrototypeOf(childPrototype, parent.prototype)
  }

  // 重写被污染的子类的constructor
  child.constructor = child
}

export function getGdc () {
  console.log(ByteGdc)
}


// Reflect
export function testReflect() {
  const obj = {
    name: 'guoodngcaho',
    sex: 'male'
  }

  Reflect.deleteProperty(obj, 'name')

  console.log(Reflect.getPrototypeOf(obj))
}