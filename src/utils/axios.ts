import axios from 'axios'

const $axios = axios.create({
  baseURL: process.env.BASE_URL!,
})
export default $axios


export const handleError = (e: any) => {
  switch (e.status) {
    case 400:
      alert('잘못된 요청입니다.')
      break
    case 401:
      alert('로그인이 필요합니다.')
      break
    case 403:
      alert('권한이 없습니다.')
  }
}
