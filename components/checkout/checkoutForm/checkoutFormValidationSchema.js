import * as yup from "yup";
import checkoutFormModel from "./checkoutFormModel";

const {
    mobile,
    request,
    deliveryDate
} = checkoutFormModel;

const checkoutFormValidationSchema = yup.object().shape({
    [mobile.name]: yup.string().required(mobile.requiredErrorMessage),
    [request.name]: yup.string(),
    [deliveryDate.name]: yup.string().required(deliveryDate.requiredErrorMessage)
})

export default checkoutFormValidationSchema;