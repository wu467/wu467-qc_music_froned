import request from '@/utils/request'

export function getAllFavorite(userId) {
  return request({
    url: '/back/songs/allFavoriteSong',
    method: 'get',
    params: {
        'userId': userId
    }
  })
}