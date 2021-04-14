var data = Mock.mock('/rest/trdhotspots', 'post', {
    "import": {
        "first":['诉求内容','诉求人<br/>基本信息','联系方式'],
        "second":['个人信息','企业信息','地理信息'],
        "third":['知识库','历史经验','网络舆情']
    },
    "handle":{
        "first":['大数据可视化','预测分析','用户画像','语义引擎','数据质量管理','数据挖掘'],
        "second":['Hadoop','MapReduce','Hive']
    },
    "export":['智能座席','重复诉求<br/>识别','工单自动<br/>分类','诉求习惯<br/>分析','热点诉求<br/>识别','诉求规律<br/>分析']
});
