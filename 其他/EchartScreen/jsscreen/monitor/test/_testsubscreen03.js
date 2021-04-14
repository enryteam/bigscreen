var data = Mock.mock('/rest/submonitor', 'post', {
    "earlyWarning": {
        "reason": "@cword(15,30)",
        "name": "@cword(5,8)",
        "time": "@date(yyyy/MM/dd)",
        "degree": "@cword(5,8)",
        "describe": "@cword(20,30)"
    },
    "agency": {
        "name": "@cword(15,30)",
        "phone": "1366789416",
        "phone2": "1366789416",
        "email": "xxx@xxx.com",
        "address": "@city()",
        "origin": "@cword(5,10)",
        "appealType": "@cword(5,10)",
        "puyType": "@cword(5,10)",
        "time": "@date(yyyy/MM/dd)"
    }
});
