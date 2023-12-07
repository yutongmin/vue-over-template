/*
 * @Author: wuyefan
 * @Date: 2022-10-20 21:04:29
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-08-30 09:37:38
 */
import { UsernamePassword, RspParams } from "@/types";
import { request } from "@/utils";

enum Url {
  ACCOUNT_LOGIN = "/auths/login",

  LOGIN_OUT = "/auths/logout",

  GET_USER_INFO = "/auths/authenticated",

  /* OAuth2 登录 */
  OAUTH2_LOGIN = "/auths/getToken",

  /* 根据用户id获取个人信息 */
  GET_USERINFO_BY_ID = "/users/{id}",

  /* 修改个人信息 */
  EDIT_USER_INFO = "/users",

  /* 修改密码 */
  EDIT_PWD = "/users/updatePwd",

  /* 获取登录时间 */
  GET_LOGIN_TIME = "/login_logs",

  /* 验证手机号 */
  CHECK_PHONE = "/auths/chechPhone/{tel}",
  /* 调用后台发送验证码接口 */
  SEND_VERIFY_CODE = "/auths/sendVerifyCode/{tel}/5", // /auths/sendVerifyCode/{tel}/{businessType} 业务类型:1、登录2、找回密码3、业务待办4、重置密码
  /* 修改手机号 */
  UPDATE_TEL = "/auths/validatedUpdateTel",
}

/**
 * 用户接口
 */
export interface IUser {
  accountLogin: (data: UsernamePassword) => Promise<any>;
  getUserInfo: () => Promise<RspParams>;

  /**
   * OAuth2 协议登陆
   */
  oauth2Login: (oauth2Params: any) => Promise<any>;

  /* 根据用户id获取个人信息 */
  getUserInfoByID: (id: any) => Promise<RspParams>;
  /* 修改个人信息 */
  editUserInfo: (data: any) => Promise<RspParams>;
  /* 修改密码 */
  editPwd: (data: any) => Promise<RspParams>;

  /* 获取登录时间 */
  getLoginLogs: (params: any) => Promise<RspParams>;

  /* 验证手机号 */
  getChechPhone: (params: any) => Promise<RspParams>;
  /* 调用后台发送验证码接口 */
  sendVerifyCode: (params: any) => Promise<RspParams>;
  /* 修改手机号 */
  validatedUpdateTel: (params: any) => Promise<RspParams>;
}

class User implements IUser {
  /**
   * 账户登录
   * @param data
   */
  async accountLogin(data: UsernamePassword): Promise<RspParams> {
    const options = {
      method: "post",
      data: {
        captcha: data.captcha,
        captchaKey: data.captchaKey,
        username: data.username,
        password: data.password,
      },
    };

    return request(Url.ACCOUNT_LOGIN, options);
  }

  /**
   * 账户退出
   */
  async loginOut(): Promise<RspParams> {
    let res = await request(Url.LOGIN_OUT);
    return res;
  }

  /**
   * 获取用户信息
   * @returns
   */
  async getUserInfo(): Promise<RspParams> {
    let res = await request(Url.GET_USER_INFO);
    return res;
  }

  /**
   * OAuth2 协议登录
   * @param oauth2Params
   */
  async oauth2Login(oauth2Params: any): Promise<any> {
    const { code } = oauth2Params;
    return await request(Url.OAUTH2_LOGIN, {
      method: "get",
      params: { code },
      // error: {
      //   showType: "message",
      // },
    });
  }

  /* 根据用户id获取个人信息 */
  async getUserInfoByID(id: any): Promise<any> {
    return request(Url.GET_USERINFO_BY_ID.replace("{id}", id), {
      method: "get",
    });
  }

  /* 修改个人信息 */
  async editUserInfo(data: any): Promise<any> {
    return request(Url.EDIT_USER_INFO, {
      method: "PUT",
      data: data,
    });
  }
  /* 修改密码 */
  async editPwd(data: any): Promise<any> {
    return request(Url.EDIT_PWD, {
      method: "POST",
      data: data,
    });
  }
  /* 获取登录时间 */
  async getLoginLogs(params: any): Promise<any> {
    return request(Url.GET_LOGIN_TIME, {
      method: "get",
      params,
    });
  }

  /* 验证手机号 */
  async getChechPhone(params: any): Promise<any> {
    return request(Url.CHECK_PHONE.replace("{tel}", params), {
      method: "post",
    });
  }
  /* 调用后台发送验证码接口 */
  async sendVerifyCode(params: any): Promise<any> {
    return request(Url.SEND_VERIFY_CODE.replace("{tel}", params), {
      method: "post",
    });
  }
  /* 修改手机号 */
  async validatedUpdateTel(data: any): Promise<any> {
    const options = {
      method: "POST",
      data,
    };
    return request(Url.UPDATE_TEL, options);
  }
}

export default User;
