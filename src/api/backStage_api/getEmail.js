import request from '@/utils/request'

// 用户注册时，判断邮箱是否注册（异步）
export function getEmail(email) {
  return request({
    url: '/back/user/checkEmail',
    method: 'post',
    params: { 'emailAddress':email }  //向后端传递的参数
  })
}