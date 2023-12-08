/*
 * @Author: wuyefan
 * @Date: 2023-07-12 17:14:41
 * @Last Modified by: wuyefan
 * @Last Modified time: 2023-08-09 16:11:06
 */
import { request } from "@/utils";
import { RspParams } from "@/types";

enum Url {
  INIT_AREA_LIST_URL = "/areas/by_pid",
  INIT_AREA_URL = "/areas",
}

/**
 * 根据ID获取子集区划接口
 */
export interface IArea {
  getListById: (id: string, contain_self: boolean) => Promise<any>;
  getAreaById: (id: string, contain_self: boolean) => Promise<any>;
}

class Area implements IArea {
  /**
   * 根据Id获取下级区划
   * @param id 区划id
   * @param contain_self 是否包含自己
   */
  async getListById(id: string, contain_self = true) {
    const options = {
      method: "get",
      // params: {
      //   p_id: id,
      //   contain_self: true, //是否包含自己层级
      // },
    };
    return await request<RspParams>(
      `${Url.INIT_AREA_LIST_URL}/${id}`,
      options
    );
  }
  /**
   * 根据Id获取本级区划
   * @param id 区划id
   */
  async getAreaById(id: string) {
    const options = {
      method: "get",
    };
    return await request<RspParams>(`${Url.INIT_AREA_URL}/${id}`, options);
  }
}

export default Area;
