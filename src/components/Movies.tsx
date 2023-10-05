import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import {
  IAPIResponse,
  IMovieDetail,
  getMovie,
  makeBgPath,
  makeImagePath,
} from "../api";
import { useState } from "react";
import { Loader } from "./common-components";

// styled components
const MovieWrapper = styled(motion.ul)`
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

const Movie = styled(motion.li)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;
  cursor: pointer;
`;

const Img = styled(motion.img)`
  width: 200px;
  height: 300px;
  border-radius: 15px;
  margin-bottom: 20px;
  transform-origin: center bottom;
`;

const Title = styled.h3`
  width: 200px; // 추후에 삭제
  font-size: 20px;
  font-weight: 700;
  text-align: center;
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

// variants
const moviesVariants = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const movieItemVariants = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
  },
};

const posterVariants = {
  hover: {
    scale: 1.1,
    transition: { duration: 0.3, type: "spring", bounce: 0.3 },
  },
};

const overlayVariants = {
  exit: {
    opacity: 0,
  },
  normal: {
    opacity: 1,
  },
};

interface IMoviesProps {
  movieData: IAPIResponse;
}

// 추후에 Enum 혹은 상수에 빼놓기
const UNSELECTED_STATE = -1;

function Movies({ movieData }: IMoviesProps) {
  const [movieId, setMovieId] = useState(UNSELECTED_STATE);
  const { isLoading: detailIsLoading, data: movieDetail } =
    useQuery<IMovieDetail>({
      queryKey: ["getMovie", movieId],
      queryFn: () => getMovie(movieId + ""),
      enabled: movieId !== UNSELECTED_STATE,
    });

  const onMovieClick = (movieId: number) => setMovieId(movieId);
  const closeModal = () => setMovieId(UNSELECTED_STATE);

  return (
    <>
      <MovieWrapper
        variants={moviesVariants}
        initial="hidden"
        animate="visible"
      >
        {movieData?.results.map((movie) => (
          <Movie
            onClick={() => onMovieClick(movie.id)}
            key={movie.id}
            variants={movieItemVariants}
            layoutId={`movie-detail-${movie.id}`}
          >
            <Img
              src={makeImagePath(movie.poster_path)}
              variants={posterVariants}
              whileHover="hover"
            />
            <Title>{movie.title}</Title>
          </Movie>
        ))}
      </MovieWrapper>
      <AnimatePresence>
        {movieId !== UNSELECTED_STATE && (
          <>
            <Overlay
              onClick={closeModal}
              variants={overlayVariants}
              animate="normal"
              exit="exit"
            />
            <DetailModal layoutId={`movie-detail-${movieId}`}>
              {detailIsLoading ? (
                <Loader>Loading...</Loader>
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
        )}
      </AnimatePresence>
    </>
  );
}

export default Movies;
