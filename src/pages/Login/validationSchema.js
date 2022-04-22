import * as yup from 'yup';
import i18n from "i18next";

export const loginSchema = yup.object({
    username: yup.string().min(2, i18n.t("usernameLength")).required(i18n.t("insertUsername")),
    password: yup.string().min(4, i18n.t("passwordLength")).required(i18n.t("insertPassword"))
});