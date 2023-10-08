import { DefaultTheme } from "styled-components";

const darkTheme: DefaultTheme = {
  bgColor: {
    modal: "#262235",
    normal: "#1C1727",
    circle: "#C90659",
    button: "#8668ef",
  },
  textColor: {
    accent: "#CCCBD2",
    normal: "#FEFEFE",
    lighter: "#FEFEFE",
  },
  loadingColor: "#FFFFFF",
};

const lightTheme: DefaultTheme = {
  bgColor: {
    modal: "#FCFAFE",
    normal: "#FFFFFF",
    circle: "#CE085B",
    button: "#7f42f1",
  },
  textColor: {
    accent: "#535353",
    normal: "#262626",
    lighter: "#FEFEFE",
  },
  loadingColor: "#1C1727",
};

export { darkTheme, lightTheme };
