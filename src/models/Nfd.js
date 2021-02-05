import User from "./User"

export default class Nfd {
  id
  active
  number
  type
  key
  emission
  value
  in
  out
  product

  constructor(data) {
    this.id = data.id
    this.active = data.active
    this.number = data.number
    this.type = data.type
    this.key = data.key
    this.emission = data.emission.replace('.000Z', '')
    this.value = data.value
    this.in = new Date(data.in)
    this.out = new Date(data.out)
    this.product = data.product
    if(data.created_by) {
      this.created_by = new User({
        id: data.created_by.id,
        username: data.created_by.username,
        email: data.created_by.email,
        role: data.created_by.role,
      })
    }
    if(data.updated_by) {
      this.updated_by = new User({
        id: data.updated_by.id,
        username: data.updated_by.username,
        email: data.updated_by.email,
        role: data.updated_by.role,
      })
    } 
  }
}