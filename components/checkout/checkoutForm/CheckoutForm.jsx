import React, { useContext, useEffect, useRef, useState } from 'react'
import checkoutFormModel from './checkoutFormModel'
import checkoutFormInitialValue from './checkoutFormInitialValue'
import checkoutFormValidationSchema from './checkoutFormValidationSchema'
import { Form, Formik } from "formik";
import FormikTextField from '../../../shared/formikFields/FormikTextField';
import { AuthContext } from '../../../auth/AuthProvider';
import FormikMobileField from '../../../shared/formikFields/FormikMobileField';
import {Button} from '../../../shared/Button';
import { Box } from '../../../shared/Box';
import { useRouter } from 'next/router';
import OrderApi from '../../../apis/OrderApi';
import FormikDateTimeField from '../../../shared/formikFields/FormikDateTimeField';
import { deleteCookie, setCookie } from '../../../utils/CookieAccess';

const {
    mobile,
    request,
    deliveryDate
} = checkoutFormModel;

const CheckoutForm = () => {
    const [progress, setProgress] = useState(false);
    const formikRef = useRef(null);
    const authContext = useContext(AuthContext);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (values, actions) => {
        const order = {...authContext.order}
        OrderApi.customer(order._id, values)
        .then(response=>{
            deleteCookie('order-id');
            OrderApi.initiateOrderAsync({}).then(res => {
                authContext.setOrder(res.data);
                setCookie('order-id', response.data._id, 12)
                router.push(`/order/${order._id}`);
            })
        }).catch((error)=>{

        })
    }

    useEffect(()=>{
        if(formikRef.current){
            if(authContext.auth.authenticated){
                formikRef.current.setFieldValue(mobile.name, authContext.auth.user.mobile)
            }
        }
    },[authContext])

    const isDisabled = () => {
        const res = false;
        if(!authContext.order) res = true;
        else{
            if(authContext.order.cartItems.length == 0) res = true;
        }
        return res;
    }

    return (
        <Box>
            <Formik 
                innerRef={formikRef}
                initialValues={checkoutFormInitialValue}
                onSubmit={handleSubmit}
                validationSchema={checkoutFormValidationSchema}
            >
                {(formik) => (
                    <Form>
                        <FormikMobileField 
                            name={mobile.name}
                            label={mobile.label}
                            formControlProps={{
                                fullWidth:true,
                                size:'small',
                                sx:{marginBottom:2}
                            }}
                        />
                        <FormikDateTimeField 
                            name={deliveryDate.name}
                            label={deliveryDate.label} 
                            textFieldProps={{
                                size:'small', 
                                fullWidth:true
                            }} 
                            formControlProps={{
                                size:'small', 
                                fullWidth:true,
                                sx:{marginBottom:2}
                            }}
                        />
                        <FormikTextField 
                            name={request.name}
                            label={request.label}
                            textFieldProps={{
                                size:'small',
                                fullWidth:true,
                                sx:{marginBottom:2},
                                multiline:true,
                                minRows:4
                            }}
                        />
                        <Button disabled={progress || isDisabled()} type='submit' variant='outlined' fullWidth={true} sx={{marginTop:2}}>Place Order</Button>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}

export default CheckoutForm