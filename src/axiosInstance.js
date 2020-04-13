import axios from 'axios'

const API = 'https://coronavirus-tracker-api.herokuapp.com/v2/locations'

const instance = axios.create({
    baseURL: API,
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
})

export default instance
