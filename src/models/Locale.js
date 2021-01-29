export default class Locale {
  id
  name
  address
  district
  city
  uf
  
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.address = data.address
    this.district = data.district
    this.city = data.city
    this.uf = data.uf
  }
}