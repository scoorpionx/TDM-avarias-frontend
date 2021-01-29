export function transformData(data) {
  const product = {
    "name": data.nfd.product.name,
    "packing": data.nfd.product.packing,
  }
  const locale = {
    "name": data.locale.name,
    "address": data.locale.address,
    "district": data.locale.district,
    "city": data.locale.city,
    "uf": data.locale.uf,
  }
  const client = {
    "corporate_name": data.client.corporate_name,
    "fantasy_name": data.client.fantasy_name,
    "cnpj": data.client.cnpj,
    "address": data.client.address,
    "district": data.client.district,
    "city": data.client.city,
    "uf": data.client.uf,
  }
  const nfo = {
    "number": data.nfo.number,
    "type": data.nfo.type,
    "key": data.nfo.key.key,
    "emission": data.nfo.emission.emission,
    "value": data.nfo.value,
  }
  const nfd = {
    "number": data.nfd.number,
    "type": data.nfd.type,
    "key": data.nfd.key.key,
    "emission": data.nfd.emission.emission,
    "value": data.nfd.value,
    "product": {
      "id": data.nfd.product.id
    }
  }
  const occurrence = {
    "client_id_fk": data.client.id,
    "nfo_id_fk": data.nfo.id,
    "nfd_id_fk": data.nfd.id,
    "locale_id_fk": data.locale.id,
    "occurrence_num_vr": data.occurrence_num_vr,
    "status": data.status ,
    "type": data.type,
    "cte_filial": data.cte.filial,
    "cte_num": data.cte.codigo,
    "name_mot": data.name_mot,
    "dt_carga": data.dt_carga,
    "released_on_vr": data.released_on_vr,
    "debit_mot": data.debit_mot,
    "value_sold": data.value_sold,
    "value_debit_mot": data.value_debit_mot,
    "loss": data.loss,
    "nfd_in": data.nfd.in,
    "nfd_out": data.nfd.out,
    "obs": data.obs,
  }
  return { product, locale, client, nfo, nfd, occurrence }
}