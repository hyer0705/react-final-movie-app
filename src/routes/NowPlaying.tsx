import { useQuery } from "@tanstack/react-query";
import { Wrapper } from "../common/common-components";
import { getNowPlaying } from "../api";
import Movies from "../components/Movies";
import Loader from "../components/Loader";

function NowPlaying() {
  const { data: nowPlayingData, isLoading } = useQuery({
    queryKey: ["getNowPlaying"],
    queryFn: getNowPlaying,
  });

  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>{nowPlayingData ? <Movies movieData={nowPlayingData} /> : null}</>
      )}
    </Wrapper>
  );
}

export default NowPlaying;
