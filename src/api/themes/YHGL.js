import axios from '../base.js';
import Util from '@/utils/common.js';
export default class YHGL {
  //获取下注机器人数据
  static async getxzjqrData() {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/下注机器人.json`);
      return res.data.data.rows;
    } else { //使用接口数据
      let res = await axios.get(`/apiUrl/api/accountIpBlack/page` + Util.getParams(params));
      return res.data;
    }
  }
  //获取玩家管理列表数据
  static async getwjglListData(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家管理.json`);
      return res.data.data;
    } else { //使用接口数据
      let res = await axios.get(`/apiUrl/kj2130/h5/lottery/search` + Util.getParams(params));
      return res.data.data;
    }
  }
  //新增玩家管理列表数据
  static async addwjglListData(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家管理.json`);
      return res.data.data.rows;
    } else { //使用接口数据
      let res = await axios.post(`/apiUrl/kj2130/h5/lottery/addlottery`, params);
      return res.data;
    }
  }
  //编辑玩家管理列表数据
  static async editwjglListData(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家管理.json`);
      return res.data.data.rows;
    } else { //使用接口数据
       
      let res = await axios.post(`/apiUrl/api/user/edituser`,params);
      return res.data;
    }
  }
  //删除玩家管理列表数据
  static async delwjglListData(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家管理.json`);
      return res.data.data.rows;
    } else { //使用接口数据
      let res = await axios.post(`/apiUrl/kj2130/h5/lottery/dellottery`+ Util.getParams(params));
      return res.data;
    }
  }
  //修改玩家登录密码
  static async editwjglPasswordData(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家管理.json`);
      return res.data.data.rows;
    } else { //使用接口数据
      let res = await axios.post(`/apiUrl/api/player/editPwd`, params);
      return res.data;
    }
  }
  //玩家上下分操作
  static async wjsxfData(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家管理.json`);
      return res.data.data.rows;
    } else { //使用接口数据
      let res = await axios.post(`/apiUrl/api/player/updateBalance`, params);
      return res.data;
    }
  }
  //获取存款记录列表数据
  static async getckjlListData(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/存款记录.json`);
      return res.data.data.rows;
    } else { //使用接口数据
      let res = await axios.get(`/apiUrl/api/playerRech/page` + Util.getParams(params));
      return res.data.data;
    }
  }
  //获取取款记录列表数据
  static async getqkjlListData(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/取款记录.json`);
      return res.data.data.rows;
    } else { //使用接口数据
      let res = await axios.get(`/apiUrl/api/playerWithdrawal/page` + Util.getParams(params));
      return res.data.data;
    }
  }
  //获取是否有审核中，并提示
  static async getqkjlTipData(params = {
    pageNo: 1,
    pageSize: 10,
    status: "1"
  }) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/取款记录.json`);
      return res.data.data.rows;
    } else { //使用接口数据
      let res = await axios.get(`/apiUrl/api/playerWithdrawal/page` + Util.getParams(params));
      try {
        if (res.data.data.rows.length > 0) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        return false;
      }
    }
  }
  //修改取款记录审核状态
  static async editqkjlshzt(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家管理.json`);
      return res.data.data.rows;
    } else { //使用接口数据
      let res = await axios.post(`/apiUrl/api/playerWithdrawal/ShenHe`, params);
      return res.data;
    }
  }

  //获取玩家银行卡列表数据
  static async getwjyhkListData(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家银行卡.json`);
      return res.data.data.rows;
    } else { //使用接口数据
      let res = await axios.post(`/apiUrl/api/card/page` + Util.getParams(params));
      return res.data.data;
    }
  }
  //新增玩家银行卡列表数据
  static async addwjyhkListData(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家管理.json`);
      return res.data.data.rows;
    } else { //使用接口数据
      let res = await axios.post(`/apiUrl/api/card/back_add`, params);
      return res.data;
    }
  }
  //编辑玩家银行卡列表数据
  static async editwjyhkListData(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家管理.json`);
      return res.data.data.rows;
    } else { //使用接口数据
      let res = await axios.post(`/apiUrl/api/playerBank/edit`, params);
      return res.data;
    }
  }
  //删除玩家银行卡列表数据
  static async delwjyhkListData(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家管理.json`);
      return res.data.data.rows;
    } else { //使用接口数据
      let res = await axios.post(`/apiUrl/api/playerBank/delete`, params);
      return res.data;
    }
  }
  //获取资金流水列表数据
  static async getzjlsListData(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/资金流水.json`);
      return res.data.data.rows;
    } else { //使用接口数据
      let res = await axios.get(`/apiUrl/api/playerBalanceRecord/page` + Util.getParams(params));
      return res.data.data;
    }
  }
  //获取玩家等级配置列表数据
  static async getwjdjpzListData(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家等级配置.json`);
      return res.data.data.rows;
    } else { //使用接口数据
      let res = await axios.get(`/apiUrl/api/playerLevelConfig/page` + Util.getParams(params));
      return res.data.data;
    }
  }
  //新增玩家等级配置列表数据
  static async addwjdjpzListData(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家管理.json`);
      return res.data.data.rows;
    } else { //使用接口数据
      let res = await axios.post(`/apiUrl/api/playerLevelConfig/add`, params);
      return res.data;
    }
  }
  //编辑玩家等级配置列表数据
  static async editwjdjpzListData(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家管理.json`);
      return res.data.data.rows;
    } else { //使用接口数据
      let res = await axios.post(`/apiUrl/api/playerLevelConfig/edit`, params);
      return res.data;
    }
  }
  //删除玩家等级配置列表数据
  static async delwjyhkListData(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家管理.json`);
      return res.data.data.rows;
    } else { //使用接口数据
      let res = await axios.post(`/apiUrl/api/playerLevelConfig/delete`, params);
      return res.data;
    }
  }
  //平台盈亏
  static async profitAndLoss(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家管理.json`);
      return res.data.data.rows;
    } else { //使用接口数据
      let res = await axios.get(`/apiUrl/api/player/profitAndLoss`+ Util.getParams(params));
      return res.data.data;
    }
  }
  //玩家盈亏
  static async profitAndLossPage(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家管理.json`);
      return res.data.data.rows;
    } else { //使用接口数据
      let res = await axios.get(`/apiUrl/api/player/profitAndLossPage`+ Util.getParams(params));
      return res.data;
    }
  }
  //获取预设开奖信息
  static async getYskjListData(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家银行卡.json`);
      return res.data.data.rows;
    } else { //使用接口数据
      let res = await axios.get(`/apiUrl/api/setnum/Page` + Util.getParams(params));
      return res.data.data;
    }
  }
  //编辑
  static async editYskjData(params) {
    if (window.globalConfig.isLocalData) { //是否使用本地数据
      let res = await axios.get(`/data/ywyy/yhgl/玩家管理.json`);
      return res.data.data.rows;
    } else { //使用接口数据
      let res = await axios.get(`/apiUrl/api/setnum/SetNum`+ Util.getParams(params));
      return res.data;
    }
  }



    // 获取所有后台的消息
    static async getMessage() {
      if (window.globalConfig.isLocalData) { //是否使用本地数据
        let res = await axios.get(`/data/ywyy/yhgl/存款记录.json`);
        return res.data.data.rows;
      } else { //使用接口数据
      let res = await axios.post(`/apiUrl/api/SendMeaage/Page?pageSize=10000&pageNo=1`);
        return res.data.data;
      }
    }


     // 获取所有后台的消息
     static async getMessage() {
      if (window.globalConfig.isLocalData) { //是否使用本地数据
        let res = await axios.get(`/data/ywyy/yhgl/存款记录.json`);
        return res.data.data.rows;
      } else { //使用接口数据
      let res = await axios.post(`/apiUrl/api/SendMeaage/Page?pageSize=10000&pageNo=1`);
        return res.data.data;
      }
    }

     // 添加后台的消息
     static async addMessage(params) {
      if (window.globalConfig.isLocalData) { //是否使用本地数据
        let res = await axios.get(`/data/ywyy/yhgl/存款记录.json`);
        return res.data.data.rows;
      } else { //使用接口数据
      let res = await axios.post(`/apiUrl/api/SendMeaage/add`,params);
        return res.data.data;
      }
    }


     // 删除后台消息
     static async delMessage(params) {
      if (window.globalConfig.isLocalData) { //是否使用本地数据
        let res = await axios.get(`/data/ywyy/yhgl/存款记录.json`);
        return res.data.data.rows;
      } else { //使用接口数据
      let res = await axios.post(`/apiUrl/api/SendMeaage/delete?id=`+params.id);
        return res.data.data;
      }
    }


       // 编辑后台消息
       static async editMessage(params) {
        if (window.globalConfig.isLocalData) { //是否使用本地数据
          let res = await axios.get(`/data/ywyy/yhgl/存款记录.json`);
          return res.data.data.rows;
        } else { //使用接口数据
        let res = await axios.post(`/apiUrl/api/SendMeaage/edit`,params);
          return res.data.data;
        }
      }


}