import { createGlobalStyle } from "styled-components"
export const GlobalStyles = createGlobalStyle`

    body {
        font-family: 'Inter', sans-serif;
        background: ${props => props.theme.backgroundColor};
        color: ${props => props.theme.text};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    
  `
