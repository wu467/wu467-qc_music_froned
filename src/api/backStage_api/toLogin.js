import request from '@/utils/request'

export function toLogin(DTO) {
  return request({
    url: '/back/user/login',
    method: 'post',
    params: { 'loginDTO': DTO}  //向后端传递的参数
  })
}