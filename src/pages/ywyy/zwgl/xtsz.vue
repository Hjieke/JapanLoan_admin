<template>
  <div>
    <a-form :form="systemData">


      <a-row>
        <a-col span="12">
          <a-form-item label="公告设置">
            <a-input v-model="systemData.gonggao" placeholder="输入公告设置" />
          </a-form-item>
        </a-col>

        <a-col span="12">
          <a-form-item label="最小金额">
            <a-input v-model="systemData.min_money" placeholder="最小金额" />
          </a-form-item>
        </a-col>

        <a-col span="12">
          <a-form-item label="默认金额">
            <a-input v-model="systemData.money" placeholder="输入系统默认金额" />
          </a-form-item>
        </a-col>

        <a-col span="12">
          <a-form-item label="审批时间">
            <a-input v-model="systemData.time" placeholder="输入系统审批时间" />

          </a-form-item>
        </a-col>

        <a-col span="12">
          <a-form-item label="利率">
            <a-input v-model="systemData.li_lv" placeholder="输入系统计算利率" />
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="审批后的内容">
            <a-input v-model="systemData.sptgContent" placeholder="输入审批后的内容" />
          </a-form-item>
        </a-col>

      </a-row>
    </a-form>
    <a-row>
      <a-col span="24" style="text-align: right;">
        <a-button type="primary" @click="handleSubmit" html-type="submit">保存</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
import { mapState } from "vuex";
import Utils from "@/utils/common.js";

export default {
  name: "iphmd",
  data() {
    return {
      addvisible: false, //是否展示新增弹窗
      addconfirmLoading: false, //是否展示新增加载
      addform: this.$form.createForm(this, { name: "nickName" }), //新增表单
      editvisible: false, //是否展示编辑弹窗
      editconfirmLoading: false, //是否展示编辑加载
      editform: this.$form.createForm(this, { name: "ip" }), //新增表单
      pagination: {
        showTotal: (total, range) =>
          `rows:${range[0]}-${range[1]} total: ${total}`,
        pageSizeOptions: ["10", "20", "30", "40", "50"],
        showSizeChanger: true,
      }, //分页器配置对象
      tableData: [],
      systemData: {
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
      if (to.path.includes("lbt")) {
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

    async handleSubmit() {
      this.systemData.money = parseInt(this.systemData.money)
      this.systemData.time = parseInt(this.systemData.time)
      this.systemData.li_lv = parseFloat(this.systemData.li_lv)

      this.systemData.min_money = parseInt(this.systemData.min_money)
      console.log('保存的数据:', this.systemData);
      let res = await this.$api.YHGL.SetsystemConfig(this.systemData);
      if (res != null) {

        if (res.success == true) {
          this.getData();
        }

      }
    },


    //切换编辑弹出选项
    handleSelectChange_status(value) {
      console.log(value);
      this.editform.setFieldsValue({
        status: value,
      });
    },
    //切换编辑弹出选项
    handleSelectChange_type(value) {
      console.log(value);
      this.editform.setFieldsValue({
        type: value,
      });
    },
    getData() {
      this.Getsystemconfig();
    },
    async Getsystemconfig() {
      let res = await this.$api.YHGL.Getsystemconfig();

      this.systemData = res;
    },

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