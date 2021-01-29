import { useEffect, useState } from "react"
import styled from "styled-components"
import { getToken, login } from "./api/auth"
import { api } from "./api/hooks"
import { useRouter } from 'next/router'
import withGlobalStateHookWrapper from '../context/withGlobalStateHookWrapper'
import { Button, TextField } from "@material-ui/core"

const LoginContainer = styled.div`
  background: ${props => props.theme.secondaryColors.background};
  color: ${props => props.theme.secondaryColors.text};
  font-size: 16pt;
  padding: 30px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40%;
  height: 40%;
  margin: auto;
  text-align: center;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

const Text = styled.span`
  font-size: 20pt;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`

const FormInput = styled(TextField)`
  && {
    margin-bottom: 4px;
    color: ${props => props.theme.primaryColors.primary}
  }
`

const SendButton = styled(Button)`
  && {
    margin-bottom: 4px;
    background-color: ${props => props.theme.primaryColors.primary}
  }
`

const RegisterButton = styled(Button)`
  && {
    background-color: ${props => props.theme.primaryColors.primary};
  }
`

function LoginScreen(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = getToken()
    if(token) {
      router.push('/')
    }

    if(!token) {
      setIsAuthenticated(false)
    }
  }, [])

  useEffect(() => {
    if(email != '' && password != '') {
      setDisabled(false)
    }
  }, [email, password, disabled])
  
  const handleLogin = async () => {
    try {
      const { data } = await api.post('authenticate', { email, password }); 
      login(data.token)
      props.globalState.setToken(data.token)
      router.push('/')
    } catch (err) {
      alert(err.message)
    }    
  }

  const handleRegister = () => {
    router.push('/register')    
  }

  return (
    !isAuthenticated ? 
      <LoginContainer>
        <Text>LOGIN</Text>
        <Form>
          <FormInput 
            label="Email"
            required
            variant="outlined"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <FormInput 
            label="Senha"
            type="password"
            required
            variant="outlined"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <SendButton
            variant="contained"
            color="primary"
            disabled={disabled}
            size="large"
            onClick={handleLogin}
            disableElevation
          >
            Enviar
          </SendButton>
          <RegisterButton
            variant="contained"
            color="primary"
            size="large"
            onClick={handleRegister}
          >
            Registrar
          </RegisterButton>
        </Form>
      </LoginContainer>
    :
    null
  )
}

export default withGlobalStateHookWrapper(LoginScreen)