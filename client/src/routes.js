import Home from "./components/Home";
import PetCard from "./components/PetCard";
import Logged from "./components/Logged"
import MyPets from "./components/MyPets"
import CreatePet from "./CreatePet"
import Adoptions from "./components/Adoptions";
import ModifyPet from "./components/ModifyPet"
import CreateUser from "./components/CreateUser"


const routes = [
    {
      path: "/",
      element: <Home />
    },
    {
        path:"/pet/:id",
        element:<PetCard />
    },
    {
      path:"/logged",
      element:<Logged />
    },
    {
      path:"/MyPets",
      element:<MyPets />
    },
    {
      path:"/CreatePet",
      element:<CreatePet />
    },
    {
      path:"/user_adoptions",
      element:<Adoptions />
    },
    {
      path:"/modifypet/:id",
      element:<ModifyPet />
    },
    {
      path:"/signup",
      element:<CreateUser />
    }
]
export default routes;