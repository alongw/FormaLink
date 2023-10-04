import axios from '@/utils/axios'
import type { Response } from '@/utils/axios'

export const sendMessage = (
    callback: string,
    nickname: string,
    email: string,
    country: string,
    message: string
) => {
    return axios.post<Response>('/sendMessage', {
        callback,
        nickname,
        email,
        country,
        message
    })
}
