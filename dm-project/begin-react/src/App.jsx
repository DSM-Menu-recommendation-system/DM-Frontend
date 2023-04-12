import "./style.css";
import logo from "./img/lofo.png";
import { useState } from "react";
import { useQuery } from "react-query";
import { weatherGet, moodGet } from "./api.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

export default function Test() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

function App() {
  const [weatherkind, setWeatherKind] = useState("none");
  const [moodKind, setMoodKind] = useState("none");
  const [mood, setMood] = useState("");
  const [weather, setWeather] = useState("");
  const [weatherParams, setWeatherParams] = useState("SUNNY");
  const [moodParams, setMoodParams] = useState("HAPPY");
  const [click, setClick] = useState("unclick");
  const [test, setTest] = useState([false, false]);

  const {
    data: weatherData,
    isLoading: weatherLoading,
    refetch: reWeather,
  } = useQuery(["weather"], () => weatherGet(weatherParams), {
    refetchOnWindowFocus: false,
  });
  const {
    data: moodData,
    isLoading: moodLoading,
    refetch: reMood,
  } = useQuery(["mood"], () => moodGet(moodParams), {
    refetchOnWindowFocus: false,
  });
  if (weatherLoading || moodLoading) return <div>로딩 중</div>;

  const weatherGetFunc = (weather) => {
    setTest([true, test[1]]);
    setWeatherParams(weather);
    reWeather();
  };

  const moodGetFunc = (mood) => {
    setTest([test[0], true]);
    setMoodParams(mood);
    reMood();
  };

  const weatherChange = () => {
    setTest([false, false]);
    setWeather("weather");
    setMood("");
    setWeatherKind("weatherKind");
    setMoodKind("none");
  };
  const moodChange = () => {
    setTest([false, false]);
    setMood("mood");
    setWeather("");
    setMoodKind("moodKind");
    setWeatherKind("none");
  };

  return (
    <div className="flex">
      <div className="container">
        <div className="logo">
          <img src={logo} />
          <div className="menu">
            <p className="rmfTl">Dsm Menu</p>
            <p className="thanswk">recommendation system</p>
          </div>
        </div>
        <div className="recommend">
          <div className={weather} onClick={weatherChange}>
            날씨 추천
          </div>
          <div className={mood} onClick={moodChange}>
            기분 추천
          </div>
        </div>
        <div className={weatherkind}>
          <div onClick={() => weatherGetFunc("SUNNY")} className="text">
            🌞 sunny
          </div>
          <div onClick={() => weatherGetFunc("RAINING")} className="text">
            ☔ raining
          </div>
          <div onClick={() => weatherGetFunc("COLD")} className="text">
            🥶 cold
          </div>
          <div onClick={() => weatherGetFunc("HOT")} className="text">
            🔥 hot
          </div>
          <div onClick={() => weatherGetFunc("SNOW")} className="text">
            ☃️ snow
          </div>
        </div>

        <div className={moodKind}>
          <div onClick={() => moodGetFunc("HAPPY")} className="text">
            😊 happy
          </div>
          <div onClick={() => moodGetFunc("SAD")} className="text">
            😭 sad
          </div>
          <div onClick={() => moodGetFunc("ANGRY")} className="text">
            😡 angry
          </div>
          <div onClick={() => moodGetFunc("DEPRESSED")} className="text">
            😔 depressed
          </div>
          <div onClick={() => moodGetFunc("PAIN")} className="text">
            🤒 pain
          </div>
        </div>
      </div>
      {weatherData && test[0] ? (
        <div className="box">
          <p className="headText">{weatherData.menu}</p>
          <img src={weatherData.menu_image_url} className="image" />
          <a
            href={"https://map.naver.com/v5/search/" + weatherData.menu + '?c=14175778.6386493,4354312.6433730,15,0,0,0,dh'} 
            className="button"
          >
            주변음식점 보기
          </a>
        </div>
      ) : null}
      {moodData && test[1] ? (
        <div className="box">
          <p className="headText">{moodData.menu}</p>
          <img src={moodData.menu_image_url} className="image" />
          <a
            href={"https://map.naver.com/v5/search/" + moodData.menu + '?c=14175778.6386493,4354312.6433730,15,0,0,0,dh'}
            className="button"
          >
            주변음식점 보기
          </a>
        </div>
      ) : null}
      <ReactQueryDevtools initialIsOpen={true} />
    </div>
  );
}
