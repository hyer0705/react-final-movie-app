import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import { Loader, Wrapper } from "../common/common-components";
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
        <Loader>Loading...</Loader>
      ) : (
        <>{popularData ? <Movies movieData={popularData} /> : null}</>
      )}
    </Wrapper>
  );
}

export default Home;
