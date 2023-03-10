import { createTheme, ThemeProvider } from "@mui/material/styles";
declare module "@mui/material/styles" {
  
  interface Theme {
    palette: {
      primary: {
        dark: React.CSSProperties["color"];
        main: React.CSSProperties["color"];
        light: React.CSSProperties["color"];
      };
      neutral: {
        dark: React.CSSProperties["color"];
        main: React.CSSProperties["color"];
        mediumMain: React.CSSProperties["color"];
        medium: React.CSSProperties["color"];
        light: React.CSSProperties["color"];
      };
      backgrounds: {
        alt: React.CSSProperties["color"];
        default: React.CSSProperties["color"];
      };
    };
    typography: {
      fontFamily: string;
      fontSize: number;
      h1: {
        fontFamily: string;
        fontSize: number;
      };
      h2: {
        fontFamily: string;
        fontSize: number;
      };
      h3: {
        fontFamily: string;
        fontSize: number;
      };
      h4: {
        fontFamily: string;
        fontSize: number;
      };
      h5: {
        fontFamily: string;
        fontSize: number;
      };
      h6: {
        fontFamily: string;
        fontSize: number;
      };
    };
  }
 
}
