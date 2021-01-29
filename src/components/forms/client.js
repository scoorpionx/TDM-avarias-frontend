import { TextField, FormControl } from "@material-ui/core"
import styled from "styled-components"
import { getToken } from "../../pages/api/auth"
import { api } from "../../pages/api/hooks"

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

const ClientForm = ({ value:client, onChange }) => {
  if(!client) {
    return (null)
  }

  const handleSearch = async (fantasy_name) => {
    try {
      const { data } = await api.get('client', {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        },
        params: {
          fantasy_name
        }
      })
  
      if(data) {
        onChange({ ...data })
      }
    } catch (error) {
      alert('Cliente não encontrado!\nFavor verificar ou cadastrar um novo cliente.')
    }
  }

  return (
    <Wrapper>
      <Title>CLIENTE</Title>
      <StyledTextField
        label="Nome Fantasia"
        variant="outlined"
        value={client.fantasy_name ? client.fantasy_name : ''}
        onChange={e => onChange({ ...client, fantasy_name: e.target.value })}
        onBlur={e => handleSearch(client.fantasy_name)}
      />
      <StyledTextField
        label="Razão Social"
        variant="outlined"
        value={client.corporate_name ? client.corporate_name : ''}
        onChange={e => onChange({ ...client, corporate_name: e.target.value })}
      />
      <StyledTextField
        label="CNPJ"
        variant="outlined"
        value={client.cnpj ? client.cpnj : ''}
        onChange={e => onChange({ ...client, cnpj: e.target.value })}
        css={`width: 90%;`}
      />
      <StyledTextField
        label="UF"
        variant="outlined"
        value={client.uf ? client.uf : ''}
        onChange={e => onChange({ ...client, uf: e.target.value })}
        css={`width: 25%;`}
      />
      <StyledTextField
        label="Endereço"
        variant="outlined"
        value={client.address ? client.address : ''}
        onChange={e => onChange({ ...client, address: e.target.value })}
      />
      <StyledTextField
        label="Bairro"
        variant="outlined"
        value={client.district ? client.district : ''}
        onChange={e => onChange({ ...client, district: e.target.value })}
      />
      <StyledTextField
        label="Cidade"
        variant="outlined"
        value={client.city ? client.city : ''}
        onChange={e => onChange({ ...client, city: e.target.value })}
      />
    </Wrapper>
  )
}

export default ClientForm