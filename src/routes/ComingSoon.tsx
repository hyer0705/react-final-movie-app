import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import { Wrapper } from "../common/common-components";
import { getComingSoon } from "../api";
import Movies from "../components/Movies";
import Loader from "../components/Loader";

function ComingSoon() {
  const { data: comingSoonData, isLoading } = useQuery({
    queryKey: ["getComingSoon"],
    queryFn: getComingSoon,
  });

  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>{comingSoonData ? <Movies movieData={comingSoonData} /> : null}</>
      )}
    </Wrapper>
  );
}

export default ComingSoon;
