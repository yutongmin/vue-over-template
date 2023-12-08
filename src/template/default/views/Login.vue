<template>
  <div class="container">
    <div class="effects">
      <div class="left">
        <img :src="publicPath + '/images/login/left-pic.png'" />
      </div>
      <video
        :src="publicPath + 'images/login/effects-video.mp4'"
        type="video/mp4"
        autoplay
        loop
      ></video>
    </div>
    <div class="container__body">
      <div class="title">
        <span class="header-title-name">{{ sysName }}</span>
      </div>
      <div class="content">
        <div class="login-container">
          <el-tabs
            v-model="activeName"
            class="demo-tabs"
            @tab-click="handleClick"
          >
            <el-tab-pane label="用户登录" name="userlogin">
              <el-form
                ref="loginForm"
                label-width="80px"
                :model="formData"
                :rules="rules"
                name="test"
              >
                <el-form-item label="用户名：" prop="userName">
                  <el-input
                    size="large"
                    placeholder="请输入用户名"
                    v-model="formData.userName"
                    @keydown.enter="handleEnter($event, loginForm)"
                  ></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="passWord">
                  <el-input
                    size="large"
                    placeholder="请输入密码"
                    type="password"
                    v-model="formData.passWord"
                    @keydown.enter="handleEnter($event, loginForm)"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item
                  label="验证码："
                  prop="captcha"
                  v-if="captchaIsShow"
                >
                  <div class="login-captcha">
                    <el-input
                      size="large"
                      v-model="formData.captcha"
                      @keydown.enter="handleEnter($event, loginForm)"
                    >
                      <template #append>
                        <el-image
                          class="login-captcha-image"
                          :src="imgbase64"
                          :fit="'cover'"
                          @click="captchaClick"
                        />
                      </template>
                    </el-input>
                  </div>
                </el-form-item>
                <el-form-item class="forget_pwd">
                  <a href="javascript:;">忘记密码？</a>
                </el-form-item>
              </el-form>
              <div class="login-button">
                <el-button type="primary" @click.prevent="onClick(loginForm)"
                  >登录</el-button
                >
              </div>
            </el-tab-pane>
            <!-- <el-tab-pane label="手机登录" name="secend"> </el-tab-pane> -->
          </el-tabs>
        </div>
      </div>
    </div>
    <!-- <div class="footer">
        <div class="links">
          <a href="#">版权所有：  </a>
          <a href="#">技术支持：  </a>
          <a href="#">服务热线：</a>
        </div>
      </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, onMounted, watch, } from "vue";
import type { TabsPaneContext } from "element-plus";
import { useUserStore } from "@/stores/store/user";
import { loadCaptcha } from "@/utils";
import { useRouter } from "vue-router";

const publicPath = import.meta.env.APP_PUBLIC_PATH;

export default defineComponent({
  name: "LoginPage",
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    const loadCaptchaFn = loadCaptcha;
    const imgbase64 = ref("");

    let timer:any= null
    let config = ref()
    let captchaIsShow = ref(false) //window.config.captcha;
 
    const state = reactive({
      activeName: "userlogin",
      sysName: "安徽省(六安市)社会救助大数据信息系统",
    });
    const formData = reactive({
      userName: "",
      passWord: "",
      captcha: "",
      captchaKey: "",
    });

    onMounted(async () => {
      timer = setInterval(()=>{
        config.value = window.config
      },1)
    });
    watch(
      () => config.value,
      (newValue, oldValue) => {
        clearInterval(timer)
        captchaIsShow.value = config.value.captcha;
      }
    );

    const handleClick = (tab: TabsPaneContext, event: Event) => {};

    /**
     * 验证规则
     */
    const rules = reactive<FormRules>({
      userName: [
        { required: true, message: "用户名不能为空", trigger: "blur" },
      ],
      passWord: [
        {
          required: true,
          message: "密码不能为空",
          trigger: "blur",
        },
      ],
      captcha: [
        {
          required: true,
          message: "验证码不能为空",
          trigger: "blur",
        },
      ],
    });
    const loginForm = ref<FormInstance>();

    /**
     * 登录事件
     */
    const onClick = async function (formEl: FormInstance | undefined) {
      if (!formEl) return;
      await formEl.validate((valid: any) => {
        if (valid) {
          userStore
            .accountLogin({
              captcha: formData.captcha,
              captchaKey: formData.captchaKey,
              username: formData.userName,
              password: formData.passWord,
            })
            .then((res) => {})
            .catch((e) => {
              loadCaptchaFn().then((res) => {
                imgbase64.value = res.captchaImageBase64;
                formData.captchaKey = res.captchaKey;
                formData.captcha = "";
              });
            })
            .finally(() => {
              router.replace('/default/home');
            });
        }
      });
    };

    /**
     * 监听回车
     * @param e
     */
    const handleEnter = (e: KeyboardEvent, loginForm: any) => {
      if (e.keyCode == 13) {
        onClick(loginForm);
      }
    };

    /**
     * 加载验证码
     */
    if (captchaIsShow) {
      loadCaptchaFn().then((res) => {
        imgbase64.value = res.captchaImageBase64;
        formData.captchaKey = res.captchaKey;
      });
    }

    const captchaClick = function () {
      loadCaptchaFn().then((res) => {
        imgbase64.value = res.captchaImageBase64;
        formData.captchaKey = res.captchaKey;
      });
    };

    return {
      ...toRefs(state),
      ...toRefs(formData),
      formData,
      handleClick,
      rules,
      loginForm,
      handleEnter,
      imgbase64,
      captchaIsShow,
      captchaClick,
      onClick,
      publicPath,
    };
  },
});
</script>

<style lang="less" scoped>
.container {
  height: 100vh;
  width: 100vw;
  /* background-color: #0984e3; */
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../../../../public/login/effects-bg.jpg") 50% no-repeat;
  background-size: 100%;
  .effects {
    position: absolute;
    width: 100%;
    height: inherit;
    padding: 0;
    margin: 0;

    .left {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: calc(100% - 15% - 368px);
      height: calc(100% - 120px);
      img {
        z-index: 2;
        width: 700px;
        height: 470px;
      }
    }
    video {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .effects::before {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    display: block;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    content: "";
  }

  .container__body {
    position: absolute;
    right: 15%;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 300px;
    height: 100%;

    .title {
      margin-bottom: 16px;
      color: #fff;
      font-size: 26px;
      letter-spacing: 2px;
    }

    .content {
      width: 100%;
      margin-left: -50px;
      .login-container {
        position: relative;
        width: 100%;
        padding: 36px 24px 24px;
        background: #fff;
        background-size: 100% 100%;
        border-radius: 6px;
        box-shadow: 0 2px 8px 0 rgba(7, 17, 27, 0.06);

        .login-captcha {
          display: flex;
          flex: 1;
          .login-captcha-image {
            cursor: pointer;
            width: 90px;
            height: 100%;
            border-radius: 0 5px 5px 0;
          }
        }

        .login-button {
          width: 100%;
          text-align: center;
          .el-button {
            width: 100%;
            background-color: #1e9fff;
            border-radius: 100px;
            line-height: 38px;
            height: 38px;
            font-size: 18px;
          }
        }
        .forget_pwd {
          float: right;
          a {
            color: #777;
          }
        }
      }
    }
  }
}

::v-deep(.el-input-group__append) {
  padding: 0;
}
</style>
