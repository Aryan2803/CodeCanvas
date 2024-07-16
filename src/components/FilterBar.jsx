import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const FilterBar = ({
    categories,
    companies,
    selectedCategory,
    selectedCompany,
    minRating,
    maxRating,
    minPrice,
    maxPrice,
    onCategoryChange,
    onCompanyChange,
    onRatingChange,
    onPriceChange,
    availability,
    onAvailabilityChange
}) => {
    const [minRatingInput, setMinRatingInput] = useState(minRating.toString());
    const [maxRatingInput, setMaxRatingInput] = useState(maxRating.toString());
    const [minPriceInput, setMinPriceInput] = useState(minPrice.toString());
    const [maxPriceInput, setMaxPriceInput] = useState(maxPrice.toString());

    const handleMinRatingChange = (e) => {
        const value = e.target.value;
        setMinRatingInput(value);
        onRatingChange(parseInt(value), parseInt(maxRatingInput));
    };

    const handleMaxRatingChange = (e) => {
        const value = e.target.value;
        setMaxRatingInput(value);
        onRatingChange(parseInt(minRatingInput), parseInt(value));
    };

    const handleMinPriceChange = (e) => {
        const value = e.target.value;
        setMinPriceInput(value);
        onPriceChange(parseInt(value), parseInt(maxPriceInput));
    };

    const handleMaxPriceChange = (e) => {
        const value = e.target.value;
        setMaxPriceInput(value);
        onPriceChange(parseInt(minPriceInput), parseInt(value));
    };

    return (
        <Box sx={{ p: 2 }}>
            <label style={{ marginBottom: '10px' }}>Filters: </label>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel htmlFor="category-filter">Category</InputLabel>
                <Select
                    id="category-filter"
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    label="Category"
                    fullWidth
                >
                    <MenuItem value="">All</MenuItem>
                    {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                            {category}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel htmlFor="company-filter">Company</InputLabel>
                <Select
                    id="company-filter"
                    value={selectedCompany}
                    onChange={(e) => onCompanyChange(e.target.value)}
                    label="Company"
                    fullWidth
                >
                    <MenuItem value="">All</MenuItem>
                    {companies.map((company) => (
                        <MenuItem key={company} value={company}>
                            {company}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Box sx={{ mb: 2 }}>
                <TextField
                    type="number"
                    id="min-rating"
                    label="Min Rating"
                    value={minRatingInput}
                    onChange={handleMinRatingChange}
                    fullWidth
                />
            </Box>
            <Box sx={{ mb: 2 }}>
                <TextField
                    type="number"
                    id="max-rating"
                    label="Max Rating"
                    value={maxRatingInput}
                    onChange={handleMaxRatingChange}
                    fullWidth
                />
            </Box>

            <Box sx={{ mb: 2 }}>
                <TextField
                    type="number"
                    id="min-price"
                    label="Min Price"
                    value={minPriceInput}
                    onChange={handleMinPriceChange}
                    fullWidth
                />
            </Box>
            <Box sx={{ mb: 2 }}>
                <TextField
                    type="number"
                    id="max-price"
                    label="Max Price"
                    value={maxPriceInput}
                    onChange={handleMaxPriceChange}
                    fullWidth
                />
            </Box>
        </Box>
    );
};

export default FilterBar;
