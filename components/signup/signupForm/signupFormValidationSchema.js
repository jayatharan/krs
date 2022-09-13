import signupFormModel from "./signupFormModel";
import * as yup from "yup";

const {
    username, 
    email,
    password,
    mobile,
    confirmPassword
} = signupFormModel;

const signupFormValidationSchema = yup.object().shape({
    [username.name]: yup.string().required(username.requiredErrorMsg),
    [email.name]: yup
        .string()
        .email("Must Valid Email"),
    [mobile.name]: yup.string().required(mobile.requiredErrorMsg),
    [password.name]: yup
        .string()
        .required(password.requiredErrorMsg),
    [confirmPassword.name]: yup
        .string()
        .required(confirmPassword.requiredErrorMsg)
        .test("password-match", confirmPassword.notMatchedErrorMsg, function (value) {
            return this.parent.password === value;
        })
})

export default signupFormValidationSchema;