import React from "react";
import SubUsers from "../Pages/DefaultLayout/subUsers";
import DashBoard from "../Pages/DefaultLayout/dashBoard";
import Teams from "../Pages/DefaultLayout/teams";

const subUserRoutes = [
    {
        path:"devShip",
        name:"dashBoard",
        element:<DashBoard/>
    },
    {
        path:"subUser",
        name:"SubUser",
        element:<SubUsers/>
    },
    {
        path:"teams",
        name:"teams",
        element:<Teams/>
    },
]

export default subUserRoutes;