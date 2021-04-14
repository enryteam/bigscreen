var data = Mock.mock('/rest/submonitor/four', 'post', {
    "supervisor": {
        "content":"请加快处理",
        "time":"@date(yyyy/MM/dd HH:mm:ss)",
        "ways":['短信','微信','APP']
    },
    "feedback": {
        "content":"已联系诉求人，并答复",
        "remind":"请加快处理",
        "time":"@date(yyyy/MM/dd HH:mm:ss)"
    },
    "warn": {
        "content":"即将超期",
        "time":"@date(yyyy/MM/dd HH:mm:ss)"
    }
});