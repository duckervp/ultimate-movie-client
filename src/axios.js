import axios from "axios";
import { BASE_URL } from "./constants"

const Dxios = axios.create({
  baseURL: BASE_URL
});

export default Dxios;