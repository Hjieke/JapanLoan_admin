<template>
  <div>

    <a-form class="ant-advanced-search-form" :form="searchform">
      <a-row :gutter="24">

        <a-col :span="6">
          <a-form-item label="申请用户名">
            <a-input placeholder="登录账号" v-decorator="[
              'account',
              {
                rules: [{ required: false, message: '用户名' }],
              },
            ]" />
          </a-form-item>
        </a-col>

      </a-row>
    </a-form>
    <div class="table-operator">
      <a-button type="primary" @click="ToSearch">查询</a-button>
      &nbsp;&nbsp; &nbsp;&nbsp;
      <a-button @click="reset">重置</a-button>
    </div>


    <a-modal title="编辑" :visible="editvisible" :confirm-loading="addconfirmLoading" @ok="edit_HandleSubmit"
      @cancel="edit_handleCancel" okText="ok" width="900px" cancelText="cancel">
      <a-form :form="editform" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="edit_HandleSubmit">

        <a-form-item label="id" hidden>
          <a-input placeholder="id" v-decorator="[
            'id',
            {
              rules: [{ required: false, message: 'id' }],
            },
          ]" />
        </a-form-item>
        <a-form-item label="申请用户名">


          <a-input placeholder="申请用户名" readonly v-decorator="[
            'account',
            {
              rules: [{ required: false, message: '申请用户名' }],
            },
          ]" />
        </a-form-item>


        <a-form-item label="状态">
          <a-select v-model="selectedStatus" placeholder="请选择状态" @change="handleChange" style="width: 400px;">
            <a-select-option v-for="status in selected_data" :key="status.status" :value="status.status">
              {{ status.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>


    <a-table class="iphmdTable" :row-selection="rowSelection" :columns="columnsData.filter(column => column.visible)"
      :data-source="tableData" @change="tableChange" :pagination="pagination">
      <template slot="avatar" slot-scope="text, record">
        <img height="30px" :src="record.avatar" alt="" />
      </template>
      <template slot="status" slot-scope="text, record">
        {{ record.status == 1 ? "启用" : "禁用" }}
      </template>

      <template slot="ti_xian_status" slot-scope="text, record">
        {{ record.ti_xian_status == 1 ? "启用" : "禁用" }}
      </template>

      <template slot="tou_zhu_status" slot-scope="text, record">
        {{ record.tou_zhu_status == 1 ? "启用" : "禁用" }}
      </template>
      <template slot="lotteryType" slot-scope="text, record">
        {{ getType(record) || "-" }}
      </template>

      <template slot="pdf_url" slot-scope="text, record">
        <a @click="viewHandle(record)">查看</a>
      </template>

      <template slot="number" slot-scope="text, record">
        <div class="number bg-border-style" :class="'bg-border-' + getBgColor(text, record)"
          style="width: 50px; height: 50px">
          <span class="span1">{{ text.number || 0 }}</span><span class="span2">{{ text.wuXing || "-" }}/{{
            text.shengXiao || "-" }}</span>
        </div>
      </template>

      <template slot="control" slot-scope="text, record">
        <a @click="editHandle(record)">编辑</a>

      </template>
    </a-table>
  </div>
</template>

<script>
import { mapState } from "vuex";


export default {
  name: "iphmd",
  data() {
    return {

      selected_data: [],

      xjlsLoginName: "", //资金流水唯一标识
      //会员详情信息


      addform: this.$form.createForm(this, {
        account: "登录账号",
        nick_name: "昵称",
        sex: 1,
        email: "邮箱",
        password: "登录密码",
        status: 1,
      }), //新增表单
      //上下分表单信息
      sxfvisible: false, //是否展示上下分弹窗
      sxfconfirmLoading: false, //是否展示上下分加载
      sxfform: this.$form.createForm(this, {
        // account: "登录账号",
        // nick_name: "昵称",
        // sex: 1,
        // email: "邮箱",
        // password: "登录密码",
        // status: 1,
      }),
      pwdform: this.$form.createForm(this, {
        // account: "登录账号",
        // nick_name: "昵称",
        // sex: 1,
        // email: "邮箱",
        // password: "登录密码",
        // status: 1,
      }),
      selectedStatus: "",
      editvisible: false, //是否展示编辑弹窗
      editconfirmLoading: false, //是否展示编辑加载
      editform: this.$form.createForm(this, { nick_name: "昵称" }), //新增表单
      searchform: this.$form.createForm(this, {}), //搜索表单
      tableData: [

      ],
      addyear: "",
      columnsData: [
        {
          title: "id",
          dataIndex: "id",
          visible: false,
        },
        {
          title: "申请用户名",
          dataIndex: "account", visible: true,
        },
        {
          title: "申请时间",
          dataIndex: "com_date", visible: true,
        },
        {
          title: "申请金额",
          dataIndex: "money", visible: true,
        },
        {
          title: "申请周期",
          dataIndex: "month", visible: true,
        },
        {
          title: "合同详情",
          dataIndex: "pdf_url",
          key: 'pdf_url',
          scopedSlots: { customRender: 'pdf_url' }, visible: true,
        },
        {
          title: "审核状态",
          dataIndex: "he_content", visible: true,
        },
        {
          title: "合同时间",
          dataIndex: "create_time", visible: true,

        },
        {
          title: "操作",
          dataIndex: "control",
          scopedSlots: { customRender: "control" }, visible: true,
        },],


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

      //是否展示年选中
      isOpen: false,
    };
  },
  components: {

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
      if (to.path.includes("wjgl")) {
        console.log("当前路由", to.path);
        this.init();
      }
    },
  },
  methods: {
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
            this.getwjglListData(values);
          }
        });
      });
    },
    viewHandle(record) {
      if (record.pdf_url != "") {
        window.open(record.pdf_url, '_blank');

      }
      // 处理查看操作，例如打开一个对话框或者导航到一个详细页面
      console.log('查看详情:', record);
    },
    editHandle(e) {
      console.log(e, 'test')
      this.editvisible = true; //展示编辑弹窗
      this.$nextTick(() => {
        // 数据填入
        this.editform.setFieldsValue({
          id: e.id,
          account: e.account,
        })
        this.selectedStatus = e.he_content;
        // 给下拉菜单赋值
      });
    },

    async set_shenHe_status(id) {
      let res = await this.$api.YHGL.setShenheSataus(
        {
          contractId: id,
          status: this.selectedStatus
        }
      );
      this.$message.success("修改成功");

      this.editvisible = false;

      this.getwjglListData();
    },

    edit_HandleSubmit(e) {
      e.preventDefault();
      this.editform.validateFields((err, values) => {
        if (!err) {
          console.log(values.id);
          this.set_shenHe_status(values.id);
        }
      });

    },
    handleChange(value) {
      this.selectedStatus = value; // 确保更新选中的状态
    },

    edit_handleCancel() {
      this.editvisible = false;
    },


    reject(key, status) {
      // 找到数据项
      this.updateStatus(key, status)
    },


    onChangeTimer(e) {
      console.log(e);
    },

    //初始化
    init() {
      this.getData();
    },


    //表格变化
    tableChange(e) {
      this.pagination = e;
      this.pagination.pageNo = e.current;
      console.log(e);
      this.getwjglListData();
    },
    getData() {
      this.getwjglListData();
    },
    async getwjglListData(param) {
      let res = await this.$api.YHGL.GetMoney_Card({
        pageNo: this.pagination.pageNo,
        pageSize: this.pagination.pageSize,
        // lotteryType: 3,
        // lotteryStatus: 3,
        // year: 2024,
        // sort: 1,
        ...param,
      });
      console.log(res);

      let res1 = await this.$api.YHGL.get_shen_list({
        pageNo: 1,
        pageSize: 100,
      })
      console.log(res1, 'test')

      this.selected_data = res1.rows;

      this.tableData = res.rows.map((e, index) => {
        try {
          e.key = e.id;

          return e;
        } catch (error) {

          return e;
        }
      });
      this.pagination.total = res.totalRows || 10;
    },
    gethe_status(he_status) {
      const statusMap = {
        "0": '待审核',
        "1": '通过',
        "2": '驳回',

      };
      return statusMap[he_status] || '未知状态';
    },
    showAddModal() {
      this.addvisible = true;
      this.numberList = [
        {
          number: "01",
          shengXiao: "",
          wuXing: "",
        },
        {
          number: "01",
          shengXiao: "",
          wuXing: "",
        },
        {
          number: "01",
          shengXiao: "",
          wuXing: "",
        },
        {
          number: "01",
          shengXiao: "",
          wuXing: "",
        },
        {
          number: "01",
          shengXiao: "",
          wuXing: "",
        },
        {
          number: "01",
          shengXiao: "",
          wuXing: "",
        },
        {
          number: "01",
          shengXiao: "",
          wuXing: "",
        },
      ];
    },
    handleOk(e) {
      this.confirmLoading = true;
      setTimeout(() => {
        this.addvisible = false;
        this.addconfirmLoading = false;
      }, 2000);
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

.bg-border-green {
  background: url(data:image/png;base64,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) no-repeat;
}

.bg-border-red {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAMAAABGS8AGAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAnZQTFRFAAAA/zMz/zMz/zMz/zMz/zMz/zMz/zMz/zMz/zMz/zMz/zMz/zMz/zMz/zMz/zMz/zMz/zMz/zIy/zMz/zMz/zMz/zMz/zIy/zMz/zMz/zMz/zMz/zMz/zMz/zMz/zMz/zMz/zMz/zMz/zMz/zMz/zMz/zMz/zMz/zU1/zs7/0BA/0ND/zQ0/zMz/zAw/zMz/zMz/1hY/3x8/6Cg/8fH/+Hh/+rq/+/v//Ly//Hx/8bG/6Gh/3p6/zMz/zMz/zMz/zMz/0pK/66u/97e//39//////z8/3t7/0tL/zMz/zMz/zMz/zMz/1xc/7Ky/+7u/+3t/7Gx/1pa/zMz/zMz/zMz/3Bw/8zM//7+/87O/21t/zMz/zMz/1NT/8jI/1BQ/zMz/zMz/zo6//r6/zMz/zMz/1ZW/9nZ/9jY/1VV/35+//X1//b2/zc3/5ub//f3//j4/5yc/zg4/zY2/6qq/6am/zMz/6en/5qa/zMz/3Z2//Pz/1dX/zk5/9ra/19f/zMz/729/zMz/3Fx/2pq/83N/zMz/0JC/3l5/7q6/v7+/+Xl/z4+/zMz/2Rk/4mJ/8DA/9PT/+fn/z09/+np/0FB/9TU/8XF/7+//4iI/1lZ//n5/z8//93d/7u7/zIy/zEx/9HR/2tr/8nJ/7y8/09P/11d/6Ki/0VF/5eX/4qK/0ZG/zw8/9fX/5mZ/8/P/zMz//T0/1RU/3Nz/3V1/5CQ/3Jy/52d/6Oj/6io/7S0/zMz/2Ji/1tb/zMz/zIy/+zs/7i4/6Sk/0hI/4OD/6+v/25u/9DQ/2dn/62t/2lp/+bm/5GR/+Li/5OT/zQ0/zQ0/4yMZk/kBgAAANJ0Uk5TAAcuWYu2z+Lv+f/w4bSMWi0GAzdyt/YEBD3oAxdqxcBrDnjd/twNcf//////CAA7zP///////////////8sUgvX///////////SAKMb///////8pZfH//////4H8////CaX//wqx/////////////////////2T//xX///////9c/+D////E////////OP//////////////////////Lgf////////////////////B/////////////97//10H////////////////////CQr/OEDjnwAABbVJREFUeJy1mflfE0cYhxeQawkJ912FcIUQbgNaTiEbJYLYIgVKoAJi5YgFIoJaz1rB0nLbetXW1lrbWqutbbVae9r7sP9RZ3azuzObTfaC7y87M9l5Mp9335l55x2CkFRAYNC64JDQsHCSDI/QhUTqDVHR0r0kFBMbF59AeikhPi42UT01KVmf4g1llaJPTlWFTXtqvchYsXFvSE9TjM0wZmb5x0JlZRtzFGEDckPR/qY8c36+Oc8ixtblFsjGFhYVc/3MJaVlG63lFZs2V5Rbn66sKjF7oauLCuVxa2rrmB6WLVX1DTYKk72hfus2wdAbHTVyuNubPO8372ihRLXzmWcFg25qlTbDrjbm3efabeJYqI7O53FyW5AEN6nLSb/YvdE3lVHPCxjZ6Ujyx93dS7/VV2mX4lJUf1kehu7d7Zu7Z4B+Ze+L0liofYMYeWCPz/HSXNPQsDwuRY0MYf4x4GPMSbQdXPtfksulqNGxccwa4nZ2wN/cB/w4g7fsEy6U3CU2VQ5Cf3Ad6FDCBZo0ob6xy5vbCv3XNKZovLSmMH/eLuQeoufbkAL7srIfxuagYHYXdsHWQdn+gOrIyyi5FjdzUSNoO3pMDZeijrkRcF0Ryi2ohm1l6rjAzKg7Fwcg4FzY0i1jHotr9DhqjBM8N0cHG3rUcinqJDpPTmVwYCOsv6KeS9lOo0M2sty0bFh9VQOYakeHnMnu3elwP25WPjUQ2ZsRcFY6w009AyqWHVq4FFWP2mI9sxglw7hki4/9Ta4qphFwQjIN1sNylTYuRc2gQ9ZDbiIdn9VrBZ9FwSkxABwLS+YGf51ekwGefR0lvwHAcbBQosknoPrnUHAcAMfDQqlWLkXNo+B4goimY9VK7eBJFJwQQETRBcn4RFoLKJgMJAzwYbJqBy9i4CDGi/PKtYOt6K4KPDmY9rYK7eClZRQcTITAR/4m7eCVcyg4hNCtDTiUiFgbU4QR4Wvz8cIJ+mFZBXd7E3M3kgGTb2kHnxeAaVOs+pQGpgijn5rXeYq6gIEjCOYIelF1sMLqErZskjpmgpCX3+bekLOqiwhf6MEEiWQK/NakEnwF/3aRzCJEklvV4XjN4GA9EcQUtu3Uxm2ZxsEG4h2msKoBC1AU8a4njXJRExcLsYASoj2bKVC7FvBVNw6OZ7d/oPe0DPg0zqW3/1i28r568DWXABwLwDFsCuyDfrXc4esCbkoiFxRCfagWPEUvxTdKP/r4E4ak58NYqJufquPu6wOdzbeWwGn5M/ovPGFs6m12yIMjarh3PgfT4ItZpkKfnzakIkcFWkOjyrn2uyQ5/iX7fb4i+aMCkZbJgi1jipdP29ck2XeP6waPv9lcYtLIfc7xSaXg+8Cq97gguALamDuOERl8wtE1oWy898GUm+fr3wDEAyTdmcu7oGlKQQxuHwMjfMibz/YtIDxCztLf8clMkjx8RC73DkxV3Pyeb/gB1KuxJGpRHULeKzO9wKTHfuQbRn4iyUYsrUAU1qIz0r1fhtsN3zoK3+1GFoKfQd0hyDfVNKFky/FrEkkn28nrTEj1mG977PZO3XiSTbxcv3T6cWn7r7951jM3f6K9CvbpNpG0rMFJ4ujmeh8xaMvvzdy6/gfX2nmDJJ1iSVkm34RpeubKrGAtvfTn2Rl03/zL097RAxc2hwiXTUEKdHlufmJh0bq0srL09+L5iQtzeFxC/uP5v0nY7iMF6Umaism0PH1u2ST2y0Oaa70Lfxz4V5xLEE98kn3rv/LNCzN0MD/wxBeXS0yrUq/P8dJ2djilEWJydvlNpQMdbJOmeKvNIH0X0tokzRFKxnUF0KGuRmXYulpZFyzwSqhaCbdY7pUQUMGjB3Kxp04ESPMQ5Riz5Vy7ZRozpFkCpaWfkboovK3iohAqdW2uNmkl+r6MjVFP9Sg6yqAPDtFFwOvjsNCQyHVBgTK+1/+eafumGR6FcAAAAABJRU5ErkJggg==) no-repeat;
}

.bg-border-blue {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAMAAABGS8AGAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAvRQTFRFAAAAM5n/M5n/M5n/M5n/M5n/M5n/M5n/M5n/M5n/M5n/M5n/M5n/M5n/M5n/M5n/M5n/M5r/Mpj/M5n/M5n/M5n/M5n/Mpj/M5r/M5n/M5n/M5v/M5n/M5n/M5n/M5n/M5n/M5r/M5n/M5n/M5n/M5n/M5n/M5n/NZr/O53/QKD/Q6H/QJ//NJr/M5n/MJf/M5n/M5n/WKz/fL3/oND/x+P/4fD/6vT/7/f/8vj/8fj/xuL/odD/erz/M5n/M5n/M5n/M5n/NJn/SqX/er3/rtf/3u7//f7//////P7/rtb/e73/S6X/M5n/M5n/M5n/M5n/XK3/stj/7vb/7fb/sdj/Wq3/M5n/MJ//M5n/M5n/cLj/zOb//v//zub/bbb/M5n/M5n/U6n/yOT/UKf/M5r/M5n/Op3/+vz/oM//M5r/M5n/Vqr/2ez/2Ov/Var/fr7/9fr/9vv/N5v/m83/9/v/+Pv/nM7/OJv/Npv/qtX//P3/ptP/M5n//v7/p9P/nM3/msz/M5n/drr/8/n/V6v/OZz/2uz/Npr/ms3/+Pz/X6//M5n/vd7/M5n/M5n/cbj/arX/zeb/XK7/M5r/M5n/M5v/QqD/ebz/Mpf/ut3/5fL/Pp//M5n/WKv/ZLL/icT/M5f/M5r/wOD/0+n/5/P/PZ7/6fT/QaD/6vX/1On/xeL/v9//iMP/Waz/+fz/ZLH/P5//3e7/Pp7/u93/7vf/Mpn/stn/MZf/0ej/a7X/arT/yeT/vN7/T6f/+v3/Xa7/otD/RaL/l8v/isT/RqL/PJ3/1+v/Opz/mcz/z+f/M5n/9Pr/VKr/c7n/M5n/dbr/OJz/kMj/crn/nc7/o9H/qNP/ptL/tNn/M5n/YrH/W63/M5n/Mpn/9Pn/PJ7/7Pb/uNz/Vqv/2u3/2Oz/pNH/SKT/g8H/r9f/brb/zuf/0Oj/Z7P/rdb/abT/5vL/kcj/yOP/RqP/4vD/k8n/M5n/YrD/NJn/NJj/jMb/M5n/M5j/gnuVFAAAAPx0Uk5TAAcuWYu2z+Lv+f/w4bSMWi0GAzdyt/YEBD3oAxdqxcBrDnjd/twNcf///////wgAO8z////////////////LFIL1///////////////0gCjG////////KQBl8f//////gfz///8Jpf///wqx//////////////////////9k/////xX///////////9c/+AO/////wPEBP//BP///zj///8GB/////////////////////////8u/wf////////////////////////B////A////////////97//10H//////////////////////////////8J/wkK/wQHzGymjgAABdVJREFUeJy12XlcFFUAB/ABZIEBFuQSiJSWa7lBEtCQS2FnURDMAgkKMAndkstEBMMrxZMKDRQLjMvKI0sqK8vs0qywQ8uy+zK7b6t/eu/NHu/NzjKX/v7Zmbcz332ft29m3rxHUYKxs3cY56hycnahaRdXN5W72sNzvPBZAvHy9vH1o63i5+vjPUG+6h+gDrRGTQlUB1wliw26eiJPXYl6TwoOksxeowkJHZuFCQ3ThEti7SKc8PO1kVHR0TGRsXy2W0ScaDY+IdF8XszkpGunJKekTp2WmpJ8Xdr0yTFWdHpCvDg3IzOLPSN7xsycXB1DRJ+bN2s2p+r5BRli3DmFxuOL5l7P8GbeDTdyKl1YLMiWzC9lj72pTMfPwpTffAsplzoIuP4VlejAqim2VTYLbiXkygL/sdyF1eio29L0Qi7D1CyKJOjqhbbdxQZ0yO13CLMwS2oJ2bDYZn2Rq62rF+cyTEMd0T8MNursj9qhcemdYl2GWda0nGgN/nYugN81rxijM1inpbURlytKeNyVsD80rrhLigvSpsX7xnxrtxj2X+0qSfVFWU305zlcdw263uoktK8p+rXENci5uuMrYGmt6P6AZ93duJxJ3pES8kHZ+g1yXIbZ0I7BWQm4G5cOyxbJcxlmYzYmJ9phcAQsqRJxHfNn02a8MbZY3HA3WLBArsswW/HrZFuHGdbA/Xvku4zuXrzKGpMbFAZ371MAM2V4lUNMz+5g+Dwukn5pYGnpxODQYNbdvgPsZM9V4jJMHt4WE+9HcAAcl8yw8XwTm9QuDPYLQLAabs9U5jJMN15lNXR3ovFZnlJ4Fw4HegHYG27F5CqFe3bj8gMA9oEbDyrqEzA1vTjsA2BfuJGk1GWYPhz2pag9aKyaphxuw2G/hyhPtCE4PhFOPw7T9pQH/NAmK4cHCNiB7cWRKcrhZPypCnqyI/yISlUODw7hsCOlgh/RU5XDw3txWEW5XRnYiXK9Mk3hTLmgP+9h5TD557lQ6CP2MnS3R4juRrMw/ahyeB8HRk1x2S9p0BTO6HO6cng/AbtS7CvogRal7sHHCNiNvUDoQ48rhXueIGAV5c5uKH40HSb/O3f2JkTTs5TC3SSsphzYjdnzlLkjXSTsQT3JbsQ+pQzOIV3ak3raOI1yQJGr7yRdv/HGhylImRL4SDsJ+5oe/yDPKKnws5yW8DENWGCekw8fbeTA3gD2Mk2BPf+CXLf+GMcNnGAeFMK8KBdejW7Fx5NeevkVVlJbhrEwr74mz11yApwcdXKwnGFeRz9hHMZuP2Wqcm2DHPeNN8G4/a0edge9P00axV4VUOqWSXf1p2n67XdqjHvv0pZXBSooxATHNkm+fereo+kTZ8ynwdffMPPEpMb8dy5vkwqfBa16xjwIToVtbH4dozosE46N70ur71lwyfVZ9j8AxDlsujPC0gW1GyWMwfVNoIYfWppP9xEQzmPv0h9bJjNpeu06se4ncKri088sBZ+D/XRiEjUhC5O/+FKc+xWaHvvaUtDwDU3nE9MKVHwmfkU2L90kzNafXA+PrcJuBN+C/QLO1GxGIS5nbz4qMOmk23qMHVJdsJRdaLaeujFONlnS+N3FMbq0/vsfjPez9hFz4RHwQlbKMy3rUUmTdFGOjTHoyI+dzaajfjKXXjxO05V8k7IlFTQ3Xd2He2pI9ODPu7rx5+YvxvLyX3+DDczjmqYgOTnU29faP5A8ODw8+PvAvtb9vbvJ7/8w/l4bLLcxBUn9aeCRUbRDXXuHtHzf/IXc5NPwS8Pf/C5FXbIp284/KdP6u9Fg3nDJlgvqzNcaIlNts76onQsqhQm+VFb8O5YLsrJUWLFOqQffBC+Z4kJhhxsRyxUgayrypbFZmaIWWOCSULoUN1HskhBI3PlzYtltW+yEPSzhmjAxy24hmg5hi5Og4B1CC4WnZCwUwowKLW2OymJRdtpejPWSrxqzx9ND7ahyc4XLx85OKvdxDvb/CZ/1P/5sT33gPoXFAAAAAElFTkSuQmCC) no-repeat;
}

.bg-border-white {
  background: #fff;
}

.number {
  background-size: 100% 100%;
}

.bg-border-style {
  width: 44px;
  height: 44px;
  background-size: contain;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 6px;
}

.bg-border-style .span1 {
  font-style: normal;
  font-weight: 700;
  line-height: 40px;
  color: #000;
  font-size: 22px;
}

.bg-border-style .span2 {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  background: transparent;
  font-size: 13px;
  color: #666;
  margin-top: 5px;
}
</style>