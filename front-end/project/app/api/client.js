import { create } from 'apisauce'

const apiClient = create({
    baseURL: 'http://192.168.0.14:9000/api'
})

export default apiClient;