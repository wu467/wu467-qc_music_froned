import Cookies from 'js-cookie'

export function getCookie(cookieKey) {
    // 获取cookie名为username的value
    return Cookies.get(cookieKey)
}