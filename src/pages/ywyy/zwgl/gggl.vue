<template>
  <div>
    <!-- <div class="table-operator">
      <a-button type="primary">查询</a-button>
      &nbsp;&nbsp; &nbsp;&nbsp;
      <a-button @click="reset">重置</a-button>
    </div> -->
    <div class="table-operator add">
      <a-button type="primary" icon="plus" @click="showAddModal">新增</a-button>
      <a-modal title="新增" :visible="addvisible" :confirm-loading="addconfirmLoading" @ok="addHandleSubmit"
        @cancel="handleCancel" okText="ok" width="900px" cancelText="cancel">
        <a-form :form="addform" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="addHandleSubmit">
          <a-form-item label="公告管理">
            <a-input placeholder="公告管理" v-decorator="[
        'context',
        {
          rules: [{ required: true, message: '公告管理' }],
        },
      ]" />
          </a-form-item>
        
        </a-form>

      </a-modal>
    </div>
    <a-table class="iphmdTable" :row-selection="rowSelection" :columns="columnsData" :data-source="tableData"
      :pagination="pagination">


      <template slot="control" slot-scope="text, record">
        <a @click="editHandle(record)">编辑</a>
        <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
            更多<a-icon type="down" />
          </a>
          <a-menu slot="overlay" @click="delHandle">
            <a-menu-item :key="record.id">删除</a-menu-item>
          </a-menu>
        </a-dropdown>
      </template>
    </a-table>
    <a-modal title="编辑" :visible="editvisible" :confirm-loading="editconfirmLoading" @ok="editHandleSubmit"
      @cancel="edithandleCancel" okText="ok" width="900px" cancelText="cancel">
      <a-form :form="editform" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">

        <a-form-item style="display:none;"  label="id">
          <a-input placeholder="id" style="display:none;" v-decorator="[
        'id',
        {
          rules: [{ required: false, message: 'id' }],
        },
      ]" />
        </a-form-item>
        <a-form-item label="公告管理">
          <a-input placeholder="公告管理" v-decorator="[
        'context',
        {
          rules: [{ required: true, message: '公告管理' }],
        },
      ]" />
        </a-form-item>
        <!-- <a-form-item label="状态">
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
        </a-form-item> -->
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
import Utils from "@/utils/common.js";
import { messages } from "../../../components/setting/i18n";
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
        // {
        //   title: "Org",
        //   dataIndex: "orgCode",
        // },
        {
          title: "ID",
          dataIndex: "id",
        },
        {
          title: "公告内容",
          dataIndex: "context",
        },
        // {
        //   title: "状态",
        //   dataIndex: "status",
        //   scopedSlots: { customRender: "status" },
        // },
        {
          title: "创建时间",
          dataIndex: "create_time",
        },
        {
          title: "操作",
          dataIndex: "control",
          scopedSlots: { customRender: "control" },
        },
      ],
      //上传
      loading: false,
      bjid: null,
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
      if (to.path.includes("gggl")) {
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
      this.getggglData();
    },
    async getggglData() {
      let res = await this.$api.YHGL.getMessage();
      try {
        if (res.rows.length != 0) {
          this.tableData = res.rows.map((e) => {
            e.create_time = Utils.getYMDHMS(e.create_time); //将时间戳转为yyyymmddmmss
            return e;
          });
          this.bjid = null;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async addOrdelOrEdit(parms) {
      if (parms.status == "添加") {
        let res = await this.$api.YHGL.addMessage(parms.data);
        this.addvisible = false;
        this.getggglData();
      }
      if (parms.status == "删除") {
        let res = await this.$api.YHGL.delMessage(parms.data);
        this.getggglData();
      }
      if (parms.status == "编辑") {
        let res = await this.$api.YHGL.editMessage(parms.data);
        this.editvisible=false;
        this.getggglData();
      }
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
    reset() { },
    //新增确认表单
    addHandleSubmit(e) {
      e.preventDefault();
      this.addform.validateFields((err, values) => {
        if (!err) {
            this.addOrdelOrEdit({status:"添加",data:{context:values.context}});
        }
      });
    },
    //编辑确认表单
    editHandleSubmit(e) {
      e.preventDefault();
      this.editform.validateFields((err, values) => {
        if (!err) {
         
          this.addOrdelOrEdit({ status: "编辑", data: values });
        }
      });
    },
    //删除操作
    delHandle({ key }) {
       
      this.addOrdelOrEdit({status: "删除", data: {id:key} })
    },
    //编辑操作
    editHandle(e) {
      this.editvisible = true; //展示编辑弹窗
      //设置表单值
      this.$nextTick(() => {
        this.editform.setFieldsValue({
          context: e.context,
          id:e.id,
        });
      });
      this.bjid = e.id;
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