import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import { Wrapper } from "../components/common-components";
import { IAPIResponse, getPopular, makeImagePath } from "../api";

const Loader = styled.div``;

const Movies = styled.section`
  padding-top: calc(10vh + 65px);
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(3, 1fr);
  @media screen and (max-width: 540px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 420px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Movie = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;
`;

const Img = styled.img`
  width: 200px;
  height: 300px;
  border-radius: 15px;
  margin-bottom: 20px;
`;

const Title = styled.h3`
  width: 200px; // 추후에 삭제
  font-size: 20px;
  font-weight: 700;
  text-align: center;
`;

function Home() {
  const { data: popularList, isLoading } = useQuery<IAPIResponse>({
    queryKey: ["getPopular"],
    queryFn: getPopular,
  });

  console.log(popularList);

  return (
    <Wrapper>
      <Header />
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Movies>
          {popularList?.results.map((movie) => (
            <Movie>
              <Img src={makeImagePath(movie.poster_path)} />
              <Title>{movie.title}</Title>
            </Movie>
          ))}
        </Movies>
      )}
    </Wrapper>
  );
}

export default Home;
