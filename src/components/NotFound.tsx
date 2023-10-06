import styled from "styled-components";

const Wrapper = styled.section`
  width: 100vw;
  height: 100vh;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 56px;
  font-weight: 700;
  margin-bottom: 48px;
`;

const Explain = styled.h4`
  text-align: center;
  font-size: 18px;
`;

function NotFound() {
  return (
    <Wrapper>
      <Title>Ooops...😭 Error 404</Title>
      <Explain>Sorry, but the page you are looking for doesn't exist.</Explain>
    </Wrapper>
  );
}

export default NotFound;
