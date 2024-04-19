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
          <a-form-item label="转账类型">
            <a-select
              placeholder="请选择"
              v-decorator="[
                'transType',
                {
                  rules: [{ required: false, message: '转账类型' }],
                },
              ]"
            >
              <a-select-option value="DESPOSIT">存款</a-select-option>
              <a-select-option value="WITHDRAW">提款</a-select-option>
              <a-select-option value="WITHDRAW_FAIL">提款失败</a-select-option>
              <a-select-option value="BET">彩票下注</a-select-option>
              <a-select-option value="REVOKE_BET">彩票撤单返款</a-select-option>
              <a-select-option value="PRIZE">彩票派彩</a-select-option>
              <a-select-option value="REVOKE_PRIZE"
                >彩票撤销派奖</a-select-option
              >
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
        <a @click="copyContent(text, record)">点击复制</a>
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
        pageSize: 10,
        total: 10,
        pageNo: 1,
      }, //分页器配置对象
      tableData: [
        // {
        //   key: "1766359300449509377",
        //   id: "1766469866744717313",
        //   createTime: "1709994210311",
        //   createUser: "1764265035846148097",
        //   updateTime: "1709994210311",
        //   updateUser: "1764265035846148097",
        //   orgCode: "xg_cm",
        //   playerId: "1764265035846148097",
        //   loginName: "0972022938",
        //   transType: "DESPOSIT",
        //   optType: "ADD",
        //   beforeAmount: 110000000.0,
        //   amount: 68000000.0,
        //   afterAmount: 178000000.0,
        //   refOrderNo: "D240309212330310112",
        //   remarks: null,
        //   content: null,
        //   tableIndex: 149,
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
          title: "账变类型",
          dataIndex: "transType",
        },
        {
          title: "操作类型",
          dataIndex: "optType",
        },
        {
          title: "前余额",
          dataIndex: "beforeAmount",
        },
        {
          title: "余额",
          dataIndex: "amount",
        },
        {
          title: "后余额",
          dataIndex: "afterAmount",
        },

        {
          title: "关联订单号",
          dataIndex: "refOrderNo",
        },
        {
          title: "内容",
          dataIndex: "content",
        },
        {
          title: "备注",
          dataIndex: "remarks",
        },
        {
          title: "账变时间",
          dataIndex: "createTime",
        },
        {
          title: "操作人",
          dataIndex: "updateUser",
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
      if (to.path.includes("zjls")) {
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
            this.getzjlsListData({
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
      this.getzjlsListData();
    },
    // 复制文本内容方法一
    async copyContent(content, e) {
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
      this.getzjlsListData();
    },
    async getzjlsListData(param) {
      let res = await this.$api.YHGL.getzjlsListData({
        pageNo: this.pagination.pageNo,
        pageSize: this.pagination.pageSize,
        ...param,
      });
      this.tableData = res.rows.map((e) => {
        e.key = e.id;
        e.createTime = Utils.getYMDHMS(e.createTime); //将时间戳转为yyyymmddmmss
        switch (e.transType) {
          case "DESPOSIT":
            e.transType = "存款";
            break;
          case "WITHDRAW":
            e.transType = "提款";
            break;
          case "WITHDRAW_FAIL":
            e.transType = "提款失败";
            break;
          case "BET":
            e.transType = "彩票下注";
            break;
          case "REVOKE_BET":
            e.transType = "彩票撤单返款";
            break;
          case "PRIZE":
            e.transType = "彩票派彩";
            break;
          case "REVOKE_PRIZE":
            e.transType = "彩票撤销派奖";
            break;
          default:
            e.transType = "";
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