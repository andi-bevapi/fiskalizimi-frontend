import * as yup from 'yup';
import i18n from "i18next";

export const formFields = [
    {
        name: 'name',
        component: 'Text',
        label: i18n.t("Name")
    },
    {
        name: 'address',
        component: 'Text',
        label: i18n.t("Address")
    },
    {
        name: 'city',
        component: 'Text',
        label: i18n.t("City")
    },
    {
        name: 'businessUnitCode',
        component: 'Text',
        label: i18n.t("BusinessUnitCode")
    },
    {
        name: 'maintainerCode',
        component: 'Text',
        label: i18n.t("MaintainerCode")
    },
    {
        name: 'code',
        component: 'Text',
        label: i18n.t("Code")
    },
]

export const validationSchema = yup.object({
    name: yup.string().min(2, i18n.t("branchNameMinLength")).max(200,i18n.t("branchNameMaxLength")).required(i18n.t("codeIdentifier")),
    address: yup.string().min(2, i18n.t("branchAdressMinLength")).max(400,i18n.t("branchAdressMaxLength")).required(i18n.t("branchAdress")),
    businessUnitCode: yup.string().min(2, i18n.t("branchUnitCodeMinLength")).max(20,i18n.t("branchUnitCodeMaxLength")).required(i18n.t("branchUnitCode")),
    city: yup.string().min(2, i18n.t("branchCityLength")).required(i18n.t("branchCity")),
    code: yup.string().min(5, i18n.t("branchCodeLength")).required(i18n.t("branchCode")),
    maintainerCode: yup.string().min(5, i18n.t("branchMaintainerMinLength")).max(i18n.t("branchMaintainerMaxLength")).required(i18n.t("branchMaintainer")),
});