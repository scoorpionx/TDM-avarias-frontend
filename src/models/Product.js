import User from "./User"

const TranslateProductPacking = {
  '1': 'CX',
  '2': 'UN',
  '3': 'FD',
  '4': 'PCT'
}
export default class Product {
  id
  active
  name
  packing
  created_by
  updated_by
  
  constructor(data) {
    if(data === '') {
      this.id = '',
      this.active = '',
      this.name = '',
      this.packing = ''
    }
    
    this.id = data.id,
    this.active = data.active,
    this.name = data.name,
    this.packing = TranslateProductPacking[data.packing]
  }
} 