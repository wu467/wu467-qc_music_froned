import request from '@/utils/request'

export function toRegister(DTO) {
  console.log(DTO)
  return request({
    url: '/back/user/register',
    method: 'post',
    params: { 'registerDTO': DTO}  //向后端传递的参数
  })
}