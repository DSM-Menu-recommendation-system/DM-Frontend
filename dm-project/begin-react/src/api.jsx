import axios from "axios";
const baseUrl = "http://15.165.24.248:8080/menus";

export async function weatherGet(weatherParams) {
  const weatherres = await axios({
    method: "get",
    url: baseUrl + "/weather",
    params: {
      weather_type: weatherParams,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return weatherres.data;
}

export async function moodGet(moodParams) {
  const moodres = await axios({
    method: "get",
    url: baseUrl + "/mood",
    params: {
      mood_type: moodParams,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return moodres.data;
}
