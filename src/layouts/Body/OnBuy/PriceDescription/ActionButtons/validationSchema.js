import * as yup from 'yup';
import i18n from "i18next";

//.required(i18n.t("codeIdentifier"))
//.min(2, i18n.t("codeIdentifierLength")).max(20, i18n.t("codeIdentifierLength"))

export const validationSchema = yup.object({
    idCode: yup.string()
    .min(2, "Kodi Identifikues duhet te kete me shume se 2 karaktere dhe me pak se 20 karaktere")
    .max(20, "Kodi Identifikues duhet te kete me shume se 2 karaktere dhe me pak se 20 karaktere")
    .required("Ju lutem vendosni Kodin Identifikues")
});