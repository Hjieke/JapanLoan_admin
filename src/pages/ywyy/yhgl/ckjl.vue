<template>
  <div>
    <a-form class="ant-advanced-search-form" :form="searchform">
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="创建时间">
            <a-range-picker
              show-time
              format="YYYY-MM-DD HH:mm:ss"
              v-decorator="[
                'createTime',
                {
                  rules: [{ required: false, message: '创建时间' }],
                },
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="玩家登录名">
            <a-input
              placeholder="玩家登录名"
              v-decorator="[
                'loginName',
                {
                  rules: [{ required: false, message: '玩家登录名' }],
                },
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="昵称">
            <a-input
              placeholder="昵称"
              v-decorator="[
                'nickName',
                {
                  rules: [{ required: false, message: '昵称' }],
                },
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <div class="table-operator">
      <a-button type="primary" @click="ToSearch">查询</a-button>
      &nbsp;&nbsp; &nbsp;&nbsp;
      <a-button @click="reset">重置</a-button>
    </div>
    <a-table
      class="iphmdTable"
      :row-selection="rowSelection"
      :columns="columnsData"
      :data-source="tableData"
      @change="tableChange"
      :pagination="pagination"
    >
      <!-- <template slot="rechChannel" slot-scope="text, record">
        {{ record.rechChannel == "MANUAL_RECHARGE" ? "后台充值" : "禁用" }}
      </template> -->
      <!-- <template slot="createTime" slot-scope="text, record">
        {{ Utils.getYMDHMS(record.createTime) }}
      </template>
      <template slot="finishTime" slot-scope="text, record">
        {{ Utils.getYMDHMS(record.finishTime) }}
      </template> -->
      <!-- <template slot="control" slot-scope="text, record">
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
      </template> -->
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
      //时间选择配置
      rangeConfig: {
        rules: [
          { type: "array", required: true, message: "Please select time!" },
        ],
      },
      searchform: this.$form.createForm(this, { nickName: "昵称" }), //搜索表单
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
        //   key: "1766359300449509377",
        //   id: "1766359300449509377",
        //   createTime: "1709967849246",
        //   createUser: "1741357416760586242",
        //   updateTime: "1709967849246",
        //   updateUser: "1741357416760586242",
        //   orgCode: "xg_cm",
        //   playerId: "1764628340448190465",
        //   loginName: "test3",
        //   orderNo: "D240309140409246109",
        //   rechPerson: null,
        //   rechMoney: 8888888888.0,
        //   actualMoney: 8888888888.0,
        //   discountMoney: 0.0,
        //   fee: 0.0,
        //   rechChannel: "MANUAL_RECHARGE",
        //   payeeBank: null,
        //   payeeBankBranch: null,
        //   payeeName: null,
        //   payeeNo: null,
        //   payeeRemark: null,
        //   status: 6,
        //   operatorAccount: null,
        //   operatorTime: null,
        //   operatorMemo: null,
        //   finishUser: "admin",
        //   finishTime: "1709967849246",
        //   finishMemo: null,
        //   thirdOrderNo: null,
        //   thirdChannel: null,
        //   ipAddress: "113.246.68.20",
        //   reckonDmlFlag: null,
        //   playerType: "HY",
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
          title: "订单编号",
          dataIndex: "orderNo",
        },
        {
          title: "充值金额",
          dataIndex: "rechMoney",
        },
        {
          title: "充值渠道",
          dataIndex: "rechChannel",
        },
        {
          title: "备注",
          dataIndex: "payeeRemark",
        },
        {
          title: "订单状态",
          dataIndex: "status",
        },
        {
          title: "创建时间",
          dataIndex: "createTime",
          scopedSlots: { customRender: "createTime" },
        },
        {
          title: "完成时间",
          dataIndex: "finishTime",
          scopedSlots: { customRender: "finishTime" },
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
      pagination: {
        showTotal: (total, range) =>
          `rows:${range[0]}-${range[1]} total: ${total}`,
        pageSizeOptions: ["10", "20", "30", "40", "50"],
        showSizeChanger: true,
        pageSize: 10,
        total: 10,
        pageNo: 1,
      }, //分页器配置对象
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
      if (to.path.includes("ckjl")) {
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
            // values["createTime"] = values["createTime"].getTime();
            console.log("搜索", values);
            //到秒除以1000，到毫秒去掉除1000
            let startAt = "";
            let endAt = "";
            try {
              startAt = Math.ceil(values["createTime"][0]._d.getTime() / 1000); //开始时间
              endAt = Math.ceil(values["createTime"][1]._d.getTime() / 1000); //结束时间
            } catch (error) {
              console.log(error);
            }
            this.getckjlListData({
              ...values,
              searchBeginTime: startAt,
              searchEndTime: endAt,
            });
          }
        });
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
    getData() {
      this.getckjlListData();
    },
    async getckjlListData(param) {
      let res = await this.$api.YHGL.getckjlListData({
        pageNo: this.pagination.pageNo,
        pageSize: this.pagination.pageSize,
        ...param,
      });
      this.tableData = res.rows.map((e) => {
        e.key = e.id;
        try {
          e.createTime = Utils.getYMDHMS(e.createTime); //将时间戳转为yyyymmddmmss
          e.finishTime = Utils.getYMDHMS(e.finishTime); //将时间戳转为yyyymmddmmss
        } catch (error) {
          console.log(error);
        }

        switch (e.status) {
          case "6":
            e.status = "已完成";
            break;

          default:
            e.status = "未完成";
            break;
        }
        return e;
      });
      this.pagination.total = res.totalRows || 0;
    },
    //表格变化
    tableChange(e) {
      this.pagination = e;
      this.pagination.pageNo = e.current;
      console.log(e);
      this.getckjlListData();
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