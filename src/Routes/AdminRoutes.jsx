import React from "react";
import UserList from "../Pages/DefaultLayout/userList";
import SubUsers from "../Pages/DefaultLayout/subUsers";
import DashBoard from "../Pages/DefaultLayout/dashBoard";

const adminRoutes = [
    {
        path:"devShip",
        name:"dashBoard",
        element:<DashBoard/>
    },
    {
        path:"userList",
        name:"userList",
        element:<UserList/>
    },
    {
        path:"subUser",
        name:"SubUser",
        element:<SubUsers/>
    },
]

export default adminRoutes;