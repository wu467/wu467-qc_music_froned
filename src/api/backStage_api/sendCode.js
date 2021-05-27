import request from '@/utils/request'

// 待优化：此处生成验证码发送给后端，并将生成的验证码从方法中返回
export function sendCode(email, yzm) {
    return request({
      url: '/back/user/sendCode',
      method: 'post',
      params: { 'uEmail':email, 'yzm': yzm }  //向后端传递的参数
    })
  }