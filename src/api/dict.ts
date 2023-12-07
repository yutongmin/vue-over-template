/*
 * @Author: wuyefan
 * @Date: 2023-07-12 17:14:41
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-08-30 09:08:10
 */
import { request } from "@/utils";
import { RspParams } from "@/types";

enum Url {
  DICT_URL = "/dicts/by_code",

  DICT_URL_LIST = "/dicts/children/{pcode}",

}

/**
 * 根据CODE获取字典信息
 */
export interface IDict {
  /* 根据父编码获取字典列表 */
  getDictList: (params: string) => Promise<[]>;
}

class Dicts implements IDict {
  
  /* 根据父编码获取字典列表 */
  async getDictList(params: string): Promise<any> {
    return request(Url.DICT_URL_LIST.replace("{pcode}", params), {
      method: "get",
      // resultFormat: "$.data",
    });
  }
}

export default Dicts;
