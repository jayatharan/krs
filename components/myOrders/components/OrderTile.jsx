import { useRouter } from 'next/router';
import React from 'react'
import styled from "styled-components";
import { COLORS, ORDER_STATUS } from '../../../application/constants/AppConstants';
import { Box } from '../../../shared/Box';
import { Button } from '../../../shared/Button';
import { Typography } from '../../../shared/Typography';
import { CurrencyFormatter } from '../../../utils/StringProcess';

const OrderContainer = styled(Box)`
    background:${COLORS.primary.white};
    padding:10px;
    box-shadow:4px 8px 12px rgba(30, 30, 30, 0.18);
`

const OrderMobileText = styled(Typography)`
    margin-top:5px;
    font-weight:500;
    font-size:15px;
    line-height:14px;
    color:${COLORS.primary.brown};
`

const OrderStatusText = styled(Typography)`
    margin-top:5px;
    font-weight:500;
    font-size:12px;
    line-height:14px;
    color:${COLORS.primary.black};
`

const OrderTotalText = styled(Typography)`
    margin-top:5px;
    font-weight:500;
    font-size:13px;
    line-height:14px;
    color:${COLORS.primary.black};
`

const OrderTile = ({order}) => {
    const router = useRouter();

    return (
        <OrderContainer>
            <OrderMobileText>Mobile No: {order.mobile}</OrderMobileText>
            <OrderStatusText>Status: {ORDER_STATUS[order.status]}</OrderStatusText>
            <OrderTotalText>Total Qty: {order.totalQuantity}</OrderTotalText>
            <OrderTotalText>Total: {CurrencyFormatter.format(order.total)}</OrderTotalText>
            <Box sx={{marginTop:'5px', display:'flex', justifyContent:'flex-end'}}>
                <Button size='small' onClick={()=>router.push(`/order/${order._id}`)}>View</Button>
            </Box>
        </OrderContainer>
    )
}

export default OrderTile