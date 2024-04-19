<template>
  <common-layout>
    <div class="top">
      <div class="header">
        <img alt="logo" class="logo" src="@/assets/img/logo.png" />
        <span class="title">{{ systemName }}</span>
      </div>
      <!-- <div class="desc">Ant Design 是西湖区最具影响力的 Web 设计规范</div> -->
    </div>
    <div class="login">
      <a-form @submit="onSubmit" :form="form">
        <a-tabs
          size="large"
          :tabBarStyle="{ textAlign: 'center' }"
          style="padding: 0 2px"
        >
          <a-tab-pane tab="账户密码登录" key="1">
            <a-alert
              type="error"
              :closable="true"
              v-if="error"
              :message="error"
              @close="onClose"
              showIcon
              style="margin-bottom: 24px"
            />
            <a-form-item>
              <a-input
                autocomplete="autocomplete"
                size="large"
                placeholder="account"
                v-decorator="[
                  'name',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入账户名',
                        whitespace: true,
                      },
                    ],
                  },
                ]"
              >
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                size="large"
                placeholder="password"
                autocomplete="autocomplete"
                type="password"
                v-decorator="[
                  'password',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入密码',
                        whitespace: true,
                      },
                    ],
                  },
                ]"
              >
                <a-icon slot="prefix" type="lock" />
              </a-input>
            </a-form-item>
          </a-tab-pane>
        </a-tabs>
        <a-form-item>
          <a-button
            :loading="logging"
            style="width: 100%; margin-top: 24px"
            size="large"
            htmlType="submit"
            type="primary"
            >登录</a-button
          >
        </a-form-item>
        <div>
          <!-- 其他登录方式
          <a-icon class="icon" type="alipay-circle" />
          <a-icon class="icon" type="taobao-circle" />
          <a-icon class="icon" type="weibo-circle" /> -->
          <!-- <router-link style="float: right" to="/dashboard/workplace"
            >注册账户</router-link
          > -->
        </div>
      </a-form>
    </div>
  </common-layout>
</template>

<script>
import CommonLayout from "@/layouts/CommonLayout";
import { login, getRoutesConfig } from "@/services/user";
import { setAuthorization } from "@/utils/request";
import { loadRoutes } from "@/utils/routerUtil";
import { mapMutations } from "vuex";

export default {
  name: "Login",
  components: { CommonLayout },
  data() {
    return {
      logging: false,
      error: "",
      form: this.$form.createForm(this),
    };
  },
  computed: {
    systemName() {
      return this.$store.state.setting.systemName;
    },
  },
  methods: {
    ...mapMutations("account", ["setUser", "setPermissions", "setRoles"]),
    onSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err) => {
        if (!err) {
          this.logging = true;
          const name = this.form.getFieldValue("name");
          const password = this.form.getFieldValue("password");
          // login(name, password).then(this.afterLogin);
          this.$api.YWYYindex.login(name, password).then(this.afterLogin);
        }
      });
    },
    afterLogin(res) {
      this.logging = false;
      console.log(res);
      const loginRes = res.data;
      if (loginRes.success) {
        res.data.permissions = [
          { id: "queryForm", operation: ["add", "edit"] },
        ];
        res.data.roles = [
          { id: "admin", operation: ["add", "edit", "delete"] },
        ];
        res.code = 0;
        res.message = "欢迎";
        res.data.user = {
          name: "admin",
          avatar: "@AVATAR",
          address: "@CITY",
          position: "@POSITION",
        };
        res.data.token = "Authorization:" + Math.random();
        res.data.expireAt = new Date(new Date().getTime() + 30 * 60 * 1000);
        const { user, permissions, roles } = res.data;
        console.log(user, permissions, roles);
        this.setUser(user);
        this.setPermissions(permissions);
        this.setRoles(roles);
        setAuthorization({
          token: loginRes.data.token,
          expireAt: new Date(loginRes.data.expireAt),
        });
        let result = {};
        // 获取路由配置
        result.code = 0;
        result.data = [
          {
            router: "root",
            children: [
              "demo",
              {
                router: "parent1",
                children: [
                  {
                    router: "demo",
                    name: "demo1",
                    authority: {
                      permission: "demo",
                      role: "admin",
                    },
                  },
                ],
              },
              {
                router: "parent2",
                children: [
                  {
                    router: "demo",
                    name: "demo2",
                  },
                ],
              },
              {
                router: "exception",
                children: ["exp404", "exp403", "exp500"],
              },
              {
                router: "demo",
                icon: "file-ppt",
                path: "auth/demo",
                name: "验权页面",
                authority: {
                  permission: "form",
                  role: "manager",
                },
              },
            ],
          },
        ];
        setTimeout(() => {
          const routesConfig = result.data;
          loadRoutes(routesConfig);
          this.$router.push("/stationservicemanage/wjgl");
          this.$message.success(loginRes.message, 3);
        }, 1 * 1000);
      }
    },
    onClose() {
      this.error = false;
    },
  },
};
</script>

<style lang="less" scoped>
.common-layout {
  .top {
    text-align: center;
    .header {
      height: 44px;
      line-height: 44px;
      a {
        text-decoration: none;
      }
      .logo {
        height: 44px;
        vertical-align: top;
        margin-right: 16px;
      }
      .title {
        font-size: 33px;
        color: @title-color;
        font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica,
          sans-serif;
        font-weight: 600;
        position: relative;
        top: 2px;
      }
    }
    .desc {
      font-size: 14px;
      color: @text-color-second;
      margin-top: 12px;
      margin-bottom: 40px;
    }
  }
  .login {
    width: 368px;
    margin: 0 auto;
    @media screen and (max-width: 576px) {
      width: 95%;
    }
    @media screen and (max-width: 320px) {
      .captcha-button {
        font-size: 14px;
      }
    }
    .icon {
      font-size: 24px;
      color: @text-color-second;
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: @primary-color;
      }
    }
  }
}
</style>
