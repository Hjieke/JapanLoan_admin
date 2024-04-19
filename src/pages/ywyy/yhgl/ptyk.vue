<template>
  <div>
    <a-form class="ant-advanced-search-form" :form="searchform">
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="转账时间">
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
        <a-col :span="12">
          <a-button type="primary" @click="ToSearch">查询</a-button>
        </a-col>
      </a-row>
      <!-- <a-row :gutter="24" class="ykrow">
        <a-col :span="24" class="zyk"> 总盈亏: </a-col>
      </a-row>
      <a-row :gutter="24" class="ykrow">
        <a-col :span="12" class="ztz"> 总投注: </a-col>
        <a-col :span="12" class="zzj"> 总中奖: </a-col>
      </a-row> -->
      <a-row :gutter="24" class="ykrow">
        <a-col :span="12" class="zcz"> 总充值: {{ info.recharge }}</a-col>
        <a-col :span="12" class="ztx"> 总提现: {{ info.withdraw }}</a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Utils from "@/utils/common.js";
export default {
  name: "iphmd",
  data() {
    return {
      info: {
        id: null,
        profit: "--",
        profitAndLoss: "--",
        betAmount: "--",
        withdraw: "--",
        recharge: "--",
        create_time: null,
      },
      //时间选择配置
      rangeConfig: {
        rules: [
          { type: "array", required: true, message: "Please select time!" },
        ],
      },
      searchform: this.$form.createForm(this, { nickName: "昵称" }), //搜索表单
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
      if (to.path.includes("qkjl")) {
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
            this.profitAndLoss({
              searchBeginTime: startAt,
              searchEndTime: endAt,
            });
          }
        });
      });
    },
    reset() {},
    getData() {
      this.profitAndLoss();
    },
    async profitAndLoss(params) {
      this.info = await this.$api.YHGL.profitAndLoss(params);
      console.log(this.info);
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