import request from '@/utils/request'

export function getNotices() {
  return request({
    url: '/notices/show',
    method: 'get'
  })
} 