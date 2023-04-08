import React from "react";
import DefaultLayout from "../Pages/DefaultLayout";
import UserList from "../Pages/DefaultLayout/userList";
import SubUsers from "../Pages/DefaultLayout/subUsers";

const adminRoutes = [
    {
        path:"/admin",
        name:"admin",
        element:<DefaultLayout/>
    },
    {
        path:"UserList",
        name:"UserList",
        element:<UserList/>
    },
    {
        path:"SubUser",
        name:"SubUser",
        element:<SubUsers/>
    }
]

export default adminRoutes;