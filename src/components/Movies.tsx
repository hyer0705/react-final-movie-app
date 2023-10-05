import { motion } from "framer-motion";
import styled from "styled-components";
import { IAPIResponse, makeImagePath } from "../api";

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

interface IMovies {
  movieData: IAPIResponse;
}

function Movies({ movieData }: IMovies) {
  return (
    <MovieWrapper variants={moviesVariants} initial="hidden" animate="visible">
      {movieData?.results.map((movie) => (
        <Movie key={movie.id} variants={movieItemVariants}>
          <Img
            src={makeImagePath(movie.poster_path)}
            variants={posterVariants}
            whileHover="hover"
          />
          <Title>{movie.title}</Title>
        </Movie>
      ))}
    </MovieWrapper>
  );
}

export default Movies;
