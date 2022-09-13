import React, { useContext, useRef, useState } from 'react'
import signupFormInitialValue from './signupFormInitialValue'
import signupFormModel from './signupFormModel'
import signupFormValidationSchema from './signupFormValidationSchema'
import { Form, Formik } from "formik";
import FormikTextField from '../../../shared/formikFields/FormikTextField';
import { AuthContext } from '../../../auth/AuthProvider';
import FormikMobileField from '../../../shared/formikFields/FormikMobileField';
import {Button} from '../../../shared/Button';
import AuthApi from '../../../apis/AuthApi';
import { Box } from '../../../shared/Box';
import { Alert } from '../../../shared/Alert';
import { useRouter } from 'next/router';
import { setCookie } from '../../../utils/CookieAccess';
import { CircularProgress, LinearProgress } from '../../../shared/Progress';

const {
    username, 
    email,
    password,
    mobile,
    confirmPassword
} = signupFormModel;

const SignUpForm = () => {
    const [progress, setProgress] = useState(false);
    const formikRef = useRef(null);
    const authContext = useContext(AuthContext);
    const [error, setError] = useState('');
    const router = useRouter()

    const handleSubmit = async (values, actions) => {
        setProgress(true)
        AuthApi.register(values)
        .then(response => {
            AuthApi.login({mobile:values.mobile, password:values.password}).then(res => {
                setCookie("access-token", res.data.accessToken);
                setCookie("refresh-token", res.data.refreshToken);
                window.location.href = '/'
                setProgress(false)
            }).catch((error)=>{
                router.push('/login')
                setProgress(false)
            })
        }).catch((error)=>{
            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message)
            }else{
                setError('Something went wrong')
            }
            setProgress(false)
        })
    }

    return (
        <Box>
            {error&&(
                <Alert severity="error" sx={{marginBottom:2}}>{error}</Alert>
            )}
            <Formik 
                innerRef={formikRef}
                initialValues={signupFormInitialValue}
                onSubmit={handleSubmit}
                validationSchema={signupFormValidationSchema}
            >
                {(formik) => (
                    <Form>
                        <FormikTextField 
                            name={username.name}
                            label={username.label}
                            textFieldProps={{
                                size:'small',
                                fullWidth:true,
                                sx:{marginBottom:2}
                            }}
                        />
                        <FormikTextField 
                            name={email.name}
                            label={email.label}
                            textFieldProps={{
                                size:'small',
                                fullWidth:true,
                                type:'email',
                                sx:{marginBottom:2}
                            }}
                        />
                        <FormikMobileField 
                            name={mobile.name}
                            label={mobile.label}
                            formControlProps={{
                                fullWidth:true,
                                size:'small',
                                sx:{marginBottom:2}
                            }}
                        />
                        <FormikTextField 
                            name={password.name}
                            label={password.label}
                            textFieldProps={{
                                size:'small',
                                fullWidth:true,
                                type:'password',
                                sx:{marginBottom:2}
                            }}
                        />
                        <FormikTextField 
                            name={confirmPassword.name}
                            label={confirmPassword.label}
                            textFieldProps={{
                                size:'small',
                                fullWidth:true,
                                type:'password',
                                sx:{marginBottom:2}
                            }}
                        />
                        <Button disabled={progress} type='submit' variant='outlined' fullWidth={true} sx={{marginTop:2}}>Sign Up</Button>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}

export default SignUpForm