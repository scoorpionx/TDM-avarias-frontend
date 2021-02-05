import { api } from "../../hooks";

export async function makeRequestEditProduct(product, token) {
  const response = await api.patch(
    `product/${product.id}`, 
    product, 
    {
      headers: {
        'Authorization': `Bearer ${token}`
    }
  })
  return response.data
}

export async function makeRequestEditClient(client, token) {
  const response = await api.patch(
    `client/${client.id}`, 
    client, 
    {
      headers: {
        'Authorization': `Bearer ${token}`
    }
  })
  return response.data
}

export async function makeRequestEditLocale(locale, token) {
  const response = await api.patch(
    `locale/${locale.id}`, 
    locale, 
    {
      headers: {
        'Authorization': `Bearer ${token}`
    }
  })
  return response.data
}

export async function makeRequestEditNf(nf, token) {
  const response = await api.patch(
    `nf/${nf.id}`, 
    nf, 
    {
      headers: {
        'Authorization': `Bearer ${token}`
    }
  })
  return response.data
}

export async function makeRequestEditOccurrence(oc, token) {
  const response = await api.patch(
    `occurrence/${oc.id}`, 
    oc, 
    {
      headers: {
        'Authorization': `Bearer ${token}`
    }
  })
  return response.data
}