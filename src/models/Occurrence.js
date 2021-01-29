import Client from './Client'
import Cte from './Cte'
import Locale from './Locale'
import Nfo from './Nfo'
import Nfd from './Nfd'
import User from './User'
import Product from './Product'

export default class Occurrence {
  id
  occurrence_num_vr
  status
  type
  cte
  name_mot
  dt_carga
  released_on_vr
  debit_mot
  value_sold
  value_debit_mot
  loss
  obs
  nfo
  nfd
  locale
  client
  created_by
  updated_by

  constructor(data) {
    if(!data) return this.setEmpty()

    this.id = data.id
    this.occurrence_num_vr = data.occurrence_num_vr
    this.status = data.status
    this.type = data.type
    this.cte = new Cte({
      cte_filial: data.cte_filial,
      cte_num: data.cte_num
    })
    this.name_mot = data.name_mot
    this.dt_carga = data.dt_carga
    this.released_on_vr = data.released_on_vr
    this.debit_mot = data.debit_mot
    this.value_sold = data.value_sold
    this.value_debit_mot = data.value_debit_mot
    this.loss = data.loss
    this.obs = data.obs
    this.nfo = new Nfo({
      id: data.nfo.id,
      active: data.nfo.active,
      number: data.nfo.number,
      type: data.nfo.type,
      key: data.nfo.key,
      emission: data.nfo.emission,
      value: data.nfo.value,
    })
    this.nfd = new Nfd({
      id: data.nfd.id,
      active: data.nfd.active,
      number: data.nfd.number,
      type: data.nfd.type,
      key: data.nfd.key,
      emission: data.nfd.emission,
      value: data.nfd.value,
      in: data.nfd_in,
      out: data.nfd_out,
      product: new Product(data.nfd.product)
    })
    this.locale = new Locale({
      id: data?.locale?.id,
      name: data?.locale?.name,
      address: data?.locale?.address,
      district: data?.locale?.district,
      city: data?.locale?.city,
      uf: data?.locale?.uf,
    })
    this.client = new Client({
      id: data.client.id,
      active: data.client.active,
      corporate_name: data.client.corporate_name,
      fantasy_name: data.client.fantasy_name,
      cnpj: data.client.cnpj,
      address: data.client.address,
      district: data.client.district,
      city: data.client.city,
      uf: data.client.uf,
    })
    this.created_by = new User({
      id: data.created_by.id,
      username: data.created_by.username,
      email: data.created_by.email,
      role: data.created_by.role,
    })
    this.updated_by = new User({
      id: data.updated_by.id,
      username: data.updated_by.username,
      email: data.updated_by.email,
      role: data.updated_by.role,
    })
  }
  
  setEmpty() {
    this.id = '',
    this.occurrence_num_vr = '',
    this.status = '',
    this.type = '',
    this.cte = new Cte({
      cte_filial: '',
      cte_num: '',
    })
    this.name_mot = '',
    this.dt_carga = '',
    this.released_on_vr = '',
    this.debit_mot = '',
    this.value_sold = '',
    this.value_debit_mot = '',
    this.loss = '',
    this.obs = '',
    this.nfo = new Nfo({
      id: '',
      active: '',
      number: '',
      type: '',
      key: '',
      emission: '',
      value: '',
    })
    this.nfd = new Nfd({
      id: '',
      active: '',
      number: '',
      type: '',
      key: '',
      emission: '',
      value: '',
      in: '',
      out: '',
      product: new Product('')
    })
    this.locale = new Locale({
      id: '',
      name: '',
      address: '',
      district: '',
      city: '',
      uf: '',
    })
    this.client = new Client({
      id: '',
      active: '',
      corporate_name: '',
      fantasy_name: '',
      cnpj: '',
      address: '',
      district: '',
      city: '',
      uf: '',
    })
    this.created_by = new User({
      id: '',
      username: '',
      email: '',
      role: '',
    })
    this.updated_by = new User({
      id: '',
      username: '',
      email: '',
      role: '',
    })
  }
}