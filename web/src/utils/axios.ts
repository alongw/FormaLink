import axios from 'axios'

const request = axios.create({
    baseURL: import.meta.env.VITE_HTTP_BASE_URL
})

export type Response = { status: number }

export default request
