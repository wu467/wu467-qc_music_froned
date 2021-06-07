import request from '@/utils/request'

/**
 * 用户收藏或取消收藏歌曲
 * @param {用户唯一ID} userId 
 * @param {歌曲唯一ID} songmid 
 * @returns 
 */
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