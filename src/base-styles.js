import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: 'Roboto', sans-serif;
        -webkit-font-smoothing: antialiased;
    }

    h1, h2, h3, h4, h5, h6, button {
        font-family: 'Playfair Display', serif;
    }
`;

export default GlobalStyle;
