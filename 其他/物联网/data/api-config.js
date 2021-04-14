/**
 * 此处定义服务器路径和数据接口
 */

function getApiPath (path) {
  return window.serverPath + path
}

// 服务器配置
// window.serverPath = 'http://192.168.9.81:8080/'
window.serverPath = 'data/'

/**
 * 接口配置
 * 原则上按大屏分组
 */
window.api = {
  operation: {
    customerCount: getApiPath('customer-count.json'),
    customerType: getApiPath('customer-type.json'),
    gasConsumption: getApiPath('gas-consumption.json'),
    meterCount: getApiPath('meter-count.json'),
    monthGasAnalysis: getApiPath('month-gas-analysis.json'),
    yesterdayGasConsumption: getApiPath('yesterday-gas-consumption.json')
  },
  workOrder: {
    issueAndSolveCount: getApiPath('issue-and-solve-count.json'),
    issueTotalCountAndTop10: getApiPath('issue-total-count-and-top-10.json'),
    latest20DaysWorkOrderCount: getApiPath('latest-20-days-work-order-count.json'),
    latest12MonthIssueCount: getApiPath('latest-12-month-issue-count.json'),
    securityCheckCount: getApiPath('security-check-count.json'),
    workOrderCount: getApiPath('work-order-count.json'),
    workOrderIssueTop10: getApiPath('work-order-issue-top-10.json'),
    workOrderType: getApiPath('work-order-type.json')
  }
}

try {
  module.exports = window.api
} catch (error) {}
