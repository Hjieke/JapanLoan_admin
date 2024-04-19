<template>
  <div>
    <a-form class="ant-advanced-search-form" :form="cspzData">
      <a-row :gutter="24">
        <a-col :span="6">
          <a-form-item label="客服链接">
            <a-input v-model="cspzData.customerServiceUrl" placeholder="客服链接" />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="注册人数">
            <a-input v-model="cspzData.regNumber" placeholder="注册人数" />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="用户已赚">
            <a-input v-model="cspzData.userEarned" placeholder="用户已赚" />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="充值银行卡">
            <a-input v-model="cspzData.rechargeBankCard" placeholder="充值银行卡" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-button @click="updataData" type="primary">保存</a-button>
    </a-form>
  </div>
</template>

<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
import { mapState } from "vuex";
export default {
  name: "iphmd",
  data() {
    return {
      addvisible: false, //是否展示新增弹窗
      addconfirmLoading: false, //是否展示新增加载
      addform: this.$form.createForm(this, { name: "nickName" }), //新增表单
      editvisible: false, //是否展示编辑弹窗
      editconfirmLoading: false, //是否展示编辑加载
      cspzData:{
        
    }
    };
  },
  computed: {
    ...mapState(),
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
        },
        getCheckboxProps: (record) => ({
          props: {
            disabled: record.name === "Disabled User", // Column configuration not to be checked
            name: record.name,
          },
        }),
      };
    },
  },
  created() {
    this.getData();
  },
  watch: {
    $route(to, from) {
      console.log("路由变化", to.path);
      if (to.path.includes("cspz")) {
        console.log("当前路由", to.path);
        this.init();
      }
    },
  },
  methods: {
    //初始化
    init() {
      this.getData();
    },
   
    getData() {
      this.getcspzData({postOrget:0,data:null});
    },
    async getcspzData(parmsData) {
      let res = await this.$api.ZWGL.getcspzData(parmsData);
       this.cspzData=res.data[0];
    },
    // 更新内容
    async updataData(){
      let res = await this.$api.ZWGL.getcspzData({postOrget:1,data:this.cspzData});
      this.getData()
    }
  },
};
</script>

<style scoped lang="less">
.add {
  margin-top: 20px;
}
.iphmdTable {
  margin-top: 20px;
  /deep/ .ant-table-row {
    background: #ffffff;
  }
}
</style>