import * as echarts from 'echarts';
export default ()=>{
    let myChart = echarts.init(document.getElementById('circle'));
    myChart.setOption({
        title: {
            text: '设备状态汇总',
            left: 'center',
            top:"5%"
        },
        series: [
            {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 80, name: '闲置：80' },
                { value: 300, name: '使用：300' },
                { value: 20, name: '保修：20' },
                { value: 40, name: '处置：40' },
            ],
            }
        ]
    });
}