<template>
  <div>
    <a-form class="ant-advanced-search-form" :form="searchform">
      <a-row :gutter="24">
        <a-col :span="6">
          <a-form-item label="玩家登录名">
            <a-input
              placeholder="玩家登录名"
              v-decorator="[
                'loginName',
                {
                  rules: [{ required: false, message: '用户状玩家登录名' }],
                },
              ]"
            />
          </a-form-item>
        </a-col>
        <!-- <a-col :span="6">
          <a-form-item label="开户姓名">
            <a-input
              placeholder="开户姓名"
              v-decorator="[
                'real_name',
                {
                  rules: [{ required: false, message: '开户姓名' }],
                },
              ]"
            />
          </a-form-item>
        </a-col> -->
        <a-col :span="6">
          <a-form-item label="银行卡号">
            <a-input
              placeholder="银行卡号"
              v-decorator="[
                'card_num',
                {
                  rules: [{ required: false, message: '银行卡号' }],
                },
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <div class="table-operator">
            <a-button type="primary" @click="ToSearch">查询</a-button>
            &nbsp;&nbsp; &nbsp;&nbsp;
            <a-button @click="reset">重置</a-button>
          </div>
        </a-col>
      </a-row>
    </a-form>

    <div class="table-operator add">
      <a-button type="primary" icon="plus" @click="showAddModal">新增</a-button>
    </div>
    <a-table
      class="iphmdTable"
      :row-selection="rowSelection"
      :columns="columnsData"
      :data-source="tableData"
      @change="tableChange"
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
          <a-menu slot="overlay" @click="delHandle(record)">
            <a-menu-item :key="record.key">删除</a-menu-item>
          </a-menu>
        </a-dropdown>
      </template>
    </a-table>
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
        <a-form-item label="玩家登录名">
          <a-input
            placeholder="玩家登录名"
            v-decorator="[
              'loginName',
              {
                rules: [{ required: true, message: '玩家登录名' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="开户姓名">
          <a-input
            placeholder="开户姓名"
            v-decorator="[
              'real_name',
              {
                rules: [{ required: true, message: '开户姓名' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="银行卡号">
          <a-input
            placeholder="银行卡号"
            v-decorator="[
              'card_num',
              {
                rules: [{ required: true, message: '银行卡号' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="银行卡密码">
          <a-input
            placeholder="银行卡密码"
            v-decorator="[
              'card_password',
              {
                rules: [{ required: true, message: '银行卡密码' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="银行名称">
          <!-- <a-input
            placeholder="银行名称"
            v-decorator="[
              'bank_name',
              {
                rules: [{ required: true, message: '银行名称' }],
              },
            ]"
          /> -->
          <a-select
            v-decorator="[
              'bank_name',
              {
                rules: [{ required: true, message: '状态' }],
              },
            ]"
            @change="handleSelectChange_type"
          >
            <a-select-option
              v-for="(item, index) in bankList"
              :key="index"
              :value="item"
              >{{ item }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <!-- <a-form-item label="分行地址">
          <a-input
            placeholder="分行地址"
            v-decorator="[
              'branch',
              {
                rules: [{ required: false, message: '分行地址' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="备注">
          <a-textarea
            placeholder="备注"
            v-decorator="[
              'remark',
              {
                rules: [{ required: false, message: '备注' }],
              },
            ]"
          />
        </a-form-item> -->
      </a-form>
    </a-modal>
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
        <a-form-item label="玩家登录名">
          <a-input
            placeholder="玩家登录名"
            v-decorator="[
              'loginName',
              {
                rules: [{ required: true, message: '玩家登录名' }],
              },
            ]"
          />
        </a-form-item>
        <!-- <a-form-item label="开户姓名">
          <a-input
            placeholder="开户姓名"
            v-decorator="[
              'real_name',
              {
                rules: [{ required: true, message: '开户姓名' }],
              },
            ]"
          />
        </a-form-item> -->
        <a-form-item label="银行卡号">
          <a-input
            placeholder="银行卡号"
            v-decorator="[
              'card_num',
              {
                rules: [{ required: true, message: '银行卡号' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="银行卡密码">
          <a-input
            placeholder="银行卡密码"
            v-decorator="[
              'card_password',
              {
                rules: [{ required: true, message: '银行卡密码' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="银行名称">
          <a-input
            placeholder="银行名称"
            v-decorator="[
              'bank_name',
              {
                rules: [{ required: true, message: '银行名称' }],
              },
            ]"
          />
        </a-form-item>
        <!-- <a-form-item label="分行地址">
          <a-input
            placeholder="分行地址"
            v-decorator="[
              'branch',
              {
                rules: [{ required: false, message: '分行地址' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="分行地址">
          <a-input
            placeholder="分行地址"
            v-decorator="[
              'branch',
              {
                rules: [{ required: false, message: '分行地址' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="备注">
          <a-textarea
            placeholder="备注"
            v-decorator="[
              'remark',
              {
                rules: [{ required: true, message: '备注' }],
              },
            ]"
          />
        </a-form-item> -->
      </a-form>
    </a-modal>
  </div>
</template>

<script>
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
      searchform: this.$form.createForm(this, { nickName: "昵称" }), //搜索表单
      pagination: {
        showTotal: (total, range) =>
          `rows:${range[0]}-${range[1]} total: ${total}`,
        pageSizeOptions: ["10", "20", "30", "40", "50"],
        showSizeChanger: true,
        pageSize: 10,
        total: 10,
        pageNo: 1,
      }, //分页器配置对象
      //銀行卡列表
      bankList: [
        "渣打銀行(香港)",
        "香港上海滙豐銀行",
        "中國建設銀行(亞洲)",
        "中國銀行(香港)",
        "東亞銀行",
        "星展銀行(香港)",
        "中信銀行國際",
        "永隆銀行",
        "華僑永亨銀行",
        "恒生銀行",
        "上海商業銀行",
        "交通銀行(香港)",
        "大眾銀行(香港)",
        "大有銀行",
        "集友銀行",
        "大新銀行",
        "創興銀行",
        "南洋商業銀行",
        "大生銀行",
        "中國工商銀行(亞洲)",
        "富邦銀行(香港)",
        "花旗銀行(香港)",
        "中國信託商業銀行",
        "德意志銀行",
        "華南商業銀行",
        "台灣銀行",
        "上海商業儲蓄銀行",
        "ESUN商業銀行",
        "台灣土地銀行",
        "台北富邦銀行",
        "台灣合作金庫銀行",
        "台中銀行",
        "第一商業銀行股份有限公司",
        "台灣花旗銀行",
        "玉山商業銀行",
        "彰化銀行",
        "元大商業銀行",
        "兆豐銀行",
        "台新銀行",
        "中信銀行",
        "永豐銀行",
      ],
      tableData: [
        // {
        //   key: "1",
        //   id: "1741386157314400258",
        //   createTime: "1704013788000",
        //   createUser: "1741385662134857729",
        //   updateTime: null,
        //   updateUser: null,
        //   orgCode: "xg_cm",
        //   playerId: "1741385662134857729",
        //   loginName: "10001",
        //   real_name: "NGUYEN TAN PHONG ",
        //   card_num: "19034929411111",
        //   card_password: "Techcombank",
        //   bank_name: "Techcombank",
        //   branch: "",
        //   remark: null,
        //   status: 1,
        //   sort: null,
        //   cardType: "Debit",
        // },
      ],
      columnsData: [
        // {
        //   title: "Org",
        //   dataIndex: "orgCode",
        // },
        {
          title: "玩家登录名",
          dataIndex: "loginName",
        },
        {
          title: "开户姓名",
          dataIndex: "real_name",
        },
        {
          title: "银行卡号",
          dataIndex: "card_num",
        },
        {
          title: "银行卡密码",
          dataIndex: "card_password",
        },
        {
          title: "银行名称",
          dataIndex: "bank_name",
        },
        // {
        //   title: "分行地址",
        //   dataIndex: "branch",
        // },
        // {
        //   title: "备注",
        //   dataIndex: "remark",
        // },
        // {
        //   title: "状态",
        //   dataIndex: "status",
        // },
        // {
        //   title: "创建时间",
        //   dataIndex: "createTime",
        // },
        // {
        //   title: "创建人",
        //   dataIndex: "createUser",
        // },
        // {
        //   title: "操作",
        //   dataIndex: "copyContent",
        //   scopedSlots: { customRender: "control" },
        // },
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
      if (to.path.includes("wjyhk")) {
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
    //点击搜索
    ToSearch(e) {
      e.preventDefault();
      this.$nextTick(() => {
        this.searchform.validateFields((err, values) => {
          if (!err) {
            //unidentified的内容直接替换为了''
            for (let k in values) {
              console.log(values[k]);
              if (values[k]) {
                values[k] = values[k];
              } else {
                values[k] = "";
              }
            }
            console.log("搜索", values);
            this.getwjyhkListData(values);
          }
        });
      });
    },
    //表格变化
    tableChange(e) {
      this.pagination = e;
      this.pagination.pageNo = e.current;
      console.log(e);
      this.getwjyhkListData();
    },
    //切换编辑弹出选项
    handleSelectChange(value) {
      console.log(value);
      this.editform.setFieldsValue({
        status: value,
      });
    },
    getData() {
      this.getwjyhkListData();
    },
    async getwjyhkListData(param = {}) {
      let res = await this.$api.YHGL.getwjyhkListData({
        pageNo: this.pagination.pageNo,
        pageSize: this.pagination.pageSize,
        ...param,
      });
      this.tableData = res.rows.map((e) => {
        e.key = e.id;
        try {
          // e.createTime = Utils.getYMDHMS(e.createTime); //将时间戳转为yyyymmddmmss
        } catch (error) {
          console.log(error);
        }
        return e;
      });
      this.pagination.total = res.totalRows || 0;
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
    reset() {
      this.pagination = {
        showTotal: (total, range) =>
          `rows:${range[0]}-${range[1]} total: ${total}`,
        pageSizeOptions: ["10", "20", "30", "40", "50"],
        showSizeChanger: true,
        pageSize: 10,
        total: 10,
        pageNo: 1,
        current: 1,
      };
      //重置表单
      this.searchform.resetFields();
      //重置数据
      this.getData();
    },
    //新增确认表单
    addHandleSubmit(e) {
      e.preventDefault();
      this.addform.validateFields((err, values) => {
        if (!err) {
          console.log("新增参数", values);
          this.addwjyhkListData(values);
        }
      });
    },
    //新增玩家
    addwjyhkListData(param) {
      this.$api.YHGL.addwjyhkListData(param)
        .then((res) => {
          if (res.success) {
            this.$message.success("玩家银行卡添加成功");
            this.getwjyhkListData();
          } else {
            this.$message.error("玩家银行卡添加失败");
          }
          this.addvisible = false;
        })
        .catch((err) => {
          this.$message.error(err);
          this.addvisible = false;
        });
    },
    //编辑确认表单
    editHandleSubmit(e) {
      e.preventDefault();
      this.editform.validateFields((err, values) => {
        if (!err) {
          console.log("", values);
          this.editwjyhkListData(values);
        }
      });
    },
    //编辑玩家银行卡
    editwjyhkListData(param) {
      this.$api.YHGL.editwjyhkListData(param)
        .then((res) => {
          if (res.success) {
            this.$message.success("玩家银行卡编辑成功");
            this.getwjyhkListData();
          } else {
            this.$message.error("玩家银行卡编辑失败");
          }
          this.editvisible = false;
        })
        .catch((err) => {
          this.$message.error(err);
          this.editvisible = false;
        });
    },
    //删除操作
    delHandle(e) {
      this.delwjyhkListData(e);
    },
    //删除玩家银行卡
    delwjyhkListData(param) {
      this.$api.YHGL.delwjyhkListData(param)
        .then((res) => {
          if (res.success) {
            this.$message.success("删除玩家银行卡成功");
            this.getwjyhkListData();
          } else {
            this.$message.error("删除玩家银行卡失败");
          }
          this.editvisible = false;
        })
        .catch((err) => {
          this.$message.error(err);
          this.editvisible = false;
        });
    },
    //编辑操作
    editHandle(e) {
      this.editvisible = true; //展示编辑弹窗
      setTimeout(() => {
        //设置表单值
        this.$nextTick(() => {
          this.editform.setFieldsValue({
            ...e,
          });
        });
      }, 500);
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
/deep/.ant-advanced-search-form .ant-form-item {
  display: flex;
}

/deep/.ant-advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
}
</style>