import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import {
  LoaderWrapper,
  LoadingSpinner,
  Wrapper,
} from "../common/common-components";
import { IAPIResponse, getPopular } from "../api";
import Movies from "../components/Movies";

function Home() {
  const { data: popularData, isLoading } = useQuery<IAPIResponse>({
    queryKey: ["getPopular"],
    queryFn: getPopular,
  });

  return (
    <Wrapper>
      <Header />
      {isLoading ? (
        <LoaderWrapper>
          <LoadingSpinner />
        </LoaderWrapper>
      ) : (
        <>{popularData ? <Movies movieData={popularData} /> : null}</>
      )}
    </Wrapper>
  );
}

export default Home;
