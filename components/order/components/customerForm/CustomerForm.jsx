import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import OrderApi from '../../../../apis/OrderApi'
import { Box } from '../../../../shared/Box'
import { Button } from '../../../../shared/Button'
import DateTimePicker from '../../../../shared/DateTimePicker'
import { TextField } from '../../../../shared/TextField'
import {Alert} from '../../../../shared/Alert'
import { ORDER_STATUS } from '../../../../application/constants/AppConstants'

const CustomerForm = ({order}) => {
    const [customerOrder, setCustomerOrder] = useState({
        mobile:'',
        request:'',
        deliveryDate:'',
        status:'',
        address:{
            address:''
        }
    })
    const [initialDate, setInitialDate] = useState('');
    const router = useRouter();

    useEffect(()=>{
        if(order){
            setCustomerOrder({
                mobile:order.mobile,
                request:order.request,
                deliveryDate:order.deliveryDate,
                status:order.status,
                address:order.address
            })
            setInitialDate(order.deliveryDate);
        }
    },[order])

    const handleUpdateDetails = () => {
        OrderApi.customer(order._id, customerOrder)
        .then(response=>{
            router.reload(window.location.pathname)
        })
    }

    const cancelOrder = () => {
        OrderApi.customer(order._id, {...customerOrder, status:'cancelled'})
        .then(response=>{
            router.reload(window.location.pathname)
        })
    }

    return (
        <Box sx={{marginTop:2}}>
            {order.status=='cancelled'?(
                <Alert severity='error' sx={{marginBottom:2}}>{ORDER_STATUS[order.status]}</Alert>
            ):(
                <Alert icon={false} severity="success" sx={{marginBottom:2}}>{ORDER_STATUS[order.status]}</Alert>
            )}
            <TextField 
                name='mobile'
                label='Mobile No'
                fullWidth={true}
                size='small'
                value={customerOrder.mobile}
                sx={{marginBottom:2}}
                helperText='Mobile No cannot be change'
                inputProps={{readOnly:true}}
            />
            <TextField 
                name='request'
                label='Additional Requests'
                fullWidth={true}
                size='small'
                value={customerOrder.request}
                onChange={(e)=>{setCustomerOrder((prev)=>({...prev, request: e.target.value}))}}
                sx={{marginBottom:2}}
                multiline={true}
                minRows={3}
            />
            <DateTimePicker 
                initialDate={initialDate}
                textFieldProps={{
                    size:'small', 
                    fullWidth:true,
                    sx:{marginBottom:2}
                }}
                handleChange={(value)=>{setCustomerOrder((prev)=>({...prev, deliveryDate:value}))}}
            />
            <TextField 
                name='address'
                label='Delivery Address'
                fullWidth={true}
                size='small'
                value={customerOrder.address.address}
                onChange={(e)=>{setCustomerOrder((prev)=>({...prev, address:{address: e.target.value}}))}}
                sx={{marginBottom:2}}
                multiline={true}
                minRows={3}
            />
            {(order.status=='waiting')&&(
                <>
                    <Button variant='outlined' onClick={handleUpdateDetails} fullWidth={true} sx={{marginTop:1}}>UPDATE DETAILS</Button>
                    {/* <Button variant='outlined' color='error' onClick={cancelOrder} fullWidth={true} sx={{marginTop:1}}>Cancel Order</Button> */}
                </>
            )}
        </Box>
    )
}

export default CustomerForm