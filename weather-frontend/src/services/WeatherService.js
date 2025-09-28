import axios from "axios";

export const fetchWeather = async () => {
  try {
    const res = await axios.get("http://localhost:8081/weather");
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};