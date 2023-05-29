import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import Books from "./pages/Book"
import Authors from "./pages/Authors";
import Cards from "./pages/Cards";
import { ADMIN_ROUTE, AUTH_ROUTE, MAIN_ROUTE, AUTHORS_ROUTE, CARDS_ROUTE } from "./store/consts"

export const authRoutes = [
  {
    path: MAIN_ROUTE,
    Component: Books
  },
  {
    path: ADMIN_ROUTE,
    Component: Admin
  },
  {
    path: AUTHORS_ROUTE,
    Component: Authors
  },
  {
    path: CARDS_ROUTE,
    Component: Cards
  }
]

export const publicRoutes = [
  {
    path: AUTH_ROUTE,
    Component: Auth
  },
]