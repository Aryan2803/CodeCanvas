import React from 'react';
import { Pagination as MuiPagination, Stack } from '@mui/material';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handleChange = (event, value) => {
        onPageChange(value);
    };

    return (
        <Stack spacing={2} sx={{ my: 3 }} justifyContent="center">
            <MuiPagination
                count={totalPages}
                page={currentPage}
                onChange={handleChange}
                color="primary"
                size="large"
                siblingCount={1}
                boundaryCount={1}
            />
        </Stack>
    );
};

export default Pagination;
