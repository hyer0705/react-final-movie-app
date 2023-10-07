import styled from "styled-components";
import { Link, useMatch } from "react-router-dom";
import { motion, useScroll, useAnimation } from "framer-motion";
import { useContext, useEffect } from "react";
import { IsDarkThemeContext } from "../context";

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

const ThemeBtnWrapper = styled(motion.div)`
  width: 70px;
  height: 35px;
  padding: 5px;
  background-color: ${(props) => props.theme.bgColor.modal};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const ThemeBtn = styled(motion.div)<{ $isDark: boolean }>`
  background-color: ${(props) => props.theme.bgColor.button};
  border-radius: 50%;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$isDark ? "end" : "start")};
  padding: 5px;
`;

const IconSvg = styled(motion.svg)`
  width: 18px;
  height: 18px;
`;

const navVariants = {
  top: {
    backgroundColor: "rgba(13, 11, 13, 0)",
  },
  scroll: {
    backgroundColor: "rgba(13, 11, 13, 1)",
  },
};

interface IHeaderProps {
  setIsDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({ setIsDarkTheme }: IHeaderProps) {
  const homeMatch = useMatch("/");
  const comingSoonMatch = useMatch("/coming-soon");
  const nowPlayingMatch = useMatch("/now-playing");

  const { scrollY } = useScroll();
  const navAnimation = useAnimation();

  const isDark = useContext(IsDarkThemeContext);
  const onThemeBtn = () => setIsDarkTheme((prev) => !prev);

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
      <ThemeBtnWrapper onClick={onThemeBtn}>
        <ThemeBtn $isDark={isDark}>
          {!isDark && (
            <IconSvg
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z" />
            </IconSvg>
          )}
          {isDark && (
            <IconSvg
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z"
              />
            </IconSvg>
          )}
        </ThemeBtn>
      </ThemeBtnWrapper>
    </Nav>
  );
}

export default Header;
