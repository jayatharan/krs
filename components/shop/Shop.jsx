import React, { useEffect, useState } from 'react'
import { Box } from '../../shared/Box'
import { PageContainer } from '../../shared/Container'
import {useRecoilState} from "recoil";
import { useRouter } from 'next/router'
import { SubCategoryListData } from '../../recoil/subCategoryListAtom.js/SubCategoryListAtom';
import CategoryApi from '../../apis/CategoryApi';
import { Grid } from '../../shared/Grid';
import Product from './components/Product';
import Filter from './components/Filter';
import Search from './components/Search';
import { Button } from '../../shared/Button';

const Shop = ({categoryId}) => {
    const router = useRouter();
    const [subCategories, setSubCategories] = useRecoilState(SubCategoryListData);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1)
    const limit = 20;
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({
        subCategoryIds:[]
    })

    const handleFilterChange = (data)=>{
        setFilter(data);
    }

    useEffect(()=>{
        if(categoryId){
            setLoading(true);
            CategoryApi.getProductsAsync(categoryId, {page, limit}).then(response=>{
                setLoading(false);
                if(page === 1){
                    setProducts(response.data);
                }else{
                    setProducts((prev)=>([...prev, ...response.data]));
                }
            })
        }
    },[page, categoryId])

    return (
        <PageContainer loading={loading}>
            <Search />
            <Filter />
            <Box sx={{paddingY:'10px'}}>
                <Grid container spacing={2}>
                    {products.map(p => (
                        <Grid key={p._id} item xs={6} sm={4} md={3} lg={2}>
                            <Product product={p} />
                        </Grid>
                    ))}
                </Grid>
                {products.length>0&&(
                    <Box sx={{display:'flex', justifyContent:'flex-end', marginTop:1}}>
                        <Button disabled={loading} onClick={()=>setPage(page+1)}>Load More</Button>
                    </Box>
                )}
            </Box>
        </PageContainer>
    )
}

export default Shop