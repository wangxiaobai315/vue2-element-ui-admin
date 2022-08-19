import * as echarts from 'echarts';
export default ()=>{
let myChart = echarts.init(document.getElementById('pillar'));
 myChart.setOption({
    title:{
        text:"设备分类汇总",
        left:"center",
        top:"5%"
    },
    xAxis: {
        type: 'category',
        data: ['房屋及构筑物', '仪器仪表', '机电设备', '卫生医疗器械', '文体设备', '文物及陈列品', '图书','工具、量具及器皿','行政办公设备'],
        axisLabel: {
        rotate: 34
        }
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
        data: [30, 80, 50, 40, 330, 70, 540,310,50],
        type: 'bar',
        itemStyle: {
        color: "rgba(224, 27, 27, 1)"
        }
        }
        
    ],
 })
}