import request from '@/utils/request'

export function getNotices() {
  return request({
    url: '/back/notice/findAllNotice',
    method: 'get'
  })
}