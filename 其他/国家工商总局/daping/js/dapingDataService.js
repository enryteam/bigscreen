function getData(jaql, add) {
    var resultData;
    $.ajax({
        type: 'POST',
        url: '/api/datasources/' + encodeURI(add) + '/jaql',
        data: JSON.stringify(jaql),
        success: function(data){
            // console.log(data);
            resultData=data;
        },
        dataType: 'JSON',
        async:false,
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest);
        }
    });
    return resultData;
}
// function dapingData() {
var time1 = new Date();
// console.log(time1.getFullYear());
var mouth = time1.getFullYear() + '-'+ time1.getMonth()+1 +'-01T00:00:00';
var year = time1.getFullYear() + '-01-01T00:00:00';
// console.log(mouth);
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
                        "members": [year]
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
        // 监测数量
        "leijijianceliang": {
            "datasource": {
                "fullname": "LocalHost/国家工商总局广告监测",
            },
            "metadata": [{
                "jaql": {
                    "table": "广告发布",
                    "column": "数量",
                    "dim": "[广告发布.数量]",
                    "datatype": "numeric",
                    "agg": "sum",
                    "title": "累计监测量"
                },
                "format": {
                    "mask": {
                        "type": "number",
                        "abbreviations": {
                            "t": true,
                            "b": true,
                            "m": true,
                            "k": false
                        },
                        "separated": true,
                        "decimals": "auto",
                        "isdefault": true
                    },
                    "color": {
                        "color": "#3471AD",
                        "type": "color"
                    }
                },
                "source": "value"
            }, {
                "jaql": {
                    "table": "发布日期",
                    "column": "发布日期",
                    "dim": "[发布日期.发布日期 (Calendar)]",
                    "datatype": "datetime",
                    "merged": true,
                    "title": "发布日期",
                    "level": "years",
                    "filter": {
                        "explicit": true,
                        "multiSelection": true,
                        "members": [year]
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
        // 违法数量
        "weifashuliang": {
            "datasource": {
                "fullname": "LocalHost/国家工商总局广告监测",
            },
            "metadata": [{
                "jaql": {
                    "table": "广告发布",
                    "column": "数量",
                    "dim": "[广告发布.数量]",
                    "datatype": "numeric",
                    "agg": "sum",
                    "title": "累计违法量"
                },
                "format": {
                    "mask": {
                        "type": "number",
                        "abbreviations": {
                            "t": true,
                            "b": true,
                            "m": true,
                            "k": false
                        },
                        "separated": true,
                        "decimals": "auto",
                        "isdefault": true
                    },
                    "color": {
                        "color": "#3471AD",
                        "type": "color"
                    }
                },
                "source": "value"
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
            }, {
                "jaql": {
                    "table": "发布日期",
                    "column": "发布日期",
                    "dim": "[发布日期.发布日期 (Calendar)]",
                    "datatype": "datetime",
                    "merged": true,
                    "title": "发布日期",
                    "level": "years",
                    "filter": {
                        "explicit": true,
                        "multiSelection": true,
                        "members": [year]
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
        // 违法率
        "weifalv": {
            "datasource": {
                "fullname": "LocalHost/国家工商总局广告监测"
            },
            "metadata": [{
                "jaql": {
                    "type": "measure",
                    "formula": "(sum([3C0AA-948]),[092EE-135])/[0EE60-C96]",
                    "context": {
                        "[0EE60-C96]": {
                            "table": "广告发布",
                            "column": "数量",
                            "dim": "[广告发布.数量]",
                            "datatype": "numeric",
                            "agg": "sum",
                            "title": "Total 数量"
                        },
                        "[092EE-135]": {
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
                        "[3C0AA-948]": {
                            "table": "广告发布",
                            "column": "数量",
                            "dim": "[广告发布.数量]",
                            "datatype": "numeric",
                            "title": "数量"
                        }
                    },
                    "title": "累计违法率"
                },
                "format": {
                    "mask": {
                        "decimals": 2,
                        "percent": true
                    },
                    "color": {
                        "color": "#3471AD",
                        "type": "color"
                    }
                },
                "source": "value"
            }, {
                "jaql": {
                    "table": "发布日期",
                    "column": "发布日期",
                    "dim": "[发布日期.发布日期 (Calendar)]",
                    "datatype": "datetime",
                    "merged": true,
                    "title": "发布日期",
                    "level": "years",
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
            }],
        },
        // 刊例金额
        "kanlijinex": {
            "datasource": {
                "fullname": "LocalHost/国家工商总局广告监测",
            },
            "metadata": [{
                "jaql": {
                    "type": "measure",
                    "formula": "sum([89CCA-055])/100000000",
                    "context": {
                        "[89CCA-055]": {
                            "table": "广告发布",
                            "column": "金额",
                            "dim": "[广告发布.金额]",
                            "datatype": "numeric",
                            "agg": "sum",
                            "title": "Total 金额"
                        }
                    },
                    "title": "累计刊例金额"
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
                "source": "value"
            }, {
                "jaql": {
                    "table": "发布日期",
                    "column": "发布日期",
                    "dim": "[发布日期.发布日期 (Calendar)]",
                    "datatype": "datetime",
                    "merged": true,
                    "title": "发布日期",
                    "level": "years",
                    "filter": {
                        "explicit": true,
                        "multiSelection": true,
                        "members": [year]
                    },
                    "collapsed": false
                },
                "jaql": {
                    "table": "发布日期",
                    "column": "发布日期",
                    "dim": "[发布日期.发布日期 (Calendar)]",
                    "datatype": "datetime",
                    "merged": true,
                    "title": "发布日期",
                    "level": "years",
                    "filter": {
                        "explicit": true,
                        "multiSelection": true,
                        "members": [year]
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
        // 月监测数量
        "yuejianceshuliang": {
            "datasource": {
                "fullname": "LocalHost/国家工商总局广告监测",
            },
            "metadata": [{
                "jaql": {
                    "table": "广告发布",
                    "column": "数量",
                    "dim": "[广告发布.数量]",
                    "datatype": "numeric",
                    "agg": "sum",
                    "title": "月监测量"
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
                "source": "value"
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
                        "members": [mouth]
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
        // 月违法数量
        "yueweifashuliang": {
            "datasource": {
                "fullname": "LocalHost/国家工商总局广告监测",
            },
            "metadata": [{
                "jaql": {
                    "table": "广告发布",
                    "column": "数量",
                    "dim": "[广告发布.数量]",
                    "datatype": "numeric",
                    "agg": "sum",
                    "title": "月违法量"
                },
                "format": {
                    "mask": {
                        "type": "number",
                        "abbreviations": {
                            "t": true,
                            "b": true,
                            "m": true,
                            "k": false
                        },
                        "separated": true,
                        "decimals": "auto",
                        "isdefault": true
                    },
                    "color": {
                        "color": "#3471AD",
                        "type": "color"
                    }
                },
                "source": "value"
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
                        "members": [mouth]
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
        // 月违法率
        "yueweifalv": {
            "datasource": {
                "fullname": "LocalHost/国家工商总局广告监测",
            },
            "metadata": [{
                "jaql": {
                    "type": "measure",
                    "formula": "(sum([BC5C5-E6F]),[C5455-3C0])/[5AF16-7D0]",
                    "context": {
                        "[5AF16-7D0]": {
                            "table": "广告发布",
                            "column": "数量",
                            "dim": "[广告发布.数量]",
                            "datatype": "numeric",
                            "agg": "sum",
                            "title": "Total 数量"
                        },
                        "[C5455-3C0]": {
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
                        "[BC5C5-E6F]": {
                            "table": "广告发布",
                            "column": "数量",
                            "dim": "[广告发布.数量]",
                            "datatype": "numeric",
                            "title": "数量"
                        }
                    },
                    "title": "月违法率"
                },
                "format": {
                    "mask": {
                        "decimals": 2,
                        "percent": true
                    },
                    "color": {
                        "color": "#3471AD",
                        "type": "color"
                    }
                },
                "source": "value"
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
                        "userMultiSelect": false,
                        "members": [mouth]
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

        //违法发布条次占比      ✔
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
                "panel": "scope"
            }],
        },
        //地区违法量排名前十     ✔
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
        //地区违法率排名前十     ✔
        "diquweifalv":{
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
                    "title": "违法量"
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
                    "title": "违法率",
                    "sort": "desc"
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
                    "title": "违法率",
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
            }],
        },
        //媒体刊例金额占比      ✔
        "meitikanlijine":{
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
                    "formula": "sum([BEC9E-BE0])/10000",
                    "context": {
                        "[BEC9E-BE0]": {
                            "table": "广告发布",
                            "column": "金额",
                            "dim": "[广告发布.金额]",
                            "datatype": "numeric",
                            "agg": "sum",
                            "title": "Total 金额"
                        }
                    },
                    "title": "刊例金额(单位:万元)"
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
                    }
                },
                "field": {
                    "id": "[广告发布.数量]_sum",
                    "index": 1
                }
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
            }],
        },
        //地图       ×
        "ditu":{
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
                "wpanel": "xAxis"
            }, {
                "jaql": {
                    "table": "广告发布",
                    "column": "数量",
                    "dim": "[广告发布.数量]",
                    "datatype": "numeric",
                    "agg": "sum",
                    "title": "监测数量"
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
                    },
                    "color": {
                        "color": "#3471AD",
                        "type": "color"
                    }
                },
                "wpanel": "series"
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
                "wpanel": "filters",
                "panel": "scope"
            }],
        },
        //刊例金额与国民经济指标对比     ✔
        "kanlijine":{
            "datasource": {
                "fullname": "LocalHost/国家工商总局广告监测",
            },
            "metadata": [{
                "jaql": {
                    "table": "发布日期",
                    "column": "发布日期",
                    "dim": "[发布日期.发布日期 (Calendar)]",
                    "datatype": "datetime",
                    "merged": true,
                    "level": "months",
                    "title": "Months in 发布日期"
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
                "field": {
                    "id": "[发布日期.发布日期 (Calendar)]_months",
                    "index": 0
                },
                "hierarchies": ["calendar", "calendar - weeks"],
                "wpanel": "xAxis"
            }, {
                "jaql": {
                    "type": "measure",
                    "formula": "sum([D8A13-D23])/10000",
                    "context": {
                        "[D8A13-D23]": {
                            "table": "GDP",
                            "column": "值(万元)",
                            "dim": "[GDP.值(万元)]",
                            "datatype": "numeric",
                            "title": "值(万元)"
                        }
                    },
                    "title": "GDP(单位:亿元)"
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
                    },
                    "color": {
                        "color": "#3471AD",
                        "type": "color"
                    }
                },
                "field": {
                    "id": "[GDP.值(万元)]_sum",
                    "index": 1
                },
                "wpanel": "series"
            }, {
                "jaql": {
                    "type": "measure",
                    "formula": "sum([3BF87-69F])/10000",
                    "context": {
                        "[3BF87-69F]": {
                            "table": "省份数据",
                            "column": "广告金额",
                            "dim": "[省份数据.广告金额]",
                            "datatype": "numeric",
                            "title": "广告金额"
                        }
                    },
                    "title": "广告金额(单位:万元)"
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
                        "color": "#F66500",
                        "type": "color"
                    }
                },
                "field": {
                    "id": "[省份数据.广告金额]_sum",
                    "index": 2
                },
                "y2": true,
                "wpanel": "series"
            }, {
                "jaql": {
                    "table": "发布日期",
                    "column": "发布日期",
                    "dim": "[发布日期.发布日期 (Calendar)]",
                    "datatype": "datetime",
                    "merged": true,
                    "title": "发布日期",
                    "level": "years",
                    "filter": {
                        "explicit": true,
                        "multiSelection": true,
                        "members": ["2018-01-01T00:00:00", "2017-01-01T00:00:00"]
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
                "wpanel": "filters",
                "panel": "scope"
            }],
        },
        //广告发布趋势        ✔
        "guanggaofabuqushi":{
            "datasource": {
                "fullname": "LocalHost/国家工商总局广告监测",
            },
            "metadata": [{
                "jaql": {
                    "table": "发布日期",
                    "column": "发布日期",
                    "dim": "[发布日期.发布日期 (Calendar)]",
                    "datatype": "datetime",
                    "merged": true,
                    "level": "months",
                    "title": "月份"
                },
                "format": {
                    "mask": {
                        "years": "yyyy",
                        "quarters": "yyyy Q",
                        "months": "MM",
                        "days": "shortDate"
                    }
                },
                "field": {
                    "id": "[发布日期.发布日期 (Calendar)]_months",
                    "index": 0
                },
                "hierarchies": ["calendar", "calendar - weeks"],
                "wpanel": "xAxis"
            }, {
                "jaql": {
                    "type": "measure",
                    "formula": "sum([6E9CC-84B])/10000",
                    "context": {
                        "[6E9CC-84B]": {
                            "table": "广告发布",
                            "column": "数量",
                            "dim": "[广告发布.数量]",
                            "datatype": "numeric",
                            "title": "数量"
                        }
                    },
                    "title": "本期监测量"
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
                    "formula": "PastYear([61F28-03E])/10000",
                    "context": {
                        "[61F28-03E]": {
                            "table": "广告发布",
                            "column": "数量",
                            "dim": "[广告发布.数量]",
                            "datatype": "numeric",
                            "agg": "sum",
                            "title": "Total 数量"
                        }
                    },
                    "title": "同期监测量"
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
                    "width": 160.5,
                    "color": {
                        "color": "#F66500",
                        "type": "color"
                    }
                },
                "field": {
                    "id": "PastYear([1C195-698])",
                    "index": 2
                },
                "wpanel": "series"
            }, {
                "jaql": {
                    "table": "发布日期",
                    "column": "发布日期",
                    "dim": "[发布日期.发布日期 (Calendar)]",
                    "datatype": "datetime",
                    "merged": true,
                    "title": "发布日期",
                    "level": "years",
                    "filter": {
                        "explicit": true,
                        "multiSelection": true,
                        "members": ["2017-01-01T00:00:00"]
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
                "wpanel": "filters",
                "panel": "scope"
            }],
        },
        //违法发布趋势        ✔
        "weifafabuqushi":{
            "datasource": {
                "fullname": "LocalHost/国家工商总局广告监测",
            },
            "metadata": [{
                "jaql": {
                    "table": "发布日期",
                    "column": "发布日期",
                    "dim": "[发布日期.发布日期 (Calendar)]",
                    "datatype": "datetime",
                    "merged": true,
                    "level": "months",
                    "title": "月份"
                },
                "format": {
                    "mask": {
                        "years": "yyyy",
                        "quarters": "yyyy Q",
                        "months": "MM",
                        "days": "shortDate"
                    }
                },
                "field": {
                    "id": "[发布日期.发布日期 (Calendar)]_months",
                    "index": 0
                },
                "hierarchies": ["calendar", "calendar - weeks"],
                "wpanel": "xAxis"
            }, {
                "jaql": {
                    "type": "measure",
                    "formula": "sum([AB92B-0D8])",
                    "context": {
                        "[AB92B-0D8]": {
                            "table": "广告发布",
                            "column": "数量",
                            "dim": "[广告发布.数量]",
                            "datatype": "numeric",
                            "title": "数量"
                        }
                    },
                    "title": "本期违法量"
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
                    "formula": "PastYear([3D924-EF7])",
                    "context": {
                        "[3D924-EF7]": {
                            "table": "广告发布",
                            "column": "数量",
                            "dim": "[广告发布.数量]",
                            "datatype": "numeric",
                            "agg": "sum",
                            "title": "Total 数量"
                        }
                    },
                    "title": "同期违法量"
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
                    "width": 160.5,
                    "color": {
                        "color": "#F66500",
                        "type": "color"
                    }
                },
                "field": {
                    "id": "PastYear([1C195-698])",
                    "index": 2
                },
                "wpanel": "series"
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
                    "level": "years",
                    "filter": {
                        "explicit": true,
                        "multiSelection": true,
                        "members": ["2017-01-01T00:00:00"]
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
        //违法类型占比        ✔
        "weifaleixing":{
            "datasource": {
                "fullname": "LocalHost/国家工商总局广告监测",
            },
            "metadata": [{
                "jaql": {
                    "table": "违法类型",
                    "column": "违法类型",
                    "dim": "[违法类型.违法类型]",
                    "datatype": "text",
                    "merged": true,
                    "title": "违法类型"
                },
                "field": {
                    "id": "[违法类型.违法类型]",
                    "index": 0
                },
                "format": {
                    "width": 93.8
                }
            }, {
                "jaql": {
                    "type": "measure",
                    "formula": "sum([043E7-A32])/10000",
                    "context": {
                        "[043E7-A32]": {
                            "table": "广告发布",
                            "column": "数量",
                            "dim": "[广告发布.数量]",
                            "datatype": "numeric",
                            "title": "数量"
                        }
                    },
                    "title": "违法数量"
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
                    "table": "发布日期",
                    "column": "发布日期",
                    "dim": "[发布日期.发布日期 (Calendar)]",
                    "datatype": "datetime",
                    "merged": true,
                    "title": "发布日期",
                    "level": "years",
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
                        "explicit": false,
                        "multiSelection": true,
                        "exclude": {
                            "members": ["不违法"]
                        }
                    },
                    "collapsed": false
                },
                "panel": "scope"
            }],
        },
        //违法处理情况
        "weifachuli":{
            "datasource": {
                "fullname": "LocalHost/国家工商总局广告监测",
            },
            "metadata": [{
                "jaql": {
                    "table": "处置方式",
                    "column": "处置方式",
                    "dim": "[处置方式.处置方式]",
                    "datatype": "text",
                    "merged": true,
                    "title": "处理情况"
                },
                "wpanel": "xAxis"
            }, {
                "jaql": {
                    "type": "measure",
                    "formula": "count([4DF47-26D])",
                    "context": {
                        "[4DF47-26D]": {
                            "table": "违法广告",
                            "column": "fadid",
                            "dim": "[违法广告.fadid]",
                            "datatype": "numeric",
                            "title": "Fadid"
                        }
                    },
                    "title": "数量"
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
                    },
                    "color": {
                        "color": "#3471AD",
                        "type": "color"
                    }
                },
                "wpanel": "series"
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
                "disabled": false,
                "wpanel": "filters",
                "panel": "scope"
            }],
        },

        "yuekanlijine": {
            "datasource": {
                "fullname": "LocalHost/国家工商总局广告监测"
            },
            "metadata": [{
                "jaql": {
                    "type": "measure",
                    "formula": "sum([67430-0C4])/100000000",
                    "context": {
                        "[67430-0C4]": {
                            "table": "广告发布",
                            "column": "金额",
                            "dim": "[广告发布.金额]",
                            "datatype": "numeric",
                            "agg": "sum",
                            "title": "Total 金额"
                        }
                    },
                    "title": "月刊例金额"
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
                "source": "value"
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
                        "members": [mouth]
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
        // 广告内容发布
        "guanggaoneirong": {
            "datasource": {
                "fullname": "LocalHost/国家工商总局广告监测"
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
                        "members": [year]
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
                    "sort": "desc",
                    "filter": {
                        "top": 5
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
                "panel": "scope"
            }]
        }
    }
    console.log(dapingData)
// return  dapingData;
// }