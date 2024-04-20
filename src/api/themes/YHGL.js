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
       
        let res = await axios.post(`/apiUrl/api/Account/systemConfig`,params);
    
        return res.data;
      }
    }




       //客服管理增删改查  
   static async GetKe_fu_Opt(params,paramdata) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家管理.json`);
      return res.data.data;
    } else { //使用接口数据
      let requestBody={
        "kefu_url": "",
        "kefu_name": ""
      };
      if (params.method=="add") {
        requestBody={
          "kefu_url": paramdata.kefu_url,
          "kefu_name": paramdata.kefu_name
        }
      }
      if (params.method=="upd") {
        requestBody={
          "id":paramdata.id,
          "kefu_url": paramdata.kefu_url,
          "kefu_name": paramdata.kefu_name
        }
      }
      if (params.method=="del") {
        requestBody={
          "id":paramdata.id,
          "kefu_url": paramdata.kefu_url,
          "kefu_name": paramdata.kefu_name
        }
      }
      let res = await axios.post(`/apiUrl/api/Ke_fu/Opt` + Util.getParams(params),requestBody);
     
      return res.data;
    }
  }
 


 
   

}