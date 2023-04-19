import React from "react";
import UserList from "../Pages/UserPages/userList";
import SubUsers from "../Pages/UserPages/subUsers";
import DashBoard from "../Pages/DefaultLayout/dashBoard";

const adminRoutes = [
    {
        path:"devShip",
        name:"dashBoard",
        element:<DashBoard/>
    },
    {
        role:"user",
        path:"userList",
        name:"userList",
        element:<UserList/>
    },
    {
        role:"user",
        path:"subUser",
        name:"SubUser",
        element:<SubUsers/>
    },
]

export default adminRoutes;