import axios from 'axios'

export const getAvailableActivities = ({ offset, limit }) => {
  return axios.get(`https://sandbox.musement.com/api/v3/activities?limit=${limit}&offset=${offset}`, {
    headers: {
      'accept-language': 'it',
      'content-type': 'application/json',
      'x-musement-currency': 'EUR',
      'x-musement-version': '3.4.0'
    }
  })
}
