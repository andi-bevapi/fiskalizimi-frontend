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

const getSingleInvoiceAnalytics = async (clientId, invoiceId) => {
    return request(`/reports/analytics/${clientId}/${invoiceId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

const getSoldProducts = async (clientId, query) => {
    const url = buildUrl(query);

    return request(`/reports/sold-products/${clientId}${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

const getOperatorsReport = async (clientId, query) => {
    const url = buildUrl(query);

    return request(`/reports/operators/${clientId}${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

const getDailyTurnoverReport = async (query) => {
    const url = buildUrl(query);

    return request(`/reports/daily/turnover${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export { getDashboardReports, getChartsReports, getAnalyticsData, getSingleInvoiceAnalytics, getSoldProducts, getOperatorsReport, getDailyTurnoverReport }