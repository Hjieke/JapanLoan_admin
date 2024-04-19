<template>
  <div>
    <!-- <a-form class="ant-advanced-search-form" :form="searchform">
      <a-row :gutter="24">
        <a-col :span="6">
          <a-form-item label="期号">
            <a-input
              placeholder="期号"
              v-decorator="[
                'order_id',
                {
                  rules: [{ required: false, message: '期号' }],
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
    </a-form> -->

    <!-- <div class="table-operator add">
      <a-button type="primary" icon="plus" @click="showAddModal">新增</a-button>
    </div> -->
    <a-table
      class="iphmdTable"
      :row-selection="rowSelection"
      :columns="columnsData"
      :data-source="tableData"
      @change="tableChange"
      :pagination="pagination"
    >
      <template slot="set_num" slot-scope="text, record">
        <a-input-number
          placeholder="请输入预设开奖"
          v-model="record.set_num"
          style="width: 20%"
        />
        <a-button
          style="margin-left: 10px"
          type="primary"
          @click="saveYskj(record)"
          >保存</a-button
        >
      </template>
    </a-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Utils from "@/utils/common.js";
export default {
  name: "iphmd",
  data() {
    return {
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
        //   id: "1741386157314400258",
        //   createTime: "1704013788000",
        //   createUser: "1741385662134857729",
        //   updateTime: null,
        //   updateUser: null,
        //   orgCode: "xg_cm",
        //   playerId: "1741385662134857729",
        //   order_id: "10001",
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
        {
          title: "期号",
          dataIndex: "order_id",
        },
        {
          title: "预设开奖",
          dataIndex: "set_num",
          scopedSlots: { customRender: "set_num" },
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
            this.getYskjListData(values);
          }
        });
      });
    },
    //表格变化
    tableChange(e) {
      this.pagination = e;
      this.pagination.pageNo = e.current;
      console.log(e);
      this.getYskjListData();
    },
    getData() {
      this.getYskjListData();
    },
    async getYskjListData(param = {}) {
      let res = await this.$api.YHGL.getYskjListData({
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
    //编辑预设开奖值
    saveYskj(param) {
      this.$api.YHGL.editYskjData({ id: param.id, num: param.set_num })
        .then((res) => {
          if (res.success) {
            this.$message.success("保存成功");
            this.getYskjListData();
          } else {
            this.$message.error("保存失败");
          }
          this.editvisible = false;
        })
        .catch((err) => {
          this.$message.error(err);
          this.editvisible = false;
        });
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