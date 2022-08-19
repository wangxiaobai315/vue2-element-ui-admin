const obj = {
    arr:[
        {id:1,text:"今天解决300个BUG",check:false},
        {id:2,text:"今天好好玩一天",check:false},
        {id:3,text:"今天完成所有任务",check:true},
        {id:4,text:"今天要健身",check:false},
        {id:5,text:"今天天气不错，可以去游玩",check:true},
    ],
    tableArr:[
        {id:1,user:"小虎",price:3691,src:"https://img2.baidu.com/it/u=4244269751,4000533845&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",address:"福建省厦门市",state:"成功",time:"2020-07-16"},
        {id:2,user:"小妹",price:4591,src:"https://img1.baidu.com/it/u=456563578,3385961931&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",address:"四川省成都市",state:"失败",time:"2021-03-18"},
        {id:3,user:"王琦",price:3201,src:"https://img0.baidu.com/it/u=1600969112,4145041554&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",address:"陕西省榆林市",state:"成功",time:"2019-12-10"},
        {id:4,user:"王晴",price:5736,src:"https://img2.baidu.com/it/u=2183774629,3758018921&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",address:"广东省汕尾市",state:"失败",time:"2020-08-24"},
    ],
    tab: {
      
        unread: [
          {id:1,text:"【系统通知】该系统将于今晚凌晨2点到5点进行升级维护",timer:"2018-04-19 20:00:00"},
          {id:2,text:"今晚12点整发大红包，先到先得",timer:"2018-04-19 21:00:00"},
        ],
        read: [
          {id:1,text:"【系统通知】该系统将于今天6点到15点进行升级维护",timer:"2018-04-19 20:00:00"}
          
        ],
        dele: [
          {id:1,text:"【系统通知】该系统将于今晚20点到24点进行升级维护",timer:"2019-06-19 20:00:00"}
        ]
    }
}


const Koa = require("koa");
const app = new Koa();
const body = require("koa-body")();
const router = require("koa-router")();
//获取主页中待办事项的数据
router.get("/count",(ctx)=>{
    ctx.body = {
        message:"请求成功",
        status:200,
        data:obj.arr
    }
})
//判断登录信息是否正确
router.post("/shuj",(ctx)=>{
    const con = ctx.request.body
    if(con.name==="admins"&&con.psd==="1234567"){
        ctx.body = {
            message:"请求成功",
            status:200,
        }
    }else{
        ctx.body = {
            message:"请求失败",
            status:200,
        }
    }
})
//主页中添加一条待办事项
router.post("/addPost",(ctx)=>{
    const con = ctx.request.body
    const n = obj.arr.length
    obj.arr.push({id:n+1,text:con.val,check:false})
    ctx.body = {
        message:"请求成功",
        status:200
    }
})
//删除主页中的某条待办事项
router.post("/dele",(ctx)=>{
    const con = ctx.request.body
    let x = obj.arr.findIndex(el=>el.id==con.id)
    obj.arr.splice(x,1)
    ctx.body = {
        message:"请求成功",
        status:200
    }
})
//获取表格数据
router.get("/tables",(ctx)=>{
    ctx.body = {
        message:"请求成功",
        status:200,
        data:obj.tableArr
    }
})
//将编辑后的数据进行提交
router.post("/addTable",(ctx)=>{
    const con = ctx.request.body
    let el = obj.tableArr.find(el=>el.id==con.id)
    el.user = con.name
    el.address = con.address
    ctx.body = {
        message:"请求成功",
        status:200,
    }
 })
 //删除表格中的某条数据
 router.post("/deleTable",(ctx)=>{
    const con = ctx.request.body.id
    let x = obj.tableArr.findIndex(el=>el.id==con)
    obj.tableArr.splice(x,1)
    ctx.body = {
        message:"请求成功",
        status:200,
    }
 })
 //删除多条数据
 router.post("/deleAll",(ctx)=>{
    const con = ctx.request.body
    let newArray = [];
    obj.tableArr.forEach((el,index)=>{
        con.arr.forEach(val=>{
            if(el.id==val){
                obj.tableArr.splice(index, 1);
            }        
        })
    })
    ctx.body = {
        message:"请求成功",
        status:200,
    }
 })
//获取选项卡的数据
router.get("/tabs",(cxt)=>{
    cxt.body = {
        message:"请求成功",
        status:200,
        data:obj.tab
    }
})
//单条数据标为已读
router.post("/read",(ctx)=>{
    const id = ctx.request.body.id
    // const arr = obj.tab.unread
    // const i = arr.findIndex(el=>el.id==id)
    // const readArr = obj.tab.read
    // let x = readArr.length
    // arr[i].id = x++
    // readArr.push(arr[i])
    // arr.splice(i,1)
    ff(obj.tab.unread,obj.tab.read,id)
    ctx.body = {
        message:"请求成功",
        status: 200,
    }
})
//全部数据标为已读
router.post("/allRead",(ctx)=>{
    const arr = obj.tab.unread
    const readArr = obj.tab.read
    let n = readArr.length
    arr.forEach(el=>{
        n++
        el.id = n
    })
    obj.tab.read = [...readArr,...arr]
    obj.tab.unread = []
    // all(readArr,arr)
    ctx.body = {
        message:"请求成功",
        status: 200,
        data:obj.tab.read
    }
})
//删除单条数据
router.post("/tabDele",(ctx)=>{
    const id = ctx.request.body.id
    // const arr = obj.tab.read
    // const i = arr.findIndex(el=>el.id==id)
    // const deleArr = obj.tab.dele
    // let x = deleArr.length
    // arr[i].id = x+1
    // deleArr.push(arr[i])
    // arr.splice(i,1)
    ff(obj.tab.read,obj.tab.dele,id)
    ctx.body = {
        message:"请求成功",
        status: 200,
    }
})
//删除全部数据
router.post("/tabDeleAll",(ctx)=>{
    const deleArr = obj.tab.dele
    let n = deleArr.length
    const readArr = obj.tab.read
    readArr.forEach(el=>{
        n++
        el.id = n
    })
    obj.tab.dele = [...deleArr,...readArr]
    obj.tab.read = []
    // all(obj.tab.dele,obj.tab.read)
    ctx.body = {
        message:"请求成功",
        status: 200,
    }
})
//还原某条数据
router.post("/restore",(ctx)=>{
    const id = ctx.request.body.id
    ff(obj.tab.dele,obj.tab.read,id)
    ctx.body = {
        message:"请求成功",
        status: 200,
    }
})
//清空回收站
router.post("/clear",(ctx)=>{
    obj.tab.dele = []
    ctx.body = {
        message:"请求成功",
        status: 200,
    }
})
//操作单条数据的封装
function ff(a,b,id){
    const i = a.findIndex(el=>el.id==id)
    let x = b.length
    a[i].id = x+1
    b.push(a[i])
    a.splice(i,1)
}
//操作全部数据的封装
/* function all(a,b){
    let n = a.length
    b.forEach(el=>{
        n++
        el.id = n
    })
    a = [...a,...b]
    b = []
} */
/* router.put("/putCon", (ctx) => {
const con =  ctx.request.body
    console.log(con)
    ctx.body={
        status:200
    }
}) */
/* router.delete("/delete", (ctx) => {
    // const con = ctx.request.body
    console.log(ctx.query)
    ctx.body = {
        status: 200,
        data:ctx
    }
}) */
app.use(body);
app.use(router);
app.listen(3000)    