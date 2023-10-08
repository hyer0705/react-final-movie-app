import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import styled from "styled-components";
import { IMovieDetail, getMovie, makeBgPath } from "../api";
import { UNSELECTED_STATE } from "../common/constants";
import Loader from "./Loader";

const DetailModal = styled(motion.div)`
  width: 70vh;
  height: 80vh;
  position: fixed;
  top: 15vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  background-color: ${(props) => props.theme.bgColor.modal};
  overflow: hidden;
  @media screen and (max-width: 720px) {
    width: 60vh;
  }
  @media screen and (max-width: 540px) {
    width: 50vh;
  }
`;

const BgCover = styled.div<{ $imgPath: string }>`
  width: 100%;
  background-size: cover;
  background-position: center center;
  background-image: linear-gradient(to top, black, transparent),
    url(${(props) => props.$imgPath});
  height: 300px;
`;

const DetailInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  position: relative;
  top: -25px;
`;

const DetailTitle = styled.h3`
  color: ${(props) => props.theme.textColor.accent};
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 12px;
`;

const DetailOverview = styled.p`
  font-size: 16px;
  margin-bottom: 24px;
`;

const DetailInfoItem = styled.span`
  font-size: 14px;
  margin-bottom: 5px;
  a {
    text-decoration: underline;
  }
`;

const Svg = styled.svg`
  width: 25px;
  font-weight: 700;
  position: absolute;
  top: 10px;
  right: 10px;
  fill: ${(props) => props.theme.bgColor.button};
  cursor: pointer;
`;

const Overlay = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
`;

const overlayVariants = {
  exit: {
    opacity: 0,
  },
  normal: {
    opacity: 1,
  },
};

interface IDetailProps {
  movieId: number;
  setMovieId: React.Dispatch<React.SetStateAction<number>>;
}

function Detail({ movieId, setMovieId }: IDetailProps) {
  const { isLoading: detailIsLoading, data: movieDetail } =
    useQuery<IMovieDetail>({
      queryKey: ["getMovie", movieId],
      queryFn: () => getMovie(movieId + ""),
      enabled: movieId !== UNSELECTED_STATE,
    });

  const closeModal = () => setMovieId(UNSELECTED_STATE);

  return (
    <>
      <Overlay
        onClick={closeModal}
        variants={overlayVariants}
        animate="normal"
        exit="exit"
      />
      <DetailModal layoutId={`movie-detail-${movieId}`}>
        {detailIsLoading ? (
          <Loader />
        ) : (
          movieDetail && (
            <>
              <BgCover $imgPath={makeBgPath(movieDetail.backdrop_path)} />
              <Svg
                onClick={closeModal}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                />
              </Svg>
              <DetailInfoWrapper>
                <DetailTitle>{movieDetail?.title}</DetailTitle>
                <DetailOverview>{movieDetail?.overview}</DetailOverview>
                <DetailInfoItem>
                  Budget: {`$${movieDetail?.budget}`}
                </DetailInfoItem>
                <DetailInfoItem>
                  Revenue: {`$${movieDetail?.revenue}`}
                </DetailInfoItem>
                <DetailInfoItem>
                  Runtime: {`${movieDetail?.runtime} minutes`}
                </DetailInfoItem>
                <DetailInfoItem>
                  Rating: {movieDetail?.vote_average.toFixed(1)}
                </DetailInfoItem>
                <DetailInfoItem>
                  Homepage:{" "}
                  {movieDetail.homepage && (
                    <a href={movieDetail?.homepage} target="_blank">
                      official website
                    </a>
                  )}
                </DetailInfoItem>
              </DetailInfoWrapper>
            </>
          )
        )}
      </DetailModal>
    </>
  );
}

export default Detail;
