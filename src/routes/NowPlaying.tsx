import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import {
  LoaderWrapper,
  LoadingSpinner,
  Wrapper,
} from "../common/common-components";
import { getNowPlaying } from "../api";
import Movies from "../components/Movies";

function NowPlaying() {
  const { data: nowPlayingData, isLoading } = useQuery({
    queryKey: ["getNowPlaying"],
    queryFn: getNowPlaying,
  });

  return (
    <Wrapper>
      <Header />
      {isLoading ? (
        <LoaderWrapper>
          <LoadingSpinner />
        </LoaderWrapper>
      ) : (
        <>{nowPlayingData ? <Movies movieData={nowPlayingData} /> : null}</>
      )}
    </Wrapper>
  );
}

export default NowPlaying;
