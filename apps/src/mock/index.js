let Mock =  require("mockjs");
let subCon={user:"admin",psds:"123456"};
let dataCont = Mock.mock({
     "data|88":[
          {
               number:/(EQUIP)[0-9]{3}/,
               name:'@cname',
               flag:'@boolean',
               "type|1":[
                    "行政办公设备",
                    "仪器仪表",
                    "房屋及构筑物",
                    "文物及陈列品",
                    "卫生医疗器械",
                    "工具、量具和器皿",
                    "文体设备",
                    "机电设备",
                    "图书2",
               ],
               "nums|10-100":100,
               "price|100-1000":1000,
               date:'@date'
          }
     ]
})
let dataManage = Mock.mock({
     "data|530":[
          {
               number:/(EQUIP)[0-9]{3}/,
               name:'@cname',
               "flag|1-4":4,
               "type|1":[
                    "行政办公设备",
                    "仪器仪表",
                    "房屋及构筑物",
                    "文物及陈列品",
                    "卫生医疗器械",
                    "工具、量具和器皿",
                    "文体设备",
                    "机电设备",
                    "图书2",
               ],
               "nums|10-100":100,
               "price|100-1000":1000,
               date:'@date'
          }
     ]
})
Mock.mock("/api/psd","post",(config)=>{
   const con = JSON.parse(config.body)
   console.log(con)
   if(con.user==subCon.user && con.psd==subCon.psds){
        return {
            message:"请求成功",
            status:200
        }
   }else{
        return {message:"请求失败", status:100}
   }
})
Mock.mock("/api/putPsd","post",(config)=>{
     const con = JSON.parse(config.body);
     if(con.old==subCon.psds){
          subCon.psds = con.new
          return  {
               ressage:"修改成功",
               status:200
          }
     }else{
          return {
               message:"修改失败",
               status:100
          }
     }
})
Mock.mock("/api/register","get",()=>{
     return dataCont.data
})
Mock.mock("/api/manage","get",()=>{
     return dataManage.data
})
Mock.mock("/api/addCon","post",(config)=>{
     const data = JSON.parse(config.body)
     data.flag = false
     data.number = 'EQUIP'+(dataCont.data.length+1)
     dataCont.data.push(data)
     console.log(data)
     return {
          message:"请求成功",
          status:200
     }
})
Mock.mock("/api/addManage","post",(config)=>{
     const data = JSON.parse(config.body)
     console.log(data)
     dataManage.data.push(data)
     let n = dataCont.data.findIndex(el=>el.number==data.number)
     dataCont.data.splice(n,1)
     return {
          message:"请求成功",
          status:200
     }
})
Mock.mock("/api/audit","post",(config)=>{
     let el = dataCont.data.find(el=>el.number==config.body)
     el.flag = !el.flag
     return {
          message:"请求成功",
          status:200
     }
})
Mock.mock("/api/edit","post",(config)=>{
     const data = JSON.parse(config.body)
     let el = dataCont.data.find(el=>el.number==data.number)
     el.name =  data.name
     el.type = data.type
     el.nums = data.nums
     el.price = data.price
     el.date = data.date
     return {
          message:"请求成功",
          status:200
     }
})
Mock.mock("/api/putflag","post",(config)=>{
     const data = JSON.parse(config.body)
     const ss = dataManage.data.find(el=>el.number==data.number)
     if(data.value=='使用中'){data.value=1}
     if(data.value=='123'){data.value=2}
     if(data.value=='闲置中'){data.value=3}
     if(data.value=='报废中1433223'){data.value=4}
     ss.flag = data.value
     console.log(ss)
     return {
          message:"请求成功",
          status:200
     }
})