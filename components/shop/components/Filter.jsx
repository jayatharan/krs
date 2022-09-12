import React from 'react'
import { Box } from '../../../shared/Box'
import { Button } from '../../../shared/Button'
import { FilterIcon } from '../../../shared/Icons'

const Filter = () => {
    return (
        <Box sx={{display:'flex', justifyContent:'flex-end', paddingTop:'10px'}}>
            <Button variant='outlined' size='small' startIcon={<FilterIcon />}>Filter</Button>
        </Box>
    )
}

export default Filter