

export function getSongList() {
  return request({
    url: 'https://api.qq.jsososo.com/recommend/playlist/u',
    method: 'get'
  })
}