import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: {
      modal: string;
      normal: string;
      circle: string;
      button: string;
    };
    textColor: {
      accent: string;
      normal: string;
    };
  }
}
