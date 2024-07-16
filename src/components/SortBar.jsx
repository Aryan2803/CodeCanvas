import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const SortBar = ({ sortOption, onSortChange }) => {
    const handleSortChange = (e) => {
        onSortChange(e.target.value);
    };

    return (
        <Box sx={{ p: 2 }}>
            <FormControl fullWidth>
                <InputLabel htmlFor="sort-select">Sort By</InputLabel>
                <Select
                    id="sort-select"
                    value={sortOption}
                    onChange={handleSortChange}
                    label="Sort By"
                    fullWidth
                >
                    <MenuItem value="price-asc">Price Low to High</MenuItem>
                    <MenuItem value="price-desc">Price High to Low</MenuItem>
                    <MenuItem value="name-asc">Name A to Z</MenuItem>
                    <MenuItem value="name-desc">Name Z to A</MenuItem>
                    <MenuItem value="rating-asc">Rating Low to High</MenuItem>
                    <MenuItem value="rating-desc">Rating High to Low</MenuItem>
                    <MenuItem value="discount-asc">Discount Low to High</MenuItem>
                    <MenuItem value="discount-desc">Discount High to Low</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default SortBar;
