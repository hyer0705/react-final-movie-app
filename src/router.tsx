import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import NowPlaying from "./routes/NowPlaying";
import ComingSoon from "./routes/ComingSoon";
import NotFound from "./components/NotFound";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "coming-soon",
          element: <ComingSoon />,
        },
        {
          path: "now-playing",
          element: <NowPlaying />,
        },
      ],
      errorElement: <NotFound />,
    },
  ],
  { basename: "/react-final-movie-app" }
);
