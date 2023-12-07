import UserService from "@/api/user";
import AreaInfoService from "@/api/area";
import FileService from "@/api/file";
import Dicts from "@/api/dict";

const API = {
  user: new UserService(),
  area: new AreaInfoService(),
  file: new FileService(),
  dict: new Dicts(),
};

export default API;
