import React from 'react';
import axios from 'axios'


class AxiosService {
  axiosInstance;
  
  constructor() {
    console.log('prueba', process.env.API_URL);

    this.axiosInstance = axios.create({
      baseURL: process.env.API_URL,
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
