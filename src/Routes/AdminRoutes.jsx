import React from "react";
import UserList from "../Pages/DefaultLayout/userList";
import SubUsers from "../Pages/DefaultLayout/subUsers";

const adminRoutes = [
    {
        path:"/admin",
        name:"admin",
        element:<UserList/>
    },
    {
        path:"SubUser",
        name:"SubUser",
        element:<SubUsers/>
    }
]

export default adminRoutes;