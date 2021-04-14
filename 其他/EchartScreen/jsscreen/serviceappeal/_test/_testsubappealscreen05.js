var data = Mock.mock('/rest/subrqst/five', 'post', {
    "stepOne": {
        "name":"@cname()",
        "content":"@cword(25,30)",
        "time":"@date(yyyy/MM/dd HH/mm/ss)"
    },
    "stepTwo": {
        "name":"@cname()",
        "content":"@cword(25,30)",
        "time":"@date(yyyy/MM/dd HH/mm/ss)"
    },
    "stepThree": {
        "name":"@cname()",
        "content":"@cword(25,30)",
        "time":"@date(yyyy/MM/dd HH/mm/ss)"
    },
    "stepFour": {
        "starlist":"@natural(1,5)",
        "time":"@date(yyyy/MM/dd HH/mm/ss)"
    }
});