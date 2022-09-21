import React, { useEffect, useState } from 'react'
import OrderApi from '../../apis/OrderApi'
import { Box } from '../../shared/Box'
import { Button } from '../../shared/Button'
import { PageContainer } from '../../shared/Container'
import { Grid } from '../../shared/Grid'
import OrderTile from './components/OrderTile'

const MyOrders = () => {
    const [orders, setOrders] = useState([])
    const [page, setPage] = useState(1)
    const limit = 20;
    const [empty, setEmpty] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true)
        OrderApi.myOrders({page, limit})
        .then(response => {
            if(page === 1){
                setOrders(response.data)
            }else{
                if(response.data.length == 0){
                    setEmpty(true);
                }
                setOrders((prev)=>([...orders, ...response.data]))
            }
            setLoading(false);
        })
    },[page])

    return (
        <PageContainer loading={loading}>
            <Box sx={{paddingTop:'30px'}}>
                <Grid container spacing={2}>
                    {orders.map(o => (
                        <Grid item key={o._id} xs={12} sm={6} md={4} lg={4}>
                            <OrderTile order={o} />
                        </Grid>
                    ))}
                </Grid>
                {(!empty && orders.length>0)&&(
                    <Box sx={{display:'flex', justifyContent:'flex-end', marginTop:1}}>
                        <Button disabled={loading} onClick={()=>setPage(page+1)}>Load More</Button>
                    </Box>
                )}
            </Box>
        </PageContainer>
    )
}

export default MyOrders