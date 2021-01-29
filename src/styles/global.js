import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: ${props => props.theme.primaryColors.background};
    color: ${props => props.theme.primaryColors.text};
    font: 400 16px Roboto, sans-serif;
    -webkit-font-smoothing: antialiesed !important;
  }

  body html #root {
    height: 100%;
  }
`