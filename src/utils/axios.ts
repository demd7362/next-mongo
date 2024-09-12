import axios from 'axios'

const $axios = axios.create({
  baseURL: process.env.BASE_URL!,
})
export default $axios
