import React from 'react'
import { Box } from '../../../shared/Box'
import { TextField } from '../../../shared/TextField'
import styled from "styled-components";
import { COLORS } from '../../../application/constants/AppConstants';
import { useState } from 'react';
import { useEffect } from 'react';
import { LinearProgress } from '../../../shared/Progress';
import ProductApi from '../../../apis/ProductsApi';
import { Grid } from '../../../shared/Grid';
import Product from './Product';
import { Modal } from '../../../shared/Modal';
import { CartIcon, SearchClose, SearchCloseIcon } from '../../../shared/Icons';
import { IconButton } from '@mui/material';

const Search = () => {

    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [showSearch, setShowSearch] = useState(false);

    useEffect(()=>{
        if(search){
            setLoading(true);
            ProductApi.getProductsAsync({search, page:1, limit:20})
            .then((response)=>{
                setLoading(false);
                setProducts(response.data);
            })
        }else{
            setProducts([])
            setLoading(false);
        }
    },[search])

    return (
        <Box maxWidth='md' sx={{marginX:'auto', paddingTop:1, position:'relative'}}>
            <TextField 
                size='small' 
                fullWidth={true} 
                placeholder='Search Product'
                onClick={()=>setShowSearch(true)}
                sx={{background:COLORS.primary.white}}
            />
            <Modal
                open={showSearch}
            >
                <Box maxWidth={'md'} sx={{padding:2, marginX:'auto'}}>
                    <Box sx={{display:'flex'}}>
                        <TextField 
                            size='small' 
                            fullWidth={true} 
                            placeholder='Search Product'
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                            sx={{background:COLORS.primary.white, marginRight:'2px'}}
                        />
                        <Box sx={{background:COLORS.primary.white, borderRadius:'5px', display:'flex', alignItems:'center'}}>
                            <IconButton size='small' onClick={()=>{setSearch(''), setShowSearch(false)}}>
                                <SearchCloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    {loading&&(
                        <LinearProgress />
                    )}
                    <Box sx={{padding:1, background:COLORS.primary.white, marginX:'auto', marginTop:'20px', maxHeight:'80vh', overflowY:'auto'}}>
                        <Grid container spacing={2}>
                            {products.map(p => (
                                <Grid key={p._id} item xs={6} sm={4} md={3} lg={3}>
                                    <Product product={p} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}

export default Search