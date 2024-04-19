<template>
  <div>
    <a-row>
  <a-col span="12">
    <a-form-item label="公告设置">
      <a-input
        placeholder="输入公告设置"
        v-decorator="[
          'imageName',
          {
            rules: [{ required: true, message: '输入公告设置' }],
          },
        ]"
      />
    </a-form-item>
  </a-col>

  <a-col span="12">
    <a-form-item label="默认金额">
      <a-input
        placeholder="默认金额"
        v-decorator="[
          'anotherField',
          {
            rules: [{ required: true, message: '默认金额' }],
          },
        ]"
      />
    </a-form-item>
  </a-col>

  <a-col span="12">
    <a-form-item label="审批时间">
      <a-input
        placeholder="审批时间"
        v-decorator="[
          'anotherField',
          {
            rules: [{ required: true, message: '审批时间' }],
          },
        ]"
      />
    </a-form-item>
  </a-col>

  <a-col span="12">
    <a-form-item label="利率">
      <a-input
        placeholder="利率"
        v-decorator="[
          'anotherField',
          {
            rules: [{ required: true, message: '利率' }],
          },
        ]"
      />
    </a-form-item>
  </a-col>


  <a-col span="12">
    <a-form-item label="客服地址">
      <a-input
        placeholder="客服地址"
        v-decorator="[
          'anotherField',
          {
            rules: [{ required: true, message: '客服地址' }],
          },
        ]"
      />
    </a-form-item>
  </a-col>
</a-row>
<a-row>
  <a-col span="24" style="text-align: right;">
    <a-button type="primary" html-type="submit">保存</a-button>
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
      columnsData: [
        {
          title: "id",
          dataIndex: "pictureId",
        },
        {
          title: "图片名称",
          dataIndex: "pictureName",
        },
        {
          title: "图片",
          dataIndex: "pictureUrl",
          scopedSlots: { customRender: "pictureUrl" },
        },
        {
          title: "操作",
          dataIndex: "control",
          scopedSlots: { customRender: "control" },
        },
      ],
      //上传
      loading: false,
      imageUrl: "",
      editimageUrl: "", //修改的默认图片

      baseUrl: "http://180.76.248.111:10001/api/ZwtsV2Copy/zwts_fwxn_byfwzk", //图片上传地址

      fileList: [],
      file: null, // 用于保存文件对象
      bjid: null,
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
      this.getlbtData({ postOrget: 0, data: null });
    },
    async getlbtData(parmsData) {
      let res = await this.$api.ZWGL.getlbtData(parmsData);
      this.tableData = res.list.map((e) => {
        // e.createTime = Utils.getYMDHMS(e.createTime); //将时间戳转为yyyymmddmmss
        return e;
      });
    },
    showAddModal() {
      this.fileList = [];
      this.file = null;
      this.addvisible = true;
    },
    handleOk(e) {
      this.confirmLoading = true;
      setTimeout(() => {
        this.addvisible = false;
        this.addconfirmLoading = false;
      }, 2000);
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.addvisible = false;
    },
    //编辑取消
    edithandleCancel(e) {
      console.log("Clicked cancel button");
      this.bjid = null;
      this.editvisible = false;
    },
    //重置按钮
    reset() {},
    //新增确认表单
    addHandleSubmit(e) {
      e.preventDefault();
      this.addform.validateFields((err, values) => {
        if (!err) {
          values.imgUrl = this.file;
          console.log(values);
          this.uploadFile(values);
        }
      });
    },

    async uploadFile(parmsData) {
      let res = await this.$api.ZWGL.addOrUpdLbtData(parmsData);

      if (res.success == true) {
        this.addvisible = false;
        this.editvisible = false;
        this.getData();
      } else {
        this.addvisible = false;
        this.editvisible = false;
      }
    },
    //编辑确认表单
    editHandleSubmit(e) {
      e.preventDefault();
      this.editform.validateFields((err, values) => {
        if (!err) {
          values.id = this.bjid;
          if (this.file != null) {
            values.imgUrl = this.file;
          }
          this.uploadFile(values);
        }
      });
    },
    //删除操作
    async delHandle(record) {
      console.log(record);
      let res = await this.$api.ZWGL.getlbtdel({id:record.id});
      if (res.success == true) {
        this.getData();
      }
    },
    //编辑操作
    editHandle(e) {
      this.editvisible = true; //展示编辑弹窗
      //设置表单值
      this.$nextTick(() => {
        this.editform.setFieldsValue({
          type: parseInt(e.type),
          href: e.href,
          fileObjectName: e.fileObjectName,
          sort: e.sort,
          status: e.status,
          remarks: e.remarks,
        });
        this.imageUrl = e.imgUrlStr;
        this.bjid = e.id;
      });
    },

    //上传前
    beforeUpload(file) {
      this.file = file;
      this.imageUrl = URL.createObjectURL(file);
      // 你可以在这里进行文件类型和大小的校验
      // 返回false将停止上传
      return false; // 不要自动上传
    },
    //上传
    handleChange(info) {
      // 在这里处理上传状态的改变，比如上传失败的情况
      if (info.file.status === "error") {
        this.loading = false;
        // 处理上传出错的情况
      }
      // 在这里处理上传状态的改变，比如上传失败的情况
      if (info.file.status === "done") {
        this.loading = false;
        // 处理上传出错的情况
      }
      this.fileList = info.fileList.slice(-1); // 只保留最后上传的一个文件
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