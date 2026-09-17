import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import NotFound from "../components/common/NotFound";
import MovieCardDetails from "../components/movies/MovieCardDetails";


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'movies',
        element: <Movies />
      },
      {
        path: '/movies/:movieId',
        element: <MovieCardDetails />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router;

