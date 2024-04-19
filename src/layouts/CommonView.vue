<template>
  <router-view></router-view>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CommonView",
  data() {
    return {};
  },
  computed: {
    ...mapState(),
  },
  methods: {},
};
</script>

<style scoped lang="less">
</style>