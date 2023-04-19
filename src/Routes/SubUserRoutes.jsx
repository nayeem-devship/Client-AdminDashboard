import React from "react";
import SubUsers from "../Pages/UserPages/subUsers";
import DashBoard from "../Pages/DefaultLayout/dashBoard";
import Teams from "../Pages/UserPages/teams";

const subUserRoutes = [
    {
        path:"devShip",
        name:"dashBoard",
        element:<DashBoard/>
    },
    {
        role:["subUser","user"],
        path:"subUser",
        name:"SubUser",
        element:<SubUsers/>
    },
    {
        role:["subUser","user"],
        path:"teams",
        name:"teams",
        element:<Teams/>
    },
]

export default subUserRoutes;