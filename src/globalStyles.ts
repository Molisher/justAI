import { createGlobalStyle } from "styled-components/macro";

export const GlobalStyles = createGlobalStyle`

    html{
        height: 100%;
        box-sizing: border-box;
    }

    *, *::after, *::before{
        box-sizing: inherit;
    }

    body{
        height: 100%;
        margin: 0;
        padding: 0;
    }

    h1, h2, h3, h4, h5, h6{
        margin: 0;
        font-weight: normal;
        font-size: 1rem;
    }
    
    #root{
        height: 100%;
    }
    
    ul{ 
        padding: 0;
        margin: 0;
    }
    
    p{ 
        margin: 0;
    }
    `;
