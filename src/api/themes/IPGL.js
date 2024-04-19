import axios from '../base.js';
import Util from '@/utils/common.js';
export default class IPGL {
  //获取ip黑名单数据
  static async getIpHmdData(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/ipgl/ip黑名单.json`);
      return res.data.data.rows;
    } else { //使用接口数据
      let res = await axios.get(`/apiUrl/api/accountIpBlack/page` + Util.getParams(params));
      return res.data;
    }
  }
  //添加ip黑名单数据
  static async addIpHmdData(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/ipgl/ip黑名单.json`);
      return res.data.data.rows;
    } else { //使用接口数据
      let res = await axios.post(`/apiUrl/api/accountIpBlack/add` + Util.getParams(params));
      return res.data;
    }
  }
  //编辑ip黑名单数据
  static async editIpHmdData(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/ipgl/ip黑名单.json`);
      return res.data.data.rows;
    } else { //使用接口数据
      let res = await axios.post(`/apiUrl/api/accountIpBlack/edit`,params);
      return res.data;
    }
  }
  //删除ip黑名单数据
  static async delIpHmdData(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/ipgl/ip黑名单.json`);
      return res.data.data.rows;
    } else { //使用接口数据
      let res = await axios.post(`/apiUrl/api/accountIpBlack/delete` , params);
      return res.data;
    }
  }
}