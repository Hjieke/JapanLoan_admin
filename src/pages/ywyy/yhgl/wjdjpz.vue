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
          <a-form-item label="等级名称">
            <a-input
              placeholder="等级名称"
              v-decorator="[
                'name',
                {
                  rules: [{ required: true, message: '等级名称' }],
                },
              ]"
            />
          </a-form-item>
          <a-form-item label="等级">
            <a-input
              style="width: 100%"
              placeholder="等级"
              v-decorator="[
                'level',
                {
                  rules: [{ required: true, message: '等级' }],
                },
              ]"
            />
          </a-form-item>
          <a-form-item label="最小充值金额">
            <a-input-number
              style="width: 100%"
              placeholder="最小充值金额"
              v-decorator="[
                'depositAmountMin',
                {
                  rules: [{ required: true, message: '最小充值金额' }],
                },
              ]"
            />
          </a-form-item>
          <a-form-item label="最大充值金额">
            <a-input-number
              style="width: 100%"
              placeholder="最大充值金额"
              v-decorator="[
                'depositAmountMax',
                {
                  rules: [{ required: true, message: '最大充值金额' }],
                },
              ]"
            />
          </a-form-item>
          <a-form-item label="彩金">
            <a-input-number
              style="width: 100%"
              placeholder="彩金"
              v-decorator="[
                'bonus',
                {
                  rules: [{ required: true, message: '彩金' }],
                },
              ]"
            />
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
    <a-table
      class="iphmdTable"
      :row-selection="rowSelection"
      :columns="columnsData"
      :data-source="tableData"
      @change="tableChange"
      :pagination="pagination"
    >
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
        <a-form-item style="display: none" label="id">
          <a-input
            placeholder="id"
            v-decorator="[
              'id',
              {
                rules: [{ required: true, message: 'id' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="等级名称">
          <a-input
            placeholder="等级名称"
            v-decorator="[
              'name',
              {
                rules: [{ required: true, message: '等级名称' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="等级">
          <a-input
            style="width: 100%"
            placeholder="等级"
            v-decorator="[
              'level',
              {
                rules: [{ required: true, message: '等级' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="最小充值金额">
          <a-input-number
            style="width: 100%"
            placeholder="最小充值金额"
            v-decorator="[
              'depositAmountMin',
              {
                rules: [{ required: true, message: '最小充值金额' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="最大充值金额">
          <a-input-number
            style="width: 100%"
            placeholder="最大充值金额"
            v-decorator="[
              'depositAmountMax',
              {
                rules: [{ required: true, message: '最大充值金额' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="彩金">
          <a-input-number
            style="width: 100%"
            placeholder="彩金"
            v-decorator="[
              'bonus',
              {
                rules: [{ required: true, message: '彩金' }],
              },
            ]"
          />
        </a-form-item>
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
      addform: this.$form.createForm(this, { name: "ip" }), //新增表单
      editvisible: false, //是否展示编辑弹窗
      editconfirmLoading: false, //是否展示编辑加载
      editform: this.$form.createForm(this, { name: "ip" }), //新增表单
      pagination: {
        showTotal: (total, range) =>
          `rows:${range[0]}-${range[1]} total: ${total}`,
        pageSizeOptions: ["10", "20", "30", "40", "50"],
        showSizeChanger: true,
        pageSize: 10,
        total: 10,
        pageNo: 1,
      }, //分页器配置对象
      tableData: [
        // {
        //   key: "1",
        //   id: "1709915898553749506",
        //   createTime: "1696510694000",
        //   createUser: "1610151500585398274",
        //   updateTime: "1699868430000",
        //   updateUser: "1610151500585398274",
        //   name: "VIP10",
        //   level: 10,
        //   depositAmountMin: 12000000000.0,
        //   depositAmountMax: 100000000000000000.0,
        //   bonus: 972000000.0,
        //   orgCode: "xg_cm",
        // },
      ],
      columnsData: [
        // {
        //   title: "Org",
        //   dataIndex: "orgCode",
        // },
        {
          title: "等级名称",
          dataIndex: "name",
        },
        {
          title: "等级",
          dataIndex: "level",
        },
        {
          title: "最小充值金额",
          dataIndex: "depositAmountMin",
        },
        {
          title: "最大充值金额",
          dataIndex: "depositAmountMax",
        },
        {
          title: "彩金",
          dataIndex: "bonus",
        },
        {
          title: "创建时间",
          dataIndex: "createTime",
        },
        {
          title: "创建人",
          dataIndex: "updateUser",
        },
        {
          title: "操作",
          dataIndex: "control",
          scopedSlots: { customRender: "control" },
        },
      ],
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
      if (to.path.includes("wjdjpz")) {
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
    //表格变化
    tableChange(e) {
      this.pagination = e;
      this.pagination.pageNo = e.current;
      this.getwjdjpzListData();
    },
    getData() {
      this.getwjdjpzListData();
    },
    async getwjdjpzListData(param) {
      let res = await this.$api.YHGL.getwjdjpzListData({
        pageNo: this.pagination.pageNo,
        pageSize: this.pagination.pageSize,
        ...param,
      });
      this.tableData = res.rows.map((e) => {
        e.key = e.id;
        //注册时间
        e.createTime = Utils.getYMDHMS(e.createTime); //将时间戳转为yyyymmddmmss
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
          this.addwjdjpzListData(values);
        }
      });
    },
    //新增玩家等级配置
    addwjdjpzListData(param) {
      this.$api.YHGL.addwjdjpzListData(param)
        .then((res) => {
          if (res.success) {
            this.$message.success("玩家等级配置添加成功");
            this.getData();
          } else {
            this.$message.error("玩家等级配置添加失败");
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
          console.log("编辑信息", values);
          this.editwjdjpzListData(values);
        }
      });
    },
    //编辑玩家配置
    editwjdjpzListData(param) {
      this.$api.YHGL.editwjdjpzListData(param)
        .then((res) => {
          if (res.success) {
            this.$message.success("玩家配置编辑成功");
            this.getData();
          } else {
            this.$message.error("玩家配置编辑失败");
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
    //删除接口
    delwjyhkListData(param) {
      this.$api.YHGL.delwjyhkListData(param)
        .then((res) => {
          if (res.success) {
            this.$message.success("玩家配置删除成功");
            this.getData();
          } else {
            this.$message.error("玩家配置删除失败");
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.error(err);
        });
    },
    //编辑操作
    editHandle(e) {
      this.editvisible = true; //展示编辑弹窗
      //设置表单值
      setTimeout(() => {
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
</style>