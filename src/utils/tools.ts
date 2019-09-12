interface Debounced {
  (value?: any): any,
  cancel?: () => any 
}

function toD (num: number) {
  return num < 10 ? '0' + num : '' + num
}

/**
 * 时间转换
 * @param  {any} time 时间。必填，支持时间戳、Date 实例、符合时间的字符串（如 '2018-10-10'）
 * @param  {string} type 类型。可选，默认不填则精确到日。取值 'year'、'month'、'timestamp'、'timestamp-unix'、'timestamp-mysql'。
 */
function tranTime (time: any, type?: any) {
  let date = new Date(time)
  if (date.toString() === 'Invalid Date') {
    return ''
  }
  // 年
  if (type === 'year') {
    return date.getFullYear()
  }
  // 月
  if (type === 'month') {
    return date.getFullYear() + '-' + toD(date.getMonth() + 1)
  }
  // 13 位时间戳
  if (type === 'timestamp') {
    return date.getTime()
  }
  // 10 位时间戳
  if (type === 'timestamp-unix') {
    return Math.round(date.getTime() / 1000)
  }
  // 数据库中的 timestamp
  if (type === 'timestamp-mysql') {
    return date.getFullYear() + '-' + toD(date.getMonth() + 1) + '-' + toD(date.getDate()) + ' ' + date.toTimeString().slice(0, 8)
  }
  if (type === 'md-chinese') {
    return toD(date.getMonth() + 1) + '月' + toD(date.getDate()) + '日'
  }
  // 默认返回到日
  return date.getFullYear() + '-' + toD(date.getMonth() + 1) + '-' + toD(date.getDate())
}

/**
 * 函数防抖
 * @param  {function} fn 目标函数
 * @param  {number} wait 防抖时间
 * @param  {boolean} immediate 是否立即执行，若为 true ,则在防抖时间前执行
 */
function debounce(fn: any, wait: number, immediate?: any) {
  let timer: any, res: any
  let debounced: Debounced = function (this: any, ...args) {
    let that = this
    clearTimeout(timer)
    if (immediate) {
      if (!timer) {
        res = fn.apply(that, args)
      }
      timer = setTimeout(() => {
        timer = null
      }, wait)
    } else {
      timer = setTimeout(() => {
        fn.apply(that, args)
      }, wait)
    }
    return res // immediate 为 true 才有用
  }
  debounced.cancel = function () { // immediate 为 true 才有用
    clearTimeout(timer)
    timer = null
  }
  return debounced
}


export {
  tranTime,
  debounce
}