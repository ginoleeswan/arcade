import axios from "axios";

// base url to make requests to RAWG database
const instance = axios.create({
  baseURL: "https://rawg.io/api/",
});

export default instance;
