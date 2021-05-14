import request from '@/utils/request'

export function toLogin(DTO) {
  console.log("toLogin执行了")
  console.log(DTO)
  return request({
    url: '/back/user/login',
    method: 'post',
    params: { 'loginDTO': DTO}  //向后端传递的参数
  })
}