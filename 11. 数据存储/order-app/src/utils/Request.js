import axios from "axios";

export default function Request(url, parameters) {
  return axios({
    baseURL: "https://wd9115106472borwhf.wilddogio.com/",
    url: url,
    method: "get",
    ...parameters
  });
}
