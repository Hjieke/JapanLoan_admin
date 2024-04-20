/*
 * @Descripttion: 锡盟
 * @version: 1.0
 * @Author: 吕志辉
 * @Date: 2024-03-15 17:51:11
 * @LastEditors: 吕志辉
 * @LastEditTime: 2024-03-15 18:51:29
 */
import axios from '../base.js';
export default class YWYYindex {
  static async login(account, password) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/index/首页.json`);
      return res;
    } else { //使用接口数据
      let res = await axios.get(`/apiUrl/api/Account/login?account=${account}&password=${password}`);
      return res;
    }
  }
  static async getindexData() {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/index/首页.json`);
      return res.data.data;
    } else { //使用接口数据
      let res = await axios.get(`/apiUrl/api/player/homeStatistics`);
      return res.data.data;
    }
  }
}