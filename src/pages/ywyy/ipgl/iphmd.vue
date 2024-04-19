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
          <a-form-item label="IP">
            <a-input
              placeholder="ip"
              v-decorator="[
                'ip',
                {
                  rules: [{ required: true, message: 'ip!' }],
                },
              ]"
            />
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
    <div class="table">
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
            <a-menu slot="overlay">
              <a-menu-item @click="delHandle(record.id)">删除</a-menu-item>
            </a-menu>
          </a-dropdown>
        </template>
      </a-table>
      <!-- <a-pagination
        :total="pagination.total"
        :show-total="pagination.showTotal"
        style="margin-top: 20px; margin-left: 20px"
        :show-size-changer="pagination.showSizeChanger"
        @showSizeChange="onShowSizeChange"
        @change="pageChange"
        :page-size="pagination.pageSize"
        :current="pagination.pageNo"
      /> -->
    </div>
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
        <a-form-item label="IP">
          <a-input
            placeholder="ip"
            v-decorator="[
              'ip',
              {
                rules: [{ required: true, message: 'ip!' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item style="display: none" label="ID">
          <a-input
            placeholder="id"
            v-decorator="[
              'id',
              {
                rules: [{ required: true, message: 'id!' }],
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
        //   key: "1;;;;",
        //   ip: "103.666.15.61",
        //   createTime: "2024-01-20 21:14:05",
        //   createUser: "168486464164",
        //   updateTime: "2024-03-20 18:14:05",
        //   updateUser: "张三",
        // },
      ],
      columnsData: [
        {
          title: "ip",
          dataIndex: "ip",
        },
        {
          title: "创建时间",
          dataIndex: "createTime",
        },
        {
          title: "创建人",
          dataIndex: "createUser",
        },
        {
          title: "更新时间",
          dataIndex: "updateTime",
        },
        {
          title: "更新人",
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
      if (to.path.includes("iphmd")) {
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
      this.getIpHmdData();
    },
    async getIpHmdData() {
      let res = await this.$api.IPGL.getIpHmdData({
        pageNo: this.pagination.pageNo,
        pageSize: this.pagination.pageSize,
      });
      this.tableData = res.data.rows.map((e) => {
        e.key = e.id;
        try {
          e.createTime = Utils.getYMDHMS(e.createTime); //将时间戳转为yyyymmddmmss
          e.updateTime = Utils.getYMDHMS(e.updateTime); //将时间戳转为yyyymmddmmss
        } catch (error) {
          this.$message.error(error);
        }
        return e;
      });
      this.pagination.total = res.data.totalRows || 0;
    },
    tableChange(e) {
      this.pagination = e;
      this.pagination.pageNo = e.current;
      console.log(e);
      this.getIpHmdData();
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
      // this.searchform.resetFields();
      //重置数据
      this.getData();
    },
    //新增确认表单
    addHandleSubmit(e) {
      e.preventDefault();
      this.addform.validateFields((err, values) => {
        if (!err) {
          console.log("ip值", values);
          this.addIpHmdData(values);
        }
      });
    },
    //新增ip地址
    addIpHmdData(param) {
      this.$api.IPGL.addIpHmdData(param)
        .then((res) => {
          if (res.success) {
            this.$message.success("IP添加成功");
            this.getIpHmdData();
          } else {
            this.$message.error("IP添加失败");
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
          this.editIpHmdData(values);
        }
      });
    },
    //编辑接口
    editIpHmdData(param) {
      this.$api.IPGL.editIpHmdData(param)
        .then((res) => {
          if (res.success) {
            this.$message.success("IP编辑成功");
            this.getIpHmdData();
          } else {
            this.$message.error("IP编辑失败");
          }
          this.editvisible = false;
        })
        .catch((err) => {
          this.$message.error(err);
          this.editvisible = false;
        });
    },
    //删除接口
    delIpHmdData(param) {
      this.$api.IPGL.delIpHmdData(param)
        .then((res) => {
          if (res.success) {
            this.$message.success("IP删除成功");
            this.getIpHmdData();
          } else {
            this.$message.error("IP删除失败");
          }
          this.editvisible = false;
        })
        .catch((err) => {
          this.$message.error(err);
          this.editvisible = false;
        });
    },
    //删除操作
    delHandle(id) {
      this.delIpHmdData({ id });
    },
    //编辑操作
    editHandle(e) {
      this.editvisible = true; //展示编辑弹窗
      console.log(e);
      setTimeout(() => {
        //设置表单值
        this.$nextTick(() => {
          this.editform.setFieldsValue({
            id: e.id,
            ip: e.ip,
          });
        });
      }, 1 * 500);
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
.table {
  padding-bottom: 20px;
  background: #ffffff;
}
</style>