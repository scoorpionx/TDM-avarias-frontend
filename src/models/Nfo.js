import Product from "./Product"

export default class Nfo {
  id
  active
  number
  type
  key
  emission
  value
  product

  constructor(data) {
    this.id = data.id
    this.active = data.active
    this.number = data.number
    this.type = data.type
    this.key = data.key
    this.emission = new Date(data.emission)
    this.value = data.value
  }
}