import signupFormModel from "./signupFormModel";

const {
    username, 
    email,
    password,
    mobile,
    confirmPassword
} = signupFormModel;

const signupFormInitialValue = {
    [username.name]:username.initialValue,
    [email.name]:email.initialValue,
    [password.name]:password.initialValue,
    [mobile.name]:mobile.initialValue,
    [confirmPassword.name]:confirmPassword.initialValue
}

export default signupFormInitialValue;