import styled, { keyframes } from "styled-components";

export const Wrapper = styled.main`
  width: 100%;
  max-width: 720px;
  margin: 35px auto 0 auto;
`;

export const LoaderWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 20vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

export const LoadingSpinner = styled.span`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  border-top: 3px solid ${(props) => props.theme.loadingColor};
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
