import request from "../../utils/request";

const getDashboardReports = async (clientId) => {
    return request(`/reports/${clientId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

const getChartsReports = async (clientId) => {
    return request(`/reports/charts/${clientId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

const getAnalyticsData = async (clientId) => {
    return request(`/reports/analytics/${clientId}?startDate=2022-03-30&endDate=2022-04-31`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export { getDashboardReports, getChartsReports, getAnalyticsData }