function getData(jaql, add) {
    var resultData;
    $.ajax({
        type: 'POST',
        url: '/api/datasources/' + encodeURI(add) + '/jaql',
        data:  jaql,
        success: function(data){
            console.log(data);
            resultData=data;
        },
        dataType: 'JSON',
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest);
        }
    });
    return resultData;
}
// function dapingData() {


    var dapingData = {
        "address": "国家工商总局广告监测",
        //媒体发布量（条次）占比
        "meitifabuliang": {
            "datasource": {
                "fullname": "LocalHost/国家工商总局广告监测",
            },
            "metadata": [{
                "jaql": {
                    "table": "媒介类别",
                    "column": "媒介类别",
                    "dim": "[媒介类别.媒介类别]",
                    "datatype": "text",
                    "merged": true,
                    "title": "媒介类别"
                },
                "field": {
                    "id": "[媒介类别.媒介类别]",
                    "index": 0
                },
                "format": {}
            }, {
                "jaql": {
                    "type": "measure",
                    "formula": "sum([FC473-749])/10000",
                    "context": {
                        "[FC473-749]": {
                            "table": "广告发布",
                            "column": "数量",
                            "dim": "[广告发布.数量]",
                            "datatype": "numeric",
                            "agg": "sum",
                            "title": "Total 数量"
                        }
                    },
                    "title": "发布数量(单位:万)"
                },
                "format": {
                    "mask": {
                        "abbreviations": {
                            "t": false,
                            "b": false,
                            "m": false,
                            "k": false
                        },
                        "decimals": "auto",
                        "number": {
                            "separated": true
                        }
                    },
                    "width": 144
                },
                "field": {
                    "id": "sum([FC473-749])/10000",
                    "index": 1
                }
            }, {
                "jaql": {
                    "table": "广告发布",
                    "column": "发布日期",
                    "dim": "[广告发布.发布日期 (Calendar)]",
                    "datatype": "datetime",
                    "merged": true,
                    "title": "发布日期",
                    "level": "months",
                    "filter": {
                        "explicit": true,
                        "multiSelection": false,
                        "members": ["2018-01-01T00:00:00"]
                    },
                    "collapsed": false
                },
                "format": {
                    "mask": {
                        "years": "yyyy",
                        "quarters": "yyyy Q",
                        "months": "MM/yyyy",
                        "weeks": "ww yyyy",
                        "days": "shortDate",
                        "isdefault": true
                    }
                },
                "disabled": false,
                "panel": "scope"
            }],
        },
        //违法发布条次占比
        "weifafabutiaoci":{
            "datasource": {
                "fullname": "LocalHost/国家工商总局广告监测",
            },
            "metadata": [{
                "jaql": {
                    "table": "广告内容类别",
                    "column": "大类名称",
                    "dim": "[大类名称]",
                    "datatype": "text",
                    "merged": true,
                    "title": "大类名称"
                },
                "format": {}
            }, {
                "jaql": {
                    "type": "measure",
                    "formula": "sum([8D1DC-999])/10000",
                    "context": {
                        "[8D1DC-999]": {
                            "table": "广告发布",
                            "column": "数量",
                            "dim": "[广告发布.数量]",
                            "datatype": "numeric",
                            "title": "数量",
                            "sortDetails": {
                                "field": 1,
                                "dir": "desc",
                                "sortingLastDimension": true,
                                "measurePath": null,
                                "initialized": true
                            },
                            "sort": "desc"
                        }
                    },
                    "title": "违法数量",
                    "sort": "desc"
                },
                "format": {
                    "mask": {
                        "type": "number",
                        "abbreviations": {
                            "t": true,
                            "b": true,
                            "m": true,
                            "k": true
                        },
                        "separated": true,
                        "decimals": "auto",
                        "isdefault": true
                    }
                },
                "field": {
                    "id": "[广告发布.数量]_sum",
                    "index": 1
                }
            }, {
                "jaql": {
                    "table": "广告发布",
                    "column": "发布日期",
                    "dim": "[广告发布.发布日期 (Calendar)]",
                    "datatype": "datetime",
                    "merged": true,
                    "title": "发布日期",
                    "level": "months",
                    "filter": {
                        "explicit": true,
                        "multiSelection": true,
                        "members": ["2018-01-01T00:00:00"]
                    },
                    "collapsed": false
                },
                "format": {
                    "mask": {
                        "years": "yyyy",
                        "quarters": "yyyy Q",
                        "months": "MM/yyyy",
                        "weeks": "ww yyyy",
                        "days": "shortDate",
                        "isdefault": true
                    }
                },
                "disabled": false,
                "panel": "scope"
            }, {
                "jaql": {
                    "table": "违法类型",
                    "column": "违法类型",
                    "dim": "[违法类型.违法类型]",
                    "datatype": "text",
                    "merged": true,
                    "title": "违法类型",
                    "filter": {
                        "explicit": true,
                        "multiSelection": true,
                        "members": ["一般违法", "严重违法", "轻微违法"]
                    },
                    "collapsed": false
                },
                "panel": "scope"
            }],
        },
        //地区违法量排名前十
        "diquweifaliang":{
            "datasource": {
                "fullname": "LocalHost/国家工商总局广告监测",
            },
            "metadata": [{
                "jaql": {
                    "table": "地区",
                    "column": "省",
                    "dim": "[省]",
                    "datatype": "text",
                    "merged": true,
                    "title": "省"
                },
                "field": {
                    "id": "[省]",
                    "index": 0
                },
                "wpanel": "xAxis"
            }, {
                "jaql": {
                    "type": "measure",
                    "formula": "(sum([69D84-C74]),[4E238-FDC])",
                    "context": {
                        "[4E238-FDC]": {
                            "table": "违法类型",
                            "column": "违法类型",
                            "dim": "[违法类型.违法类型]",
                            "datatype": "text",
                            "merged": true,
                            "title": "违法类型",
                            "filter": {
                                "explicit": true,
                                "multiSelection": true,
                                "members": ["一般违法", "严重违法", "轻微违法"]
                            },
                            "collapsed": false
                        },
                        "[69D84-C74]": {
                            "table": "广告发布",
                            "column": "数量",
                            "dim": "[广告发布.数量]",
                            "datatype": "numeric",
                            "title": "数量"
                        }
                    },
                    "title": "违法量",
                    "sort": "desc"
                },
                "format": {
                    "mask": {
                        "abbreviations": {
                            "t": false,
                            "b": false,
                            "m": false,
                            "k": false
                        },
                        "decimals": "auto",
                        "number": {
                            "separated": true
                        }
                    },
                    "color": {
                        "color": "#3471AD",
                        "type": "color"
                    }
                },
                "field": {
                    "id": "[广告发布.数量]_sum",
                    "index": 1
                },
                "wpanel": "series"
            }, {
                "jaql": {
                    "type": "measure",
                    "formula": "([2F448-998],[BCED5-E2D])/[2F448-998]",
                    "context": {
                        "[2F448-998]": {
                            "table": "广告发布",
                            "column": "数量",
                            "dim": "[广告发布.数量]",
                            "datatype": "numeric",
                            "agg": "sum",
                            "title": "Total 数量"
                        },
                        "[BCED5-E2D]": {
                            "table": "违法类型",
                            "column": "违法类型",
                            "dim": "[违法类型.违法类型]",
                            "datatype": "text",
                            "merged": true,
                            "title": "违法类型",
                            "filter": {
                                "explicit": true,
                                "multiSelection": true,
                                "members": ["一般违法", "严重违法", "轻微违法"]
                            },
                            "collapsed": false
                        }
                    },
                    "title": "违法率"
                },
                "format": {
                    "mask": {
                        "decimals": 2,
                        "percent": true,
                        "percentMultiplier": 100
                    },
                    "color": {
                        "color": "#F66500",
                        "type": "color"
                    }
                },
                "y2": true,
                "singleSeriesType": "line",
                "wpanel": "series"
            }, {
                "jaql": {
                    "type": "measure",
                    "formula": "(sum([69D84-C74]),[4E238-FDC])",
                    "context": {
                        "[4E238-FDC]": {
                            "table": "违法类型",
                            "column": "违法类型",
                            "dim": "[违法类型.违法类型]",
                            "datatype": "text",
                            "merged": true,
                            "title": "违法类型",
                            "filter": {
                                "explicit": true,
                                "multiSelection": true,
                                "members": ["一般违法", "严重违法", "轻微违法"]
                            },
                            "collapsed": false
                        },
                        "[69D84-C74]": {
                            "table": "广告发布",
                            "column": "数量",
                            "dim": "[广告发布.数量]",
                            "datatype": "numeric",
                            "title": "数量"
                        }
                    },
                    "title": "(sum([数量]),[违法类型1])",
                    "sort": "desc",
                    "filter": {
                        "top": 10
                    },
                    "collapsed": false
                },
                "format": {
                    "mask": {
                        "type": "number",
                        "abbreviations": {
                            "t": true,
                            "b": true,
                            "m": true,
                            "k": true
                        },
                        "separated": true,
                        "decimals": "auto",
                        "isdefault": true
                    }
                },
                "disabled": false,
                "wpanel": "filters",
                "panel": "scope"
            }, {
                "jaql": {
                    "table": "发布日期",
                    "column": "发布日期",
                    "dim": "[发布日期.发布日期 (Calendar)]",
                    "datatype": "datetime",
                    "merged": true,
                    "title": "发布日期",
                    "level": "months",
                    "filter": {
                        "explicit": true,
                        "multiSelection": false,
                        "members": ["2018-01-01T00:00:00"]
                    },
                    "collapsed": false
                },
                "format": {
                    "mask": {
                        "years": "yyyy",
                        "quarters": "yyyy Q",
                        "months": "MM/yyyy",
                        "weeks": "ww yyyy",
                        "days": "shortDate",
                        "isdefault": true
                    }
                },
                "wpanel": "filters",
                "panel": "scope"
            }],
        },

    }
    console.log(dapingData)
// return  dapingData;
// }