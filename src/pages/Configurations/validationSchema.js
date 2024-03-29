import * as yup from 'yup';
import i18n from "i18next";

export const validationSchema = yup.object({
    printer: yup.string().required(i18n.t("choosePrinterName")),
    language: yup.string().required(i18n.t("chooseLanguageName")),
    allowSellsWithZero: yup.boolean(),
    billMessage: yup.string().min(2,i18n.t("messageLength")).required(i18n.t("messageBill")),
    billDescription:  yup.string().min(2,i18n.t("descriptionLength")).max(50,).required(i18n.t("description")),
});