import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import {
  LoaderWrapper,
  LoadingSpinner,
  Wrapper,
} from "../common/common-components";
import { getComingSoon } from "../api";
import Movies from "../components/Movies";

function ComingSoon() {
  const { data: comingSoonData, isLoading } = useQuery({
    queryKey: ["getComingSoon"],
    queryFn: getComingSoon,
  });

  return (
    <Wrapper>
      <Header />
      {isLoading ? (
        <LoaderWrapper>
          <LoadingSpinner />
        </LoaderWrapper>
      ) : (
        <>{comingSoonData ? <Movies movieData={comingSoonData} /> : null}</>
      )}
    </Wrapper>
  );
}

export default ComingSoon;
