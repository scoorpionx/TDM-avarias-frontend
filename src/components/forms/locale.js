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

const LocaleForm = ({ value:locale, onChange }) => {
  if(!locale) {
    return (null)
  }

  const handleSearch = async (name) => {
    try {
      const { data } = await api.get('locale', {
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
      alert('Localização não encontrado!\nFavor verificar ou cadastrar um novo localee.')
    }
  }

  return (
    <Wrapper>
      <Title>LOCALIZAÇÃO</Title>
      <StyledTextField
        label="Nome"
        variant="outlined"
        value={locale.name ? locale.name : ''}
        onChange={e => onChange({ ...locale, name: e.target.value })}
        onBlur={e => handleSearch(locale.name)}
      />
      <StyledTextField
        label="UF"
        variant="outlined"
        value={locale.uf ? locale.uf : ''}
        onChange={e => onChange({ ...locale, uf: e.target.value })}
        css={`width: 25%;`}
      />
      <StyledTextField
        label="Endereço"
        variant="outlined"
        value={locale.address ? locale.address : ''}
        onChange={e => onChange({ ...locale, address: e.target.value })}
      />
      <StyledTextField
        label="Bairro"
        variant="outlined"
        value={locale.district ? locale.district : ''}
        onChange={e => onChange({ ...locale, district: e.target.value })}
      />
      <StyledTextField
        label="Cidade"
        variant="outlined"
        value={locale.city ? locale.city : ''}
        onChange={e => onChange({ ...locale, city: e.target.value })}
      />
    </Wrapper>
  )
}

export default LocaleForm