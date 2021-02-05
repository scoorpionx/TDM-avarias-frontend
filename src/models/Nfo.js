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
    this.emission = data.emission.replace('.000Z', '')
    this.value = data.value
  }

}