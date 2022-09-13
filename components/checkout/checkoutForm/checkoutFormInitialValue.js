import checkoutFormModel from "./checkoutFormModel";

const {
    mobile,
    request,
    deliveryDate
} = checkoutFormModel;

const checkoutFormInitialValue = {
    [mobile.name]:'',
    [request.name]:'',
    [deliveryDate.name]:new Date().toISOString(),
    'status':'waiting'
}

export default checkoutFormInitialValue;