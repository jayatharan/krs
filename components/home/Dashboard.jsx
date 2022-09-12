import React from 'react'
import { PageContainer } from '../../shared/Container'
import {useRecoilState} from "recoil";
import { CategoryListData } from '../../recoil/categoryList/CategoryListAtom';
import Category from './components/Category';
import { Box } from '../../shared/Box';
import { Grid } from '../../shared/Grid';

const Dashboard = () => {
    const [categories, setCategories] = useRecoilState(CategoryListData);

    return (
        <PageContainer>
            <Box sx={{paddingY:'10px'}}>
                <Grid container spacing={2}>
                    {categories.map(c => (
                        <Grid key={c._id} item xs={12} sm={6} md={4} lg={4}>
                            <Category category={c} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </PageContainer>
    )
}

export default Dashboard