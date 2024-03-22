import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchEngine from "./SearchEngine";
import Forecast from "./Forecast";
import Sidebar from "./Sidebar";
import "../styles.css";
import Location from "./Location";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Weather from './Weather';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coordinate from "./Coordinate";


function App() {
    const [query, setQuery] = useState();


    const [weather, setWeather] = useState({
        loading: true,
        data: {},
        error: false
    });

    const toDate = () => {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "Nocvember",
            "December"
        ];
        const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];

        const currentDate = new Date();
        const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]
            }`;
        return date;
    };

    const search = async (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            setQuery("");
            setWeather({ ...weather, loading: true });
            const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
            const url = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}`;
            await axios
                .get(url)
                .then((res) => {
                    console.log("res", res);
                    setWeather({ data: res.data, loading: false, error: false });
                })
                .catch((error) => {
                    setWeather({ ...weather, data: {}, error: true });
                    setQuery("");
                    console.log("error", error);
                });

        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
            const url = `https://api.shecodes.io/weather/v1/current?query=Rabat&key=${apiKey}`;
            try {
                const response = await axios.get(url);

                setWeather({ data: response.data, loading: false, error: false });
            } catch (error) {
                setWeather({ data: {}, loading: false, error: true });
                console.log("error", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>

            <SearchEngine query={query} setQuery={setQuery} search={search} />

            <div className="App">
                <BrowserRouter>

                    <Sidebar />
                    <Routes>
                        <Route index element={<Forecast weather={weather} setWeather={setWeather} toDate={toDate} />} />

                        {/* <Route path="/" element={<Weather weather={weather} toDate={toDate}/>}/> */}
                        <Route path="/weather" element={<Weather weather={weather} toDate={toDate} />} />
                        <Route path="/coordinate" element={<Coordinate />} />

                        {/* 
                <Route path="/hello" element={<><h1>sdhshhs</h1></>}></Route>
                <Route path="/bye" element={<><h1>dsd</h1></>}></Route>
                */}
                    </Routes>

                </BrowserRouter>

                <Location />

            </div>
        </>
    );
}

export default App;