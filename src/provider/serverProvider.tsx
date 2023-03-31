import axios from 'axios'

const baseURL =  import.meta.env.VITE_SERVER_URL?.toString()

export const serverAPI = axios.create({ baseURL })

// set the token if this exists
