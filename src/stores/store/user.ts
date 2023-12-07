import { defineStore } from "pinia";
import { StoreNameEnum } from "@/stores";
import { UsernamePassword, UserInfo, OAuth2Params, TokenResult } from "@/types";
import api from "@/api";

export const useUserStore = defineStore(StoreNameEnum.User, {
  state: () => ({
    userState: {
      authorized: false,
      token: "",
      refreshToken: "",
      userInfo: {} as UserInfo,
    },
  }),
  persist: {
    // 自定义数据持久化方式
    storage: window.sessionStorage, // 指定换成地址
    paths: ["userState"], // 指定需要持久化的state的路径名称
  },
  actions: {
    async accountLogin(data: UsernamePassword) {
      let res = await api.user.accountLogin(data);
      this.userState.authorized = true;
      this.userState.token = res.data.token;
      this.userState.refreshToken = res.data.refreshToken;
      let userINfo: UserInfo = await this.getUserInfo();
      this.userState.userInfo = userINfo;
    },
    async unauthorized() {
      this.userState.authorized = false;
      this.userState.token = "";
      this.userState.userInfo = {} as UserInfo;
    },
    async getUserInfo() {
      let res = await api.user.getUserInfo();
      return res.data;
    },
    async authorized() {
      this.userState.authorized = true;
      this.userState.userInfo = await this.getUserInfo();
    },
    setToken(token: TokenResult) {
      if (typeof token === "string") {
        this.userState.token = token;
      } else {
        /* 兼容后端接口 */
        const { refreshToken, token: t } = token;
        this.setAccessToken(t );
        refreshToken && this.setRefreshToken(refreshToken);
      }
    },
    setAccessToken(accessToken: string) {
      this.userState.token = accessToken;
    },
    setRefreshToken(refreshToken: string) {
      this.userState.refreshToken = refreshToken;
    },
    async oauth2Login(params: OAuth2Params): Promise<any> {
      try {
        const result = await api.user.oauth2Login(params as any);
        this.setToken(result.data);
        this.authorized();
        return result;
      } catch (e) {
        this.unauthorized();
      }
    },
  },
});
