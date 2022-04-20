import * as yup from 'yup';
import i18n from "i18next";

export const validationSchema = yup.object({
    username: yup.string().min(2, i18n.t("editProfileNameLength")).required(i18n.t("editProfileName")),
    email: yup.string().email().min(2, i18n.t("editProfileEmailLength")).required(i18n.t("editProfileEmail")),
    phone: yup.number().min(10, i18n.t("editProfilePhoneLength")).required(i18n.t("editProfilePhone")),
    firstName: yup.string().min(4, i18n.t("editProfileNameLength")).required(i18n.t("editProfileName")),
    lastName: yup.string().min(4, i18n.t("editProfileLastNameLength")).required(i18n.t("editProfileLastName")),
    password: yup.string().min(6, i18n.t("editProfilePass")),
    passwordNew : yup.string().min(6, i18n.t("editProfilePass")),
    passwordConfirm: yup.string().min(6, i18n.t("editProfilePass")).when("passwordNew", {
        is: val => (val && val.length > 0 ? true : false),
        then: yup.string().oneOf(
          [yup.ref("passwordNew")],
          i18n.t("editProfileBothPass")
        )
      })
});