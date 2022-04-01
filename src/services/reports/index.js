import request from "../../utils/request";
import { buildUrl } from '../../helpers/buildUrl';

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

const getAnalyticsData = async (clientId, query) => {
    const url = buildUrl(query);

    return request(`/reports/analytics/${clientId}${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export { getDashboardReports, getChartsReports, getAnalyticsData }