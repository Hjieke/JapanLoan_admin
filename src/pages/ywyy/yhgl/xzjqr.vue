<template>
  <div>
    <div class="table-operator">
      <a-button type="primary">查询</a-button>
      &nbsp;&nbsp; &nbsp;&nbsp;
      <a-button @click="reset">重置</a-button>
    </div>
    <div class="table-operator add">
      <a-button type="primary" icon="plus" @click="showAddModal">新增</a-button>
      <a-modal
        title="新增"
        :visible="addvisible"
        :confirm-loading="addconfirmLoading"
        @ok="addHandleSubmit"
        @cancel="handleCancel"
        okText="ok"
        width="900px"
        cancelText="cancel"
      >
        <a-form
          :form="addform"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          @submit="addHandleSubmit"
        >
          <a-form-item label="昵称">
            <a-input
              placeholder="昵称"
              v-decorator="[
                'nickName',
                {
                  rules: [{ required: true, message: '昵称' }],
                },
              ]"
            />
          </a-form-item>
          <a-form-item label="头像">
            <a-input
              placeholder="头像"
              v-decorator="[
                'avatar',
                {
                  rules: [{ required: true, message: '头像!' }],
                },
              ]"
              disabled
            />
            <a-upload
              name="avatar"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              :action="baseUrl"
              :before-upload="beforeUpload"
              @change="handleChange"
            >
              <img v-if="imageUrl" height="50px" :src="imageUrl" alt="avatar" />
              <div v-else>
                <a-icon :type="loading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
    <a-table
      class="iphmdTable"
      :row-selection="rowSelection"
      :columns="columnsData"
      :data-source="tableData"
      :pagination="pagination"
    >
      <template slot="avatar" slot-scope="text, record">
        <img height="30px" :src="record.avatar" alt="" />
      </template>
      <template slot="status" slot-scope="text, record">
        {{ record.status == 1 ? "启用" : "禁用" }}
      </template>

      <template slot="control" slot-scope="text, record">
        <a @click="editHandle(record)">编辑</a>
        <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
            更多<a-icon type="down" />
          </a>
          <a-menu slot="overlay" @click="delHandle">
            <a-menu-item :key="record.key">删除</a-menu-item>
          </a-menu>
        </a-dropdown>
      </template>
    </a-table>
    <a-modal
      title="编辑"
      :visible="editvisible"
      :confirm-loading="editconfirmLoading"
      @ok="editHandleSubmit"
      @cancel="edithandleCancel"
      okText="ok"
      width="900px"
      cancelText="cancel"
    >
      <a-form
        :form="editform"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-form-item label="昵称">
          <a-input
            placeholder="昵称"
            v-decorator="[
              'nickName',
              {
                rules: [{ required: true, message: '昵称' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="头像">
          <a-input
            placeholder="头像"
            v-decorator="[
              'avatar',
              {
                rules: [{ required: true, message: '头像!' }],
              },
            ]"
            disabled
          />
          <a-upload
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :action="baseUrl"
            :before-upload="beforeUpload"
            @change="handleChange"
          >
            <img v-if="editimageUrl" :src="editimageUrl" alt="avatar" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label="状态">
          <a-select
            v-decorator="[
              'status',
              {
                rules: [{ required: true, message: '状态' }],
              },
            ]"
            @change="handleSelectChange"
          >
            <a-select-option :value="1">启用</a-select-option>
            <a-select-option :value="0">禁用</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
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
      editform: this.$form.createForm(this, { name: "ip" }), //新增表单
      pagination: {
        showTotal: (total, range) =>
          `rows:${range[0]}-${range[1]} total: ${total}`,
        pageSizeOptions: ["10", "20", "30", "40", "50"],
        showSizeChanger: true,
      }, //分页器配置对象
      tableData: [
        // {
        //   key: "1",
        //   id: "165846461656",
        //   avatar: "https://www.baidu.com/favicon.ico",
        //   nickName: "张三丰",
        //   status: 1,
        // },
        // {
        //   key: "2",
        //   id: "78674685466",
        //   avatar: "https://www.baidu.com/favicon.ico",
        //   nickName: "焦三丰",
        //   status: 1,
        // },
        // {
        //   key: "3",
        //   id: "76876876",
        //   avatar: "https://www.baidu.com/favicon.ico",
        //   nickName: "易三丰",
        //   status: 1,
        // },
        // {
        //   key: "4",
        //   id: "78687678",
        //   avatar: "https://www.baidu.com/favicon.ico",
        //   nickName: "田三丰",
        //   status: 1,
        // },
        // {
        //   key: "5",
        //   id: "578575",
        //   avatar: "https://www.baidu.com/favicon.ico",
        //   nickName: "秦三丰",
        //   status: 1,
        // },
        // {
        //   key: "6",
        //   id: "786876767867",
        //   avatar: "https://www.baidu.com/favicon.ico",
        //   nickName: "杨三丰",
        //   status: 1,
        // },
        // {
        //   key: "7",
        //   id: "6876786",
        //   avatar: "https://www.baidu.com/favicon.ico",
        //   nickName: "王三丰",
        //   status: 1,
        // },
        // {
        //   key: "8",
        //   id: "15764564",
        //   avatar: "https://www.baidu.com/favicon.ico",
        //   nickName: "李三丰",
        //   status: 1,
        // },
      ],
      columnsData: [
        {
          title: "主键",
          dataIndex: "id",
        },
        {
          title: "头像",
          dataIndex: "avatar",
          scopedSlots: { customRender: "avatar" },
        },
        {
          title: "昵称",
          dataIndex: "nickName",
        },
        {
          title: "状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
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
      if (to.path.includes("xzjqr")) {
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
    handleSelectChange(value) {
      console.log(value);
      this.editform.setFieldsValue({
        status: value,
      });
    },
    getData() {
      this.getxzjqrData();
    },
    async getxzjqrData() {
      let res = await this.$api.YHGL.getxzjqrData();
      this.tableData = res.map((e) => {
        e.key = e.id;
        return e;
      });
    },
    showAddModal() {
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
      this.editvisible = false;
    },
    //重置按钮
    reset() {},
    //新增确认表单
    addHandleSubmit(e) {
      e.preventDefault();
      this.addform.validateFields((err, values) => {
        if (!err) {
          console.log("ip值", values);
        }
      });
    },
    //编辑确认表单
    editHandleSubmit(e) {
      e.preventDefault();
      this.editform.validateFields((err, values) => {
        if (!err) {
          console.log("", values);
        }
      });
    },
    //删除操作
    delHandle({ key }) {
      console.log(key);
    },
    //编辑操作
    editHandle(e) {
      this.editvisible = true; //展示编辑弹窗
      //设置表单值
      this.$nextTick(() => {
        this.editform.setFieldsValue({
          nickName: e.nickName,
          avatar: e.avatar,
          status: e.status,
        });
        this.editimageUrl = e.avatar;
      });
    },
    //上传
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
    //上传前
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
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