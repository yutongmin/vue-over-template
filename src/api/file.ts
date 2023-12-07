/*
 * @Author: wuyefan
 * @Date: 2023-08-09 16:02:45
 * @Last Modified by: wuyefan
 * @Last Modified time: 2023-08-09 16:11:50
 */
import { request } from "@/utils";
import { RspParams } from "@/types";

enum Url {
  DOWNLOAD_BASE64 = "/v1/download_base64",

  // 单个文件下载 Get  
  DOWNLOAD = '/v1/download/{id}',

  // 批量文件下载 Get   /v1/batch_download?ids={ids}&package_name={压缩文件名称}
  // 必填的参数：
  //  ids： 附加id逗号分隔列表，如：id1,id2,id3
  //  其他可选参数：
  //       package_name:  下载ZIP压缩包的名称，为空时使用随机字符
  DOWNLOAD_BATCH = '/v1/batch_download'
}

/**
 * 根据CODE获取字典信息
 */
export interface IFileInfo {
  getFileInfo: (id: string) => Promise<any>;

  // 单个文件下载 Get  
  getFileInfoById: (id: string) => Promise<any>;
  // 批量文件下载 Get
  getFileInfoByBatch: (params: any) => Promise<any>;
}

class File implements IFileInfo {
  async getFileInfo(id: string) {
    const options = {
      method: "get",
      micservice: "oss",
    };
    let res = await request<RspParams>(`${Url.DOWNLOAD_BASE64}/${id}`, options);
    let fileInfo;
    if (res.succeed) {
      fileInfo = res.data;
    }

    return fileInfo;
  }
  
  // 单个文件下载 Get  
  async getFileInfoById(id: string) {
    const options = {
      method: "get",
      micservice: "oss",
      responseType: 'arraybuffer',
    };
    return await request<RspParams>(`${Url.DOWNLOAD.replace("{id}", id)}`, options);
  }
  // 批量文件下载 Get
  async getFileInfoByBatch(params: any) {
    const options = {
      method: "get",
      micservice: "oss",
      responseType: 'arraybuffer',
      // responseType: 'blob',
      params,
    };
    return await request<RspParams>(`${Url.DOWNLOAD_BATCH}`, options);
  }

}

export default File;
