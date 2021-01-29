import useSWR from 'swr'
import axios from 'axios';
import { getToken } from './auth';


export const api = axios.create({
  baseURL: 'http://192.168.0.209:3333'
})

export function useGet(url, token) {
  const { data, error } = useSWR(url, async url => {
    const response = await api.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }, { refreshInterval: 10000 });
    return response.data;
  })
  
  return { data, error }
}

export function useGetIndexAll(url, token, page, status) {
  const { data, error } = useSWR(url, async url => {
    const response = await api.post(url, {
      status: status,
    }, {
      headers: { 'Authorization': `Bearer ${token}` },
      params: { page }
    });
    return response.data;
  })
  
  return { data, error }
}

export function usePost(url, body) {
  const { data, error } = useSWR(url, async url => {
    const response = await api.post(url, body);

    return response.data;
  })

  return { data, error }
}