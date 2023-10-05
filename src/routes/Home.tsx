import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import { Wrapper } from "../components/common-components";
import { IAPIResponse, getPopular } from "../api";
import Movies from "../components/Movies";

const Loader = styled.div``;

function Home() {
  const { data: popularList, isLoading } = useQuery<IAPIResponse>({
    queryKey: ["getPopular"],
    queryFn: getPopular,
  });

  return (
    <Wrapper>
      <Header />
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>{popularList ? <Movies movieData={popularList} /> : null}</>
      )}
    </Wrapper>
  );
}

export default Home;
