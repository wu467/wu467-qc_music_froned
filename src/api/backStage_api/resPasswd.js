import request from '@/utils/request'

/**
 * 通过cookie获取用户id，将用户id与待修改密码传给后端，后端返回验证码
 * @param {} email 
 * @returns 
 */
export function resPassword(userId, newPassword) {
  return request({
    url: '/back/user/resPassword',
    method: 'post',
    params: { 'uid':userId, 'newPasswd': newPassword }  //向后端传递的参数
  })
}