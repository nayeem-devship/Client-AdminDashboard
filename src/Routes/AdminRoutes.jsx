import React from "react";
import UserList from "../Pages/DefaultLayout/userList";
import SubUsers from "../Pages/DefaultLayout/subUsers";

const adminRoutes = [
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