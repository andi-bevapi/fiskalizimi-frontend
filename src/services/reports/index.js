import request from "../../utils/request";
import { buildUrl } from '../../helpers/buildUrl';

const getDashboardReports = async (clientId, option = 'daily') => {
    return request(`/reports/${clientId}?option=${option}`, {
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

const getSoldProductsByCategory = async (clientId) => {
    return request(`/reports/sold-products/category/${clientId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

const getSoldProductsBySupplier = async (clientId) => {
    return request(`/reports/sold-products/supplier/${clientId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export { getDashboardReports, getChartsReports, getAnalyticsData, getSingleInvoiceAnalytics, getSoldProductsByCategory, getSoldProductsBySupplier }