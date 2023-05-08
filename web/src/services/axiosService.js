
import axios from 'axios'


class AxiosService {
  
  constructor() {
    console.log('BASE_URL:', `@client-BASE_URL`);

    this.axiosInstance = axios.create({
      baseURL: process.env.BASE_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  setToken(token) {
    this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  removeToken() {
    delete this.axiosInstance.defaults.headers.common['Authorization']
  }
}

const axiosService = new AxiosService()

export default axiosService
