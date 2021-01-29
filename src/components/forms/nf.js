import { TextField, FormControl, Select, MenuItem, InputLabel } from "@material-ui/core"
import styled from "styled-components"
import { getToken } from "../../pages/api/auth"
import { api } from "../../pages/api/hooks"
import ProductForm from "./product"

const nfType = [
  'ORIGEM',
  'DEVOLUÇÃO'
]

const Wrapper = styled(FormControl)`
  && {
    display: flex;
    flex-direction: column;
  }
`
const Title = styled.span`
  color: #b5b3b3;
  margin-bottom: 0.2rem;
`
const StyledTextField = styled(TextField)`
  && {
    margin: 4px;
  }
`
const StyledSelect = styled(Select)`
  && {
    margin: 4px;
  }
`
const StyledInputLabel = styled(InputLabel)`
  && {
    margin-left: 1.2rem;
  }
`

const NfForm = ({ value:nf, type, onChange }) => {
  let selectType
  if(!nf) {
    return (null)
  }

  if(type) {
    nfType.map(item => {
      if(item === type) {
        selectType = type
      }
    })
  }

  const handleSearch = async (key) => {
    try {
      const { data } = await api.get('nf', {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        },
        params: {
          key
        }
      })
  
      if(data) {
        onChange({ ...data })
      }
    } catch (error) {
      alert('Nf não encontrada!\nFavor verificar ou cadastrar uma nova Nf.')
    }
  }

  return (
    <Wrapper>
      <Title>NF {type}</Title>
      <StyledTextField
        label="CHAVE DE ACESSO"
        variant="outlined"
        value={nf.key ? nf.key : ''}
        onChange={e => onChange({ ...nf, key: e.target.value })}
        onBlur={e => handleSearch(nf.key)}
      />
      <FormControl>
        <StyledInputLabel>TIPO</StyledInputLabel>
        <StyledSelect
          label="TIPO"
          variant="outlined"
          value={nf.type ? nf.type : ''}
          onChange={e => onChange({ ...nf, type: e.target.value })}
        >
          <MenuItem key={selectType} value={selectType}>{selectType}</MenuItem>
         
        </StyledSelect>
      </FormControl>
      <StyledTextField
        label="Número"
        variant="outlined"
        value={nf.number ? nf.number : ''}
        onChange={e => onChange({ ...nf, number: e.target.value })}
      />
      <StyledTextField
        label="VALOR"
        variant="outlined"
        value={nf.value ? nf.value : ''}
        onChange={e => onChange({ ...nf, type: e.target.value })}
      />
      <StyledTextField
        label="DATA"
        type="datetime-local"
        variant="outlined"
        value={nf.emission ? nf.emission : ''}
        onChange={e => onChange({ ...nf, emission: e.target.value })}
      />
      <ProductForm
        value={nf.product ? nf.product : ''}
        onChange={e => onChange({ ...nf, product: e })}
      />
    </Wrapper>
  )
}

export default NfForm