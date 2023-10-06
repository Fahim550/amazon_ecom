import AddProducts from "./AddProducts";
import Banner from "./Banner";
import Cart from "./Cart";
import Home from "./Home";
import Login from "./Login";
import PgFoF from "./PgFoF";
import AllProducts from "./Product-Components/AllProducts";
import Specificproductpage from "./Product-Components/Specificproductpage";
import Products from "./Products";
import SignIn from "./SignIn";
import UserProfile from "./UserProfile";


export const allRouters=[
    {
        path:"/",
        element:<Home/>
    },
    {
        path:"/home",
        element:<Home/>
    },
    {
        path:"/signin",
        element:<SignIn/>
    },{
        path:"/login",
        element:<Login/>
    },
    {
        path:"/profile",
        element:<UserProfile/>
    },
    {
        path:"/product",
        element:<Products/>
    },
    {
        path:"/sellproducts",
        element:<AddProducts/>
    },
    {
        path:"/banner",
        element:<Banner/>
    },
    // {
    //     path:"/product-type",
    //     element:<AllProducts type={'Mobile'}/>
    // },
    {
        path:"/product-type/mobiles",
        element:(<AllProducts type={'Mobile'}/>)
    },
    {
        path:"/product-type/laptops",
        element:(<AllProducts type={'Laptop'}/>)
    },
    {
        path:"/product-type/cameras",
        element:(<AllProducts type={'Camera'}/>)
    },
    {
        path:"/product-type/shoes",
        element:(<AllProducts type={'Shoes'}/>)
    },
    {
        path:"/product/:type/:id",
        element:<Specificproductpage/>
    },
    // {
    //     path:"/product-type/shoes",
    //     element:(<AllProducts type={'Shoes'}/>)
    // },
    {
        path:"*/",
        element:<PgFoF/>
    },
    {
        path:"/cart",
        element:<Cart/>
    },
]