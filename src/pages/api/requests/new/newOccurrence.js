import { api } from "../../hooks";

export async function makeRequestNewProduct(product, token) {
  const response = await api.post(
    `product/`, 
    product, 
    {
      headers: {
        'Authorization': `Bearer ${token}`
    }
  })
  return response.data
}

export async function makeRequestNewClient(client, token) {
  const response = await api.post(
    `client`, 
    client, 
    {
      headers: {
        'Authorization': `Bearer ${token}`
    }
  })
  return response.data
}

export async function makeRequestNewLocale(locale, token) {
  const response = await api.post(
    `locale`, 
    locale, 
    {
      headers: {
        'Authorization': `Bearer ${token}`
    }
  })
  return response.data
}

export async function makeRequestNewNf(nf, token) {
  const response = await api.post(
    `nf`, 
    nf, 
    {
      headers: {
        'Authorization': `Bearer ${token}`
    }
  })
  return response.data
}

export async function makeRequestNewOccurrence(oc, token) {
  const response = await api.post(
    `occurrence`, 
    oc, 
    {
      headers: {
        'Authorization': `Bearer ${token}`
    }
  })
  return response.data
}