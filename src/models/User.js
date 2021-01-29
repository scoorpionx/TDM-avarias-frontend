export default class User {
  id
  username
  email
  role
  
  constructor(data) {
    this.id = data.id
    this.username = data.username
    this.email = data.email
    this.role = data.role
  }
}