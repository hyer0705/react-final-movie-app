import { useQuery } from "@tanstack/react-query";
import { Wrapper } from "../common/common-components";
import { IAPIResponse, getPopular } from "../api";
import Movies from "../components/Movies";
import Loader from "../components/Loader";

function Home() {
  const { data: popularData, isLoading } = useQuery<IAPIResponse>({
    queryKey: ["getPopular"],
    queryFn: getPopular,
  });

  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>{popularData ? <Movies movieData={popularData} /> : null}</>
      )}
    </Wrapper>
  );
}

export default Home;
