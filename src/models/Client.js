export default class Client {
  id
  active
  corporate_name
  fantasy_name
  cnpj
  address
  district
  city
  uf
 
  constructor(data) {
    this.id = data.id
    this.active = data.active
    this.corporate_name = data.corporate_name
    this.fantasy_name = data.fantasy_name
    this.cnpj = data.cnpj
    this.address = data.address
    this.district = data.district
    this.city = data.city
    this.uf = data.uf
  }
}