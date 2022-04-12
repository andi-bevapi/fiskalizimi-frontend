import request from "../../utils/request";
import { buildUrl } from '../../helpers/buildUrl';

const getDashboardReports = async (clientId, query) => {
    const url = buildUrl(query);

    return request(`/reports/${clientId}${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

const getChartsReports = async (clientId, query) => {
    const url = buildUrl(query);

    return request(`/reports/charts/${clientId}${url}`, {
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