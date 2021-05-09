import request from '@/utils/request'

export function getEmail(email) {
  return request({
    url: '/back/user/checkEmail',
    method: 'post',
    params: { 'emailAddress':email }  //向后端传递的参数
  })
}