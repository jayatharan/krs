import React from 'react'
import { useField } from 'formik';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { Box } from '../Box';
import { FormControl, FormHelperText } from '@mui/material';

const FormikMobileField = ({name, label=undefined, formControlProps=undefined}) => {
    const [field, meta, helper] = useField(name);

    const isError = () => {
        if(meta.touched && meta.error) return true;
        return false;
    }

    const renderHelperText = ()=>{
        if(meta.error && meta.touched) {
            return meta.error;
        }
        return '';
    }

    return (
        <FormControl {...formControlProps} error={isError()}>
            <PhoneInput
                country={'lk'}
                value={field.value}
                onChange={helper.setValue}
                containerStyle={{width:'100%'}}
                inputStyle={{width:'100%', height:'35px'}}
                placeholder='+9477222222'
                specialLabel={label}
            />
            {renderHelperText()&&(
                <FormHelperText>{renderHelperText()}</FormHelperText>
            )}
        </FormControl>
    )
}

export default FormikMobileField