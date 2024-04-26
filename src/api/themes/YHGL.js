import axios from '../base.js';
import Util from '@/utils/common.js';
export default class YHGL {

  //获取用户信息
  static async getwjglListData(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家管理.json`);
      return res.data.data;
    } else { //使用接口数据
      let res = await axios.get(`/apiUrl/api/Account/page` + Util.getParams(params));
      return res.data.data;
    }
  }
  static async ti_xian_page(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家管理.json`);
      return res.data.data;
    } else { //使用接口数据
      let res = await axios.get(`/apiUrl/api/Index/qu_xian_page` + Util.getParams(params));
      return res.data.data;
    }
  }


  static async ip_fangwen_page(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家管理.json`);
      return res.data.data;
    } else { //使用接口数据
      let res = await axios.post(`/apiUrl/api/Announcement/IpSelect`,params);
      return res.data.data;
    }
  }

  // change_user_pws

  // Account/set_money_pwd?userId=1&password=2
  static async change_user_pwd(userId, user_pwd) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家管理.json`);
      return res.data.data;
    } else { //使用接口数据
      let res = await axios.get(`/apiUrl/api/Account/set_money_pwd?userId=${userId}&password=${user_pwd}`);
      return res.data;
    }
  }

  static async update_bank(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家管理.json`);
      return res.data.data;
    } else { //使用接口数据
      let res = await axios.post(`/apiUrl/api/Account/Edit_bank`, params);
      return res.data.data;
    }
  }

  static async pwdEdit(userId, user_pwd) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家管理.json`);
      return res.data.data;
    } else { //使用接口数据
      let res = await axios.get(`/apiUrl/api/Account/update_pwd?userId=${userId}&pwd=${user_pwd}`);
      return res.data;
    }
  }
  // change_user_money

  static async change_user_money(userId, user_money) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家管理.json`);
      return res.data.data;
    } else { //使用接口数据
      let res = await axios.get(`/apiUrl/api/Account/change_user_money?userId=${userId}&user_money=${user_money}`);
      return res.data;
    }
  }

  static async qu_xian_shen_he(quxianId, userId, order_status) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家管理.json`);
      return res.data.data;
    } else { //使用接口数据
      let res = await axios.get(`/apiUrl/api/Index/qu_xian_shen_he?quxian_id=${quxianId}&userId=${userId}&status=${order_status}`);
      return res.data.data;
    }
  }

  static async get_shen_list(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家管理.json`);
      return res.data.data;
    } else { //使用接口数据
      let res = await axios.get(`/apiUrl/api/Account/ShenHe_Page` + Util.getParams(params));
      return res.data.data;
    }
  }

  static async set_system_bank(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家管理.json`);
      return res.data.data;
    } else { //使用接口数据
      let res = await axios.post(`/apiUrl/api/Account/admin_bank_post`, params);
      return res.data.data;
    }
  }

  static async get_system_bank() {
    // 

    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家管理.json`);
      return res.data.data;
    } else { //使用接口数据
      let res = await axios.get(`/apiUrl/api/Account/admin_bank_info`);
      return res.data.data;
    }
  }


  //获取借款列表
  static async GetMoney_Card(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家管理.json`);
      return res.data.data;
    } else { //使用接口数据
      let res = await axios.get(`/apiUrl/api/Money_Card/Page` + Util.getParams(params));
      return res.data.data;
    }
  }


  //更改审核状态
  static async setShenheSataus(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家管理.json`);
      return res.data.data;
    } else { //使用接口数据
      let res = await axios.get(`/apiUrl/api/Money_Card/shen_he` + Util.getParams(params));
      return res.data.data;
    }
  }


  //获取配置文件接口
  static async Getsystemconfig() {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家管理.json`);
      return res.data.data;
    } else { //使用接口数据
      let res = await axios.get(`/apiUrl/api/Account/Getsystemconfig`);
      return res.data.data;
    }
  }

  //修改配置文件接口
  static async SetsystemConfig(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家管理.json`);
      return res.data.data;
    } else { //使用接口数据

      let res = await axios.post(`/apiUrl/api/Account/systemConfig`, params);

      return res.data;
    }
  }




  //客服管理增删改查  
  static async GetKe_fu_Opt(params, paramdata) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家管理.json`);
      return res.data.data;
    } else { //使用接口数据
      let requestBody = {
        "kefu_url": "",
        "kefu_name": ""
      };
      if (params.method == "add") {
        requestBody = {
          "kefu_url": paramdata.kefu_url,
          "kefu_name": paramdata.kefu_name
        }
      }
      if (params.method == "upd") {
        requestBody = {
          "id": paramdata.id,
          "kefu_url": paramdata.kefu_url,
          "kefu_name": paramdata.kefu_name
        }
      }
      if (params.method == "del") {
        requestBody = {
          "id": paramdata.id,
          "kefu_url": paramdata.kefu_url,
          "kefu_name": paramdata.kefu_name
        }
      }
      let res = await axios.post(`/apiUrl/api/Ke_fu/Opt` + Util.getParams(params), requestBody);

      return res.data;
    }
  }






}