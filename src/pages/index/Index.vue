<template>
  <a-row>
    <div class="table-operator">
      <a-button type="primary">充值待审核({{ info.depositCounts }})</a-button>
      &nbsp;&nbsp;
      <a-button type="primary">提现待审核({{ info.withdrawCounts }})</a-button>
      &nbsp;&nbsp;
      <a-button type="primary" @click="getTo">获取</a-button>
    </div>
    <div style="background-color: #ececec; padding: 20px" class="userinfo">
      <a-row :gutter="16">
        <a-col :span="6">
          <a-card class="userCard" title="会员总数" :bordered="false">
            <p>{{ info.playerCounts || 0 }}</p>
            <div class="ic">
              <a-tooltip>
                <template slot="title">指标说明</template>
                <a-icon type="exclamation-circle" />
              </a-tooltip>
            </div>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card class="userCard" title="余额总额" :bordered="false">
            <p>{{ info.balanceTotal || 0 }}</p>
            <div class="ic">
              <a-tooltip>
                <template slot="title">指标说明</template>
                <a-icon type="exclamation-circle" />
              </a-tooltip>
            </div>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card class="userCard" title="今日充值" :bordered="false">
            <p>{{ info.depositAmount || 0 }}</p>
            <div class="ic">
              <a-tooltip>
                <template slot="title">指标说明</template>
                <a-icon type="exclamation-circle" />
              </a-tooltip>
            </div>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card class="userCard" title="今日提现" :bordered="false">
            <p>{{ info.withdrawAmount || 0 }}</p>
            <div class="ic">
              <a-tooltip>
                <template slot="title">指标说明</template>
                <a-icon type="exclamation-circle" />
              </a-tooltip>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </a-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Demo",
  data() {
    return {
      info: {
        depositCounts: 0,
        withdrawCounts: 0,
        playerCounts: 0,
        balanceTotal: 0,
        depositAmount: 0,
        withdrawAmount: 0,
      },
    };
  },
  created() {
    this.getData();
  },
  computed: {
    ...mapState(),
  },
  methods: {
    getTo() {
      // this.$router.push({path:"xxx"})
    },
    async getData() {
      this.info = await this.$api.YWYYindex.getindexData();
    },
  },
};
</script>

<style scoped lang="less">
.userinfo {
  .userCard {
    position: relative;
    .ic {
      position: absolute;
      right: 30px;
      top: 10px;
    }
    p {
      font-size: 30px;
    }
  }
}
</style>