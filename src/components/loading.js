import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  .lds-dual-ring {
    display: inline-block;
    width: 80px;
    height: 80px;
  }
  .lds-dual-ring:after {
    content: " ";
    display: block;
    width: 85px;
    height: 85px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid ${props => props.theme.primaryColors.background};
    border-color: 
      ${props => props.theme.primaryColors.primary} 
      transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const loadingComponent = () => {
  return (
    <Wrapper>
      <div className="lds-dual-ring"></div>
    </Wrapper>
  )
}

export default loadingComponent