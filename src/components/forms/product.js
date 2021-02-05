import { TextField, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core"
import styled from "styled-components"
import { getToken } from "../../pages/api/auth"
import { api } from "../../pages/api/hooks"

const packing = [
  'PCT',
  'FD',
  'UN',
  'CX',
]

const Wrapper = styled(FormControl)`
  && {
    display: flex;
    flex-direction: column;
  }
`
const Title = styled.span`
  color: #b5b3b3;
`
const StyledTextField = styled(TextField)`
  && {
    margin: 4px;
  }
`
const StyledInputLabel = styled(InputLabel)`
  && {
    margin-left: 1.2rem;
  }
`
const StyledSelect = styled(Select)`
  && {
    margin: 4px;
  }
`

const ProductForm = ({ value:product, onChange }) => {
  if(!product) {
    return (null)
  }

  const handleSearch = async (name) => {
    try {
      const { data } = await api.get('product', {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        },
        params: {
          name
        }
      })
  
      if(data) {
        onChange({ ...data })
      }
    } catch (error) {
      alert('Produto não encontrado!\nFavor verificar ou cadastrar um novo produto.')
    }
  }

  return (
    <Wrapper>
      <Title>Produto</Title>
      <StyledTextField
        label="Nome"
        variant="outlined"
        value={product.name ? product.name : ''}
        onChange={e => onChange({ ...product, name: e.target.value })}
        onBlur={e => handleSearch(product.name)}
      />
      <FormControl>
        <StyledInputLabel>EMBALAGEM</StyledInputLabel>
        <StyledSelect
          label="EMBALAGEM"
          variant="outlined"
          value={product?.packing}
          onChange={e => onChange({ ...product, packing: e.target.value })}
        >
          {packing.map((item) => (
            <MenuItem key={item} value={item}>{item}</MenuItem>
          ))}
        </StyledSelect>
      </FormControl>
    </Wrapper>
  )
}

export default ProductForm