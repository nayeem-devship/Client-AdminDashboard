import React from "react";
import SubUsers from "../Pages/DefaultLayout/subUsers";
import DashBoard from "../Pages/DefaultLayout/dashBoard";

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
]

export default subUserRoutes;