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
  },
  loadingColor: "#fff", // 추후 변경 필요
};

const lightTheme: DefaultTheme = {
  bgColor: {
    modal: "#FCFAFE", // 해당 컬러는 좀 더 생각해보기로
    normal: "#FFFFFF",
    circle: "#CE085B",
    button: "#7f42f1",
  },
  textColor: {
    accent: "#535353",
    normal: "#262626",
  },
  loadingColor: "#000",
};

export { darkTheme, lightTheme };
