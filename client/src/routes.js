import Home from "./components/Home";
import PetCard from "./components/PetCard";


const routes = [
    {
      path: "/",
      element: <Home />
    },
    {
        path:"/pet/:id",
        element:<PetCard />
    }
]
export default routes;