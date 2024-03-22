import React, { useState, useEffect } from "react";
import Search from "../assets/search.jpeg";
import clouds from "../assets/clouds.png";
import "./coordinate.css";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";


const Coordinate = () => {
    const [location, setLocation] = useState({ lat: null, lon: null });
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    useEffect(() => {



        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    });
                },
                (error) => {
                    setError(error.message);
                }
            );
        } else {
            setError("Geolocation is not supported by your browser");
        }
    }, []);


    useEffect(() => {
        const fetchWeather = async () => {
            try {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const latitude = position.coords.latitude;
                            const longitude = position.coords.longitude;
                            console.log("Latitude: " + latitude + ", Longitude: " + longitude);
                        },
                        (error) => {
                            console.error("Error getting location: " + error.message);
                        }
                    );
                } else {
                    console.error("Geolocation is not supported by your browser");
                }

                const apiKey = "954f941690feae1e69e906694b1fe31a";
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=metric`;
                console.log(location.lat, location.lon);
                const response = await axios.get(apiUrl);
                setWeather(response.data);
            } catch (error) {
                setError("Error fetching weather data");
            }
        };



        if (location.lat !== null && location.lon !== null) {
            fetchWeather();
        }
    }, [location]);

    const handleSearch = () => {
        console.log("Searching with Latitude:", latitude, "Longitude:", longitude);

        setLocation({
            lat: parseFloat(latitude),
            lon: parseFloat(longitude),
        });
    };

    return (
        <div>
            {error && <p>Error: {error}</p>}
            {weather && (
                <div>
                    <div className="container">
                        <div className="weather">
                            <div className="search">
                                <div className="row">
                                    <input
                                        type="text"
                                        placeholder="Enter Latitude"
                                        value={latitude}
                                        onChange={(e) => setLatitude(e.target.value)}
                                    />
                                </div>
                                <div id="demo">
                                    <input
                                        type="text"
                                        placeholder="Enter Longitude"
                                        value={longitude}
                                        onChange={(e) => setLongitude(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <button onClick={handleSearch}>
                                        <img src={Search} alt="" />
                                    </button>
                                </div>
                            </div>
                            <div className="details">
                                <div className="name">
                                    <h1>Weather in {weather.name}</h1>
                                </div>

                                <div className="temp">
                                    <p>Temperature: {weather.main.temp}°C</p>
                                </div>


                                <div className="des">
                                    <p>Decription: {weather.weather[0].description}</p>
                                </div>
                            </div>

                            <div className="weather-info">
                                <div className="col">
                                    <ReactAnimatedWeather icon="WIND" size="40" />
                                    <div>
                                        <p className="wind">{weather?.wind?.speed}m/s</p>
                                        <p>Wind speed</p>
                                    </div>
                                </div>
                                <div className="col">
                                    <ReactAnimatedWeather icon="RAIN" size="40" />
                                    <div>
                                        <p className="humidity">{weather?.main?.humidity}%</p>
                                        <p>Humidity</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Coordinate;
