import styled from "styled-components";
import { Link, useMatch } from "react-router-dom";
import { motion, useScroll, useAnimation } from "framer-motion";
import { useEffect } from "react";

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  height: 10vh;
`;

const Menus = styled.ul`
  width: 720px;
  display: flex;
  justify-content: space-around;
`;

const Menu = styled.li`
  font-weight: 700;
  font-size: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Circle = styled(motion.span)`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.bgColor.circle};
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: 10px;
`;

const navVariants = {
  top: {
    backgroundColor: "rgba(13, 11, 13, 0)",
  },
  scroll: {
    backgroundColor: "rgba(13, 11, 13, 1)",
  },
};

function Header() {
  const homeMatch = useMatch("/");
  const comingSoonMatch = useMatch("/coming-soon");
  const nowPlayingMatch = useMatch("/now-playing");

  const { scrollY } = useScroll();
  const navAnimation = useAnimation();

  useEffect(() => {
    scrollY.on("change", (latest) => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);

  return (
    <Nav variants={navVariants} animate={navAnimation} initial="top">
      <Menus>
        <Menu>
          <Link to="/">
            POPULAR{homeMatch && <Circle layoutId="menuFocus" />}
          </Link>
        </Menu>
        <Menu>
          <Link to="/coming-soon">
            COMING SOON {comingSoonMatch && <Circle layoutId="menuFocus" />}
          </Link>
        </Menu>
        <Menu>
          <Link to="/now-playing">
            NOW PLAYING {nowPlayingMatch && <Circle layoutId="menuFocus" />}
          </Link>
        </Menu>
      </Menus>
    </Nav>
  );
}

export default Header;
