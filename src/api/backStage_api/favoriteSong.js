import request from '@/utils/request'

export function getFavoriteSong(userId, songmid) {
  return request({
    url: '/back/songs/favoriteSong',
    method: 'get',
    params: {
        'userId': userId,
        'songMid': songmid
    }
  })
}