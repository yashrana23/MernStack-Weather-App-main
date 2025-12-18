import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "reactstrap";
import "./weather.css";
import { formatTime, formatDate, formatDay } from "../../utils/format-datetime";
import useFetch from "../../hooks/useFetch";
import useDebounce from "../../hooks/useDebounce";
import { BASE_URL } from "../../utils/config";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";

const Weather = ({ location, error, loading }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 600);
  const [cityOptions, setCityOptions] = useState([]);
  const [searchWeather, setSearchWeather] = useState(null);
  const [weather, setWeather] = useState(null);
  const [defaultWeatherLoading, setDefaultWeatherLoading] = useState(false);
  const [defaultWeatherError, setDefaultWeatherError] = useState(null);

  // ################################ Date and time timer #################################
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  // ################################ Date and time timer end #################################

  // ################################ city suggestion #################################
  const { data: cities } = useFetch(`${BASE_URL}/cities?q=${debouncedQuery}`);

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setCityOptions([]);
      return;
    }

    setCityOptions(cities);
  }, [debouncedQuery, cities]);

  // ################################## city suggestion end ###############################

  // ############################# fetch weather data by searchbar #########################
  const [city, setCity] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/weather/bySearch?city=${city}`);
      if (!res.ok) {
        throw new Error("Failed to fetch weather");
      }

      const result = await res.json();

      if (
        !result.data ||
        !result.data.weather ||
        result.data.weather.length === 0
      ) {
        setSearchWeather(null);
        alert("City not found or invalid input.");
        return;
      }

      setSearchWeather(result.data);
      // setCity('');
      setQuery("");
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };
  // ############################### fetch weather data by searchbar end #######################

  // ############################### fetch weather data by default #############################
  useEffect(() => {
    setDefaultWeatherLoading(true);
    const fetchDefaultWeather = async () => {
      try {
        if (!location) {
          return;
        }

        const { latitude, longitude } = location;
        const res = await fetch(
          `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch default weather");
        }

        const result = await res.json();
        setWeather(result.data);
        setDefaultWeatherLoading(false);
      } catch (error) {
        // console.error(error.message);
        // alert(error.message);
        setDefaultWeatherError(error.message);
        setDefaultWeatherLoading(false);
      }
    };

    fetchDefaultWeather();
  }, [location]);
  // ################################ fetch weather data by default end ###########################

  const isSearchDataValid =
    searchWeather && searchWeather.weather && searchWeather.weather.length > 0;

  const main = isSearchDataValid
    ? searchWeather.weather[0].main
    : weather?.weather?.[0]?.main;
  const name = isSearchDataValid ? searchWeather.name : weather?.name;
  const country = isSearchDataValid
    ? searchWeather.sys?.country
    : weather?.sys?.country;
  const temp = isSearchDataValid
    ? Math.round(searchWeather.main?.temp)
    : Math.round(weather?.main?.temp);
  const humidity = isSearchDataValid
    ? searchWeather.main?.humidity
    : weather?.main?.humidity;
  const visibility = isSearchDataValid
    ? searchWeather.visibility
    : weather?.visibility;
  const speed = isSearchDataValid
    ? searchWeather.wind?.speed
    : weather?.wind?.speed;

  let icon;
  let sub_icon;
  switch (main || "") {
    case "Thunderstorm":
      icon = "ri-thunderstorms-line";
      sub_icon = "ri-thunderstorms-fill";
      break;
    case "Drizzle":
      icon = "ri-drizzle-line";
      sub_icon = "ri-drizzle-fill";
      break;
    case "Rain":
      icon = "ri-rainy-line";
      sub_icon = "ri-rainy-fill";
      break;
    case "Snow":
      // icon = 'ri-snowy-line';
      // sub_icon = 'ri-snowy-fill';
      icon = "ri-snowflake-line";
      sub_icon = "ri-snowflake-fill";
      break;

    case "Clear":
      icon = "ri-sun-line";
      sub_icon = "ri-sun-fill";
      break;
    case "Clouds":
      icon = "ri-sun-cloudy-line";
      sub_icon = "ri-sun-cloudy-fill";
      break;
    case "Fog":
    case "Smoke":
      icon = "ri-foggy-line";
      sub_icon = "ri-foggy-fill";
      break;
    case "Haze":
      icon = "ri-haze-line";
      sub_icon = "ri-haze-fill";
      break;
    case "Mist":
      icon = "ri-mist-line";
      sub_icon = "ri-mist-fill";
      break;
    case "Tornado":
      icon = "ri-tornado-line";
      sub_icon = "ri-tornado-fill";
      break;
    case "Dust" || "Sand":
      icon = "ri-windy-line";
      sub_icon = "ri-windy-fill";
      break;
    default:
      icon = "ri-error-warning-line";
      break;
  }

  return (
    <section>
      <Container fluid>
        <Row>
          <Col className="d-flex align-items-center justify-content-center">
            {/* ############################# Default weather #########################*/}
            {(loading || defaultWeatherLoading) && (
              <div className="weather__layout-container loading__layout-container">
                <Loading />
              </div>
            )}
            {(error || defaultWeatherError) && (
              <div className="weather__layout-container error__layout-container">
                <Error errors={error || defaultWeatherError} />
              </div>
            )}
            {!loading &&
              !defaultWeatherLoading &&
              !error &&
              !defaultWeatherError && (
                <div className="weather__layout-container">
                  <div className="weather__climant">
                    <div className="location__info">
                      <h4>{weather?.name}</h4>
                      <h5 className="float-end">{weather?.sys?.country}</h5>
                    </div>
                    <div className="current__date-time-info">
                      <div className="current__date-time">
                        <span>{formatTime(currentTime)}</span>
                        <p>
                          {formatDay(currentTime)}, {formatDate(currentTime)}
                        </p>
                      </div>
                      <div className="temp__celsius">
                        <span>{Math.round(weather?.main?.temp || 0)}</span>
                        <i className="ri-celsius-line"></i>
                      </div>
                    </div>
                  </div>

                  {/* ############################# Search weather #########################*/}
                  <div className="weather__climant-searchbox">
                    <div className="weather__type">
                      <i className={`${icon} weather__type-icon`}></i>
                      <p>{main}</p>
                      <hr />
                    </div>
                    <div className="search__weather-by-city">
                      <Form onSubmit={handleSubmit}>
                        <input
                          type="text"
                          placeholder="Search any city"
                          value={query}
                          list="cities"
                          onChange={(e) => {
                            setQuery(e.target.value);
                            setCity(e.target.value);
                          }}
                          required
                        />
                        <datalist id="cities">
                          {cityOptions?.map((city, index) => {
                            return <option key={index} value={city}></option>;
                          })}
                        </datalist>
                        <button type="submit">
                          <i className="ri-search-line"></i>
                        </button>
                      </Form>
                      {/* {debouncedQuery.length >= 2 && cityOptions?.length === 0 && (
                        <small>No matching cities found</small>
                      )} */}
                    </div>
                    <div className="search__location">
                      <p>
                        {name && country && `${name}, ${country}`}{" "}
                        <i className={`${sub_icon}`}></i>
                      </p>
                    </div>
                    <div className="search__weather-info">
                      <ul>
                        <li>
                          <span>Temperature</span>
                          <span>
                            {temp}
                            <i className="ri-celsius-line"></i> ({main})
                          </span>
                        </li>
                        <li>
                          <span>Humidity</span>
                          <span>{humidity}%</span>
                        </li>
                        <li>
                          <span>Visibility</span>
                          <span>{visibility} mi</span>
                        </li>
                        <li>
                          <span>Wind Speed</span>
                          <span>{speed} Km/h</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="weather__app-footer">
              <p>
                <span>Developed by </span>Yash Rana | <span>Powered by </span>
                REACT, NODE <span> and </span>EXPRESS
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Weather;
