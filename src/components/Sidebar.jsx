import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";


export default function Sidebar() {
    return (
        <>
            <div className="sidebar">
                <div className="logo-parent">
                    <div className="logo">
                        <b className="q" ><NavLink to=''><i class="fa-solid fa-house"></i></NavLink></b>
                    </div>
                    <div className="home-parent">

                        <div className="file-pdf"><NavLink to='/Location'><i class="fa-solid fa-location-crosshairs"></i></NavLink></div> 



                        <div className="messages1"><NavLink to="/weather"><i class="fa-solid fa-cloud"></i></NavLink></div>


                        <div className="file-pdf"><NavLink to="/coordinate"><i class="fa-solid fa-cloud-bolt"></i></NavLink></div>

                {/* <div className="gear"><i class="fa-solid fa-gear"></i></div> */}
                    </div>
                </div>

                <div className="gear"><NavLink to=''><i class="fa-solid fa-right-from-bracket"></i></NavLink></div>
            </div>

        </>
    )

}