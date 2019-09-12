function limitWord(rule: any, value: any, callback: any, max: number, isMust = false) {
  if (isMust) {
    if ((value + '').trim() === '') {
      return callback(new Error('不能为空！'))
    }
  }
  if (value.length > max) {
    return callback(new Error(`限制在 ${max} 字以内！`))
  }
  callback()
}

/**
 * 限制字数
 * @param  {number} max 最大字数
 * @param  {boolean} isMust 是否必填.
 * @param  {} trigger 触发类型.默认为 ['blur','change']
 */
function checkLimitWord(max: number, isMust: any, trigger = ['blur', 'change']) {
  return [{
    validator(rule: any, value: any, callback: any) {
      return limitWord(rule, value, callback, max, isMust)
    },
    trigger
  }]
}

export {
  checkLimitWord
}