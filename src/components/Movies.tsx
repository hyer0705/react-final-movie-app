import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { IAPIResponse, makeImagePath } from "../api";
import { useState } from "react";

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
  background-color: rgba(255, 255, 255, 0.5);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
`;

const DetailModal = styled(motion.div)`
  width: 60vw;
  height: 80vh;
  position: fixed;
  top: 15vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  background-color: aqua;
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

interface IMovies {
  movieData: IAPIResponse;
}

// 추후에 Enum 혹은 상수에 빼놓기
const UNSELECTED_STATE = -1;

function Movies({ movieData }: IMovies) {
  const [movieId, setMovieId] = useState(UNSELECTED_STATE);

  const onMovieClick = (movieId: number) => setMovieId(movieId);
  const onOverlayClick = () => setMovieId(UNSELECTED_STATE);

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
              onClick={onOverlayClick}
              variants={overlayVariants}
              animate="normal"
              exit="exit"
            />
            <DetailModal layoutId={`movie-detail-${movieId}`} />
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Movies;
