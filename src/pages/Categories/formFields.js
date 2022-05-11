import * as yup from 'yup';
import i18n from "i18next";

export const formFields = [
    {
        name: 'name',
        component: 'Text',
        label: i18n.t("Name")
    },
    {
        name: 'branchId',
        component: 'Select',
        label: i18n.t("branch"),
        options: [],
        identifier: 'branchList',
      },    
]

export const validationSchema = yup.object({
    name: yup.string().min(2, i18n.t("categoryNameLength")).required(i18n.t("categoryName")),
});