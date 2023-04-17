import { useState, useEffect } from "react";
import { weatherFetch } from "../api/weather";
import { CurrentWeatherDataResponse } from "../models/CurrentWeatherDataResponse";
import { BsSearch } from "react-icons/bs";
import { BsFillMoonFill } from "react-icons/bs";
import { BsFillSunFill } from "react-icons/bs";
import { motion } from "framer-motion";

const firstLetterToUpperCase = (text: string): string => {
  var arr: string[] = text.split(" ");
  var newArr: string[] = [];
  arr.map((word: string) => {
    newArr.push(word.replace(word[0], word[0].toUpperCase()));
  });
  return newArr.join(" ");
};

console.log(firstLetterToUpperCase("abc def"));

function App() {
  const [weatherData, setWeatherData] = useState<
    CurrentWeatherDataResponse | undefined
  >();
  const [cityName, setCityName] = useState<string | undefined>();
  const [searching, setSearching] = useState<boolean>(false);
  const [cityError, setCityError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [theme, setTheme] = useState<string | null>(
    localStorage.getItem("theme")
  );

  async function setData(city: string | undefined) {
    try {
      setLoading(true);
      const data = await weatherFetch(city);
      setWeatherData(data);
      setLoading(false);
    } catch {
      setSearching(false);
      setCityError(true);
      setWeatherData(undefined);
      setLoading(false);
      setTimeout(() => {
        setCityError(false);
      }, 4000);
    }
  }

  const imgs: number[] = [];

  for (let i = 0; i < 700; i++) {
    imgs.push(1);
  }

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="App lg:flex lg:flex-row flex flex-col-reverse items-center w-screen h-full">
      <div className="greetings lg:block flex flex-col justify-center items-center lg:w-1/4 w-screen lg:h-screen h-32 lg:dark:from-slate-900 lg:dark:to-slate-900 lg:from-slate-400 lg:to-slate-400 bg-gradient-to-r dark:from-slate-900 from-slate-400 to-slate-700 dark:to-black">
        <h1 className="dark:opacity-70 opacity-90 font-bold  lg:text-8xl text-4xl lg:absolute lg:left-36 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:-rotate-90">
          Weather app
        </h1>
        <p className=" dark:opacity-50 opacity-90 lg:absolute lg:w-fit w-52 lg:left-60 lg:top-40 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:-rotate-90">
          by{" "}
          <a
            href="https://caiogeraldo.vercel.app"
            className="underline underline-offset-4 hover:opacity-70"
          >
            Caio Geraldo
          </a>
        </p>
      </div>

      {cityError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`city-not-found-component absolute left-1/2 top-5 z-10 dark:bg-zinc-600 dark:bg-opacity-30 bg-zinc-900 bg-opacity-10 rounded pt-3`}
        >
          <p className=" opacity-80 mx-5 mb-3">Cidade não encontrada.</p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 3.5,
            }}
            className="bg-red-400 h-1"
          ></motion.div>
        </motion.div>
      )}

      <main className=" lg:pt-0 pt-20 relative overflow-hidden w-full lg:h-screen h-full flex justify-center items-center  bg-gradient-to-r dark:from-slate-900 from-slate-400 to-slate-700 dark:to-black">
        <div className="background absolute flex flex-wrap h-screen animate-slide">
          {imgs.map(() => {
            return (
              <>
                <img
                  src="media/icons/cloudy-day.png"
                  className="w-12 h-12 m-20 opacity-10"
                />
                <img
                  src="media/icons/cloudy-day.png"
                  className="w-12 h-12 opacity-10"
                />
              </>
            );
          })}
        </div>
        <div className="lg:w-3/4 lg:mx-0 w-full mx-5 text-center z-10">
          <div className="menu flex">
            <div className="search-container w-full text-left flex items-center lg:mb-8">
              <form
              className="w-full text-left flex items-center mb-8"
                action="#"
                onSubmit={() => {
                  setSearching(true);
                  setData(cityName);
                }}
              >
                <input
                  onChange={(e) => {
                    setCityName(e.target.value);
                  }}
                  type="text"
                  className="lg:w-1/2 w-3/4 h-12 mr-4 rounded dark:bg-zinc-600 dark:bg-opacity-10 bg-zinc-900 bg-opacity-10   focus:outline-none backdrop-blur-lg px-5"
                  placeholder="Encontre sua cidade"
                />
                <button
                  type="submit"
                  onClick={() => {
                    setSearching(true);
                    setData(cityName);
                  }}
                  className="dark:bg-zinc-600 dark:bg-opacity-10 bg-zinc-900 bg-opacity-10 backdrop-blur-lg dark:hover:bg-zinc-400 hover:bg-zinc-800 hover:bg-opacity-30 w-12 rounded flex justify-center items-center h-12"
                >
                  <BsSearch className="w-5 h-5" />
                </button>
              </form>
            </div>
            <label className="switch lg:relative absolute top-5 right-5 inline-block w-16 h-7 rounded-full dark:bg-slate-400 dark:bg-opacity-10 bg-zinc-900 bg-opacity-10 backdrop-blur-lg">
              <input
                type="checkbox"
                className="opacity-0 w-0 h-0"
                onChange={handleThemeSwitch}
              />
              <span className="slider flex justify-center items-center transition-all absolute cursor-pointer top-1 dark:left-9 left-1 dark:right-5 bottom-0 w-5 h-5 rounded-full dark:bg-slate-600 bg-zinc-400">
                {theme === "dark" ? (
                  <BsFillMoonFill className="w-3 h-3" />
                ) : (
                  <BsFillSunFill className="w-3 h-3" />
                )}
              </span>
            </label>
          </div>
          {
            <div className="result-container">
              {searching ? (
                loading ? (
                  <div className="home animate-pulse w-full flex flex-col items-center backdrop-blur-lg rounded dark:bg-zinc-600 bg-zinc-900 dark:bg-opacity-10 bg-opacity-10 lg:py-24 py-44 px-16">
                    <img
                      className="w-1/3 opacity-50 animate-pulse"
                      src="media/icons/cloudy-day.png"
                    />
                  </div>
                ) : weatherData ? (
                  <div className="weather-container h-fit md:block flex flex-col justify-center items-center backdrop-blur-lg w-full lg:mx-0  text-center rounded dark:bg-slate-600 dark:bg-opacity-10 bg-zinc-900 bg-opacity-10 lg:p-10 p-5 lg:px-16">
                    <h1 className="font-normal hover:underline underline-offset-4 lg:text-xl text-sm lg:mb-5 w-full text-left">
                      Relatório de hoje - {weatherData.name},{" "}
                      {weatherData.sys.country}
                    </h1>
                    <div className="flex lg:flex-row flex-col justify-center items-center w-full lg:justify-between mb-5">
                      <div className="flex lg:flex-row flex-col justify-center items-center  w-full mr-3 lg:py-5 justify-left bg-opacity-50 rounded">
                        <img
                          className="lg:w-32 w-40 lg:mr-10"
                          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        />
                        <h2 className="desc font-bold lg:text-6xl tracking-wide ">
                          {firstLetterToUpperCase(
                            weatherData.weather[0].description
                          )}
                        </h2>
                      </div>
                      <div className="temp flex flex-col justify-center items-center lg:mt-0 lg:mb-0 mb-5 mt-3 lg:py-10 px-10 bg-opacity-5 lg:dark:bg-slate-400 lg:dark:bg-opacity-5 lg:bg-zinc-900 lg:bg-opacity-5">
                        <h1 className=" text-6xl">
                          {Math.floor(weatherData.main.temp - 273.15)}C°
                        </h1>
                      </div>
                    </div>
                    <div className="lg:flex flex flex-wrap lg:justify-between gap-3 justify-center items-center w-full">
                      <div className="flex flex-col justify-center items-center bg-opacity-5 rounded dark:bg-slate-400 dark:bg-opacity-5 bg-zinc-900 lg:w-36 w-28 py-5">
                        <img
                          src="media/icons/cold.png"
                          className="lg:w-10 w-6 opacity-70"
                        />
                        <p className="opacity-70 py-2 font-semibold">
                          Temp Min.
                        </p>
                        <h2 className="opacity-70 flex items-center">
                          {Math.floor(weatherData.main.temp_min - 273.15)}°
                        </h2>
                      </div>
                      <div className="flex flex-col justify-center items-center bg-opacity-5 rounded dark:bg-slate-400 dark:bg-opacity-5 bg-zinc-900  lg:w-36 w-28 py-5">
                        <img
                          src="media/icons/hot.png"
                          className="lg:w-10 w-6 opacity-70"
                        />
                        <p className="opacity-70 py-2 font-semibold">
                          Temp Max.
                        </p>
                        <h2 className="opacity-70 flex items-center">
                          {Math.floor(weatherData.main.temp_max - 273.15)}°
                        </h2>
                      </div>
                      <div className="flex flex-col justify-center items-center bg-opacity-5 rounded dark:bg-slate-400 dark:bg-opacity-5 bg-zinc-900  lg:w-36 w-28 py-5">
                        <img
                          src="media/icons/temp.png"
                          className="lg:w-10 w-6 opacity-70"
                        />
                        <p className="opacity-70 py-2 font-semibold">
                          Sensação
                        </p>
                        <h2 className="opacity-70">
                          {Math.floor(weatherData.main.feels_like - 273.15)}C
                        </h2>
                      </div>
                      <div className="flex flex-col justify-center items-center bg-opacity-5 rounded dark:bg-slate-400 dark:bg-opacity-5 bg-zinc-900  lg:w-36 w-28 py-5">
                        <img
                          src="media/icons/humidity.png"
                          className="lg:w-10 w-6 opacity-70"
                        />
                        <p className="opacity-70 py-2 font-semibold">
                          Humidade
                        </p>
                        <h2 className="opacity-70">
                          {Math.floor(weatherData.main.humidity)}%
                        </h2>
                      </div>
                      <div className="flex flex-col justify-center items-center bg-opacity-5 rounded dark:bg-slate-400 dark:bg-opacity-5 bg-zinc-900 lg:w-36 w-28 py-5">
                        <img
                          src="media/icons/wind.png"
                          className="lg:w-10 w-6 opacity-70"
                        />
                        <p className="opacity-70 py-2 font-semibold">
                          Vel. ventos
                        </p>
                        <h2 className="opacity-70">
                          {Math.floor(weatherData.wind.speed)}m/s
                        </h2>
                      </div>
                    </div>
                  </div>
                ) : null
              ) : (
                <div className="home backdrop-blur-lg w-full flex flex-col items-center rounded dark:bg-zinc-600 dark:bg-opacity-10 bg-zinc-900 bg-opacity-10 lg:pt-24 lg:pb-16 pb-10 pt-6 px-5 lg:px-16">
                  <img
                    className="lg:w-1/3 w-48 opacity-90"
                    src="media/icons/weather.png"
                  />
                  <h1 className="lg:text-4xl text-2xl font-bold opacity-90">
                    Descubra o clima ao redor do mundo
                  </h1>
                  <p className="font-light opacity-80">
                    conheça os seus dados meteorológicos com simplicidade e
                    eficiência.
                  </p>
                </div>
              )}
            </div>
          }
        </div>
      </main>
    </div>
  );
}

export default App;
