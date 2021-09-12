import axios from "axios";

// base url to make requests to RAWG database
const instance = axios.create({
  baseURL: "https://api.igdb.com/v4/",
});

export default instance;
