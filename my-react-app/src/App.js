import React, { useState } from 'react';
import axios from 'axios';

function handleCityChange(e) {
    const selectedCity = e.target.value;
    setCity(selectedCity);
    if (selectedCity && !cities.includes(selectedCity)) {
        cities = [...cities, selectedCity];
    }
    getWeather(selectedCity);
}

function WeatherApp() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    // 都市リストを限定せず、プルダウンまたは直接入力から判断するように変更
    const cities = [];

    const getWeather = async (selectedCity) => {
    try {
        const response = await axios.get(`http://your-server.com/api/weather?city=${selectedCity}`);
        if (response.data && response.data.cod !== '404') {
            setWeather(response.data);
        } else {
            alert('指定された都市の情報が見つかりません。別の都市を選んでください。');
            setWeather(null);
        }
            setWeather(response.data);
        } catch (error) {
            console.error("Error fetching weather data", error);
        }
    };

    const handleCityChange = (e) => {
        const selectedCity = e.target.value;
        setCity(selectedCity);
        // ユーザーが入力した都市が任意の都市に一致するかに関わらず、APIから情報を取得する
        getWeather(selectedCity);
    };

    return (
        <div>
            <label htmlFor="city">Choose a city: </label>
            <select id="city" value={city} onChange={handleCityChange}>
                <option value="">--Select a city--</option>
                {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                ))}
            </select>
            {weather && (
                <div>
                    <h3>Weather Info for {city}:</h3>
                    <pre>{JSON.stringify(weather, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default WeatherApp;