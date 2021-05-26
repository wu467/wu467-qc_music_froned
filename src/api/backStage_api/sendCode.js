import request from '@/utils/request'

export function sendCode(email, yzm) {
    return request({
      url: '/back/user/sendCode',
      method: 'post',
      params: { 'uEmail':email, 'yzm': yzm }  //向后端传递的参数
    })
  }