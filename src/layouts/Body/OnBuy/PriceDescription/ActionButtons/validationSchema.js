import * as yup from 'yup';
import i18n from "i18next";

export const validationSchema = yup.object({
    idCode: yup.string().min(2, i18n.t("codeIdentifierLength")).max(20, "Kodi nuk mund te permbaj me shume se 20 karaktere").required(i18n.t("codeIdentifier"))
});