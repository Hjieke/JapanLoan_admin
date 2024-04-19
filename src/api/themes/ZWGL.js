import axios from '../base.js';
export default class YHGL {
  //获取参数配置数据
  static async getcspzData(parmsData) {
 
    // 区分查询还是更新  0=查询；1=更新
    if (parmsData.postOrget==0) {
      if (window.globalConfig.isLocalData) { //是否使用本地数据
        let res = await axios.get(`/data/ywyy/zwgl/参数配置.json`);
        return res.data.data;
      } else { //使用接口数据
        let res = await axios.get(`apiUrl/portal/common/getConfig`);
        return res.data;
      }
    } 
    if (parmsData.postOrget==1) {
      let res = await axios.post(`apiUrl/portal/common/updateConfig`,parmsData.data);
      return res;
    } 
  }
    // 公告管理
    static async getggglData(parmsData) {
      // 区分查询还是更新  0=查询；1=更新
      if (parmsData.postOrget==0) {
        if (window.globalConfig.isLocalData) { //是否使用本地数据
          let res = await axios.get(`/data/ywyy/zwgl/公告管理.json`);
          return res.data.data.rows;
        } else { //使用接口数据
          let res = await axios.get(`apiUrl/portal/notice/record`);
          return res.data.data;
        }
      } 
      if (parmsData.postOrget==1) {
        let res = await axios.post(`apiUrl/portal/notice/updaterecord`,parmsData.data);
        return res.data;
      } 
    }
        // 轮播图配置
        static async getlbtData(parmsData) {
          // 区分查询还是更新  0=查询；1=更新
          if (parmsData.postOrget==0) {
            if (window.globalConfig.isLocalData) { //是否使用本地数据
              let res = await axios.get(`/data/ywyy/zwgl/轮播图.json`);
              return res.data.data;
            } else { //使用接口数据
             
              let res = await axios.get(`apiUrl/kj2130/h5/index/listPicture?lotteryType=3&pageSize=100000&pageNum=1`);
         
              return res.data.data;
            }
          } 
          if (parmsData.postOrget==1) {
            let res = await axios.post(`/data/ywyy/zwgl/轮播图.json`,parmsData.data);
            return res.data.data;
          } 
        }

        
        
        // 更新和添加的模型   formData.append("id", parmsData.id);
        static async addOrUpdLbtData(parmsData)
        {
       
          let formData = new FormData();
          if ( parmsData.hasOwnProperty("id")) {
            formData.append("id", parmsData.id);
          }
          formData.append("href", parmsData.href);
          formData.append("imgUrl", parmsData.imgUrl);
          formData.append("sort", parmsData.sort);
          formData.append("type", parmsData.type);
          
          formData.append("remarks", parmsData.remarks);
          try {
            const response = await axios.post(
              "apiUrl/kj2130/h5/lottery/addOrUpdlist",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
         
            // 处理响应数据，比如设置图片URL
            if (response.data.success) {
           
              return response.data;
            }
          } catch (error) {
            // 处理错误情况
            console.error("There was an error uploading the file:", error);
            
          }

        }

         // 轮播图删除
         static async getlbtdel(parmsData) {
          if (window.globalConfig.isLocalData) { //是否使用本地数据
            let res = await axios.get(`/data/ywyy/zwgl/轮播图.json`);
            return res.data.data.rows;
          } else { //使用接口数据
           
            let res = await axios.post(`apiUrl/kj2130/h5/lottery/delpicture?id=`+parmsData.id);
       
            return res.data;
          }
        }

  
}