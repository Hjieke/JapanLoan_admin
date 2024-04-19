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
          <a-form-item label="状态">
            <a-select
              placeholder="状态"
              v-decorator="[
                'status',
                {
                  rules: [{ required: false, message: '状态' }],
                },
              ]"
            >
              <a-select-option value="0">ALL</a-select-option>
              <a-select-option value="1">审核中</a-select-option>
              <a-select-option value="2">通过</a-select-option>
              <a-select-option value="3">不通过</a-select-option>
            </a-select>
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
      <template slot="rechChannel" slot-scope="text, record">
        {{ record.rechChannel == "MANUAL_RECHARGE" ? "后台充值" : "禁用" }}
      </template>
      <!-- <template slot="createTime" slot-scope="text, record">
        {{ Utils.getYMDHMS(record.createTime) }}
      </template>
      <template slot="finishTime" slot-scope="text, record">
        {{ Utils.getYMDHMS(record.finishTime) }}
      </template> -->
      <template slot="control" slot-scope="text, record">
        <div
          v-if="record.status == '审核中'"
          style="display: flex; align-items: center"
        >
          <a @click="changeStatus(record, true)">通过</a>
          <a-divider type="vertical" />
          <a @click="changeStatus(record, false)">不通过</a>
        </div>
        <a v-else @click="copyContent(text, record)">点击复制</a>
      </template>
    </a-table>
    <audio v-if="openshenheTip" src="/Audio/shenheTip.mp3" autoplay></audio>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Utils from "@/utils/common.js";
export default {
  name: "iphmd",
  data() {
    return {
      openshenheTip: false, //播放提示音
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
      tableData: [
        // {
        //   key: "1766359300449509377",
        //   id: "1766357886503510018",
        //   createTime: "1709967512139",
        //   createUser: "1765348957346619393",
        //   updateTime: "1709967610596",
        //   updateUser: "1741357416760586242",
        //   orgCode: "xg_cm",
        //   playerId: "1765348957346619393",
        //   loginName: "Nguyễn Thị Bích Vân ",
        //   orderNo: "W240309135832139152",
        //   cashMoney: 2000000.0,
        //   fee: 0.0,
        //   bankName: "BIDV",
        //   accountName: "NGUYEN THI BICH VAN",
        //   cardNo: "7020316457",
        //   branch: "",
        //   status: 3,
        //   operatorUser: null,
        //   operatorTime: null,
        //   riskOpruser: null,
        //   riskOprtime: null,
        //   riskStatus: 1,
        //   approveReason: null,
        //   finishUser: "admin",
        //   finishTime: "1709967610592",
        //   policeFlag: null,
        //   ip: "14.161.235.124",
        //   proxyPayStatus: null,
        //   proxyPayDesc: null,
        //   remarks: null,
        //   copyContent:
        //     "提现金额:2000000.0000,卡号:7020316457,银行名称:BIDV,卡主姓名:NGUYEN THI BICH VAN",
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
          title: "取款金额",
          dataIndex: "cashMoney",
        },
        {
          title: "银行名称",
          dataIndex: "bankName",
        },
        {
          title: "开户姓名",
          dataIndex: "accountName",
        },

        {
          title: "申请时间",
          dataIndex: "createTime",
          scopedSlots: { customRender: "createTime" },
        },
        {
          title: "完成时间",
          dataIndex: "finishTime",
          scopedSlots: { customRender: "finishTime" },
        },
        {
          title: "订单状态",
          dataIndex: "status",
        },
        {
          title: "操作",
          dataIndex: "copyContent",
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
      TipTimer: null, //审核提示器
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
  beforeDestroy() {
    clearInterval(this.TipTimer);
  },
  created() {
    this.init();
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
      this.getqkjlTipData();
      clearInterval(this.TipTimer);
      this.TipTimer = setInterval(() => {
        this.getqkjlTipData();
      }, 10 * 1000);
    },
    //获取是否有提示
    async getqkjlTipData() {
      try {
        let bol = await this.$api.YHGL.getqkjlTipData();
        console.log(bol);
        if (bol) {
          this.openshenheTip = true;
          this.$message.success("有待审核需要处理");
          setTimeout(() => {
            this.openshenheTip = false;
          }, 4 * 1000);
        } else {
          this.openshenheTip = false;
          clearInterval(this.TipTimer);
        }
      } catch (error) {
        this.$message.error(error);
        this.openshenheTip = false;
        clearInterval(this.TipTimer);
      }
    },
    //修改状态
    changeStatus(record, isPass) {
      this.editqkjlshzt({
        id: record.id,
        status: isPass,
      });
    },
    //修改状态接口
    editqkjlshzt(param) {
      this.$api.YHGL.editqkjlshzt(param)
        .then((res) => {
          if (res.success) {
            this.$message.success("审核成功");
            this.getqkjlListData();
          } else {
            this.$message.error("审核失败");
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
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
            this.getqkjlListData({
              ...values,
              searchBeginTime: startAt,
              searchEndTime: endAt,
            });
          }
        });
      });
    },
    //表格变化
    tableChange(e) {
      this.pagination = e;
      this.pagination.pageNo = e.current;
      this.getqkjlListData();
    },
    // 复制文本内容方法一
    async copyContent(content, e) {
      console.log(e, content);
      content = `提现金额:${e.cashMoney || 0},卡号:${
        e.cardNo || "--"
      },银行名称:${e.bankName || "--"},卡主姓名:${e.accountName || "--"}`; //拼接需要复制的内容
      // 复制结果
      let copyResult = true;
      // 设置想要复制的文本内容
      const text = content || "复制内容为空哦~";
      // 判断是否支持clipboard方式
      if (!!window.navigator.clipboard) {
        // 利用clipboard将文本写入剪贴板（这是一个异步promise）
        await window.navigator.clipboard
          .writeText(text)
          .then((res) => {
            this.$message.success("复制成功");
            console.log("复制成功");
          })
          .catch((err) => {
            console.log("复制失败使用第二种方案", err);

            this.copyContent2(content);
          });
      } else {
        // 不支持clipboard方式
        // this.$message.error("不支持clipboard方式");
        this.copyContent2(content);
      }
      // 返回复制操作的最终结果
      return copyResult;
    },
    // 复制文本内容方法二
    copyContent2(text) {
      // 复制结果
      let copyResult = true;
      // 创建一个input元素
      let inputDom = document.createElement("textarea");
      // 设置为只读 防止移动端手机上弹出软键盘
      inputDom.setAttribute("readonly", "readonly");
      // 给input元素赋值
      inputDom.value = text;
      // 将创建的input添加到body
      document.body.appendChild(inputDom);
      // 选中input元素的内容
      inputDom.select();
      // 执行浏览器复制命令
      // 复制命令会将当前选中的内容复制到剪切板中（这里就是创建的input标签中的内容）
      // Input要在正常的编辑状态下原生复制方法才会生效
      const result = document.execCommand("copy");
      // 判断是否复制成功
      if (result) {
        console.log("复制成功");
        this.$message.success("复制成功");
      } else {
        console.log("复制失败");
        this.$message.error("复制失败");
        copyResult = false;
      }
      // 复制操作后再将构造的标签 移除
      document.body.removeChild(inputDom);
      // 返回复制操作的最终结果
      return copyResult;
    },
    reset() {},
    getData() {
      this.getqkjlListData();
    },
    async getqkjlListData(param) {
      let res = await this.$api.YHGL.getqkjlListData({
        pageNo: this.pagination.pageNo,
        pageSize: this.pagination.pageSize,
        ...param,
      });
      this.tableData = res.rows.map((e) => {
        e.key = e.id;
        e.createTime = Utils.getYMDHMS(e.createTime); //将时间戳转为yyyymmddmmss
        e.finishTime = Utils.getYMDHMS(e.finishTime); //将时间戳转为yyyymmddmmss
        e.bankName = `银行卡号:${e.cardNo},开户行:${e.bankName}`;
        switch (e.status) {
          case "0":
            e.status = "ALL";
            break;

          case "1":
            e.status = "审核中";
            break;
          case "2":
            e.status = "通过";
            break;
          case "3":
            e.status = "不通过";
            break;
          default:
            break;
        }
        return e;
      });
      this.pagination.total = res.totalRows || 0;
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