<template>
  <div>
    <a-form class="ant-advanced-search-form" :form="searchform">
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="转账时间">
            <a-range-picker show-time format="YYYY-MM-DD HH:mm:ss" />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="登录账号">
            <a-input placeholder="登录账号" />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-button type="primary">查询</a-button>
        </a-col>
      </a-row>
    </a-form>
    <a-table
      class="iphmdTable"
      :row-selection="rowSelection"
      :columns="columnsData"
      :data-source="tableData"
      :pagination="pagination"
    >
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
      pagination: {
        showTotal: (total, range) =>
          `rows:${range[0]}-${range[1]} total: ${total}`,
        pageSizeOptions: ["10", "20", "30", "40", "50"],
        showSizeChanger: true,
      }, //分页器配置对象
      tableData: [
        {
          key: "1766359300449509377",
        },
      ],
      columnsData: [
        // {
        //   title: "Org",
        //   dataIndex: "orgCode",
        // },
        {
          title: "登录账号",
          dataIndex: "loginName",
        },
        {
          title: "昵称",
          dataIndex: "orderNo",
        },
        {
          title: "投注",
          dataIndex: "cashMoney",
        },
        {
          title: "中奖",
          dataIndex: "bankName",
        },
        {
          title: "盈亏",
          dataIndex: "accountName",
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
    // this.getData();
  },
  watch: {
    $route(to, from) {
      console.log("路由变化", to.path);
      if (to.path.includes("wjyk")) {
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
    reset() {},
    getData() {
      this.getqkjlListData();
    },
    async getqkjlListData() {
      let res = await this.$api.YHGL.getqkjlListData();
      this.tableData = res.map((e) => {
        e.key = e.id;
        e.createTime = Utils.getYMDHMS(e.createTime); //将时间戳转为yyyymmddmmss
        e.finishTime = Utils.getYMDHMS(e.finishTime); //将时间戳转为yyyymmddmmss
        e.bankName = `银行卡号:${e.cardNo},开户行:${e.bankName}`;
        switch (e.status) {
          case 6:
            e.status = "通过";
            break;

          default:
            e.status = "不通过";
            break;
        }
        return e;
      });
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
.ykrow {
  height: 60px;
  line-height: 60px;
  font-size: 15px;
  font-weight: bold;
}
.zyk {
  background: rgb(19, 194, 194);
}
.ztz {
  background: rgb(204, 204, 204);
}
.zcz {
  background: cornsilk;
}
.zzj {
  background: rgb(214, 214, 214);
}
.ztx {
  background: blanchedalmond;
}
</style>