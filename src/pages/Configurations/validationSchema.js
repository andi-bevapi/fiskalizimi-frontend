import * as yup from 'yup';
import i18n from "i18next";

export const validationSchema = yup.object({
    printer: yup.string().required(i18n.t("choosePrinterName")),
    language: yup.string().required(i18n.t("chooseLanguageName")),
    allowSellsWithZero: yup.boolean(),
    messageBill: yup.string().min(2,i18n.t("messageLength")).required(i18n.t("messageBill")),
    description:  yup.string().min(2,i18n.t("descriptionLength")).required(i18n.t("description")),
});