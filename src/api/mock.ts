interface ResData {
  code: number,
  message: string,
  data: any
}

function sleep(fn: (value? : any) => any, time? : number) {
  let sTime = time || 200
  return new Promise(function (resolve: (value: ResData) => any, reject) {
    setTimeout(() => {
      resolve(fn())
    }, sTime)
  })
}

function postTest(data?: any) {
  return sleep(() => {
    // console.log(data)111 
    const res = {
      code: 0,
      message	: '数据请求成功',
      data: {
        id: 1
      }
    }
    return res
  })
}

function getAppList (data: any) {
  return sleep(() => {
    // console.log(data) 
    const res = {
      code: 0,
      codeMsg: '数据请求成功',
      data: {
        rows: [
          {
            id: 1,
            name: '小李',
            type: 1,
            date: 1559705640126
          },
          {
            id: 2,
            name: '小黄',
            type: 2,
            date: 1559705640126
          }
        ],
        total: 30
      }
    }
    return res
  }, 1000)
}

function getDetailItem(data: any) {
  return sleep(() => {
    // console.log(data) 
    const res = {
      code: 0,
      codeMsg: '数据请求成功',
      data: {
        id: 1,
        name: '小李',
        type: 1,
        date: 1559705640126
      }
    }
    return res
  }, 1000)
}

let postDeletetItem = postTest
let postAddItem = postTest
let postModifyItem = postTest
// curd 结束

export {
  getAppList,
  getDetailItem,
  postDeletetItem,
  postAddItem,
  postModifyItem,
}