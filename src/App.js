import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './components/ProductCard';
import FilterBar from './components/FilterBar';
import SortBar from './components/SortBar';
import Pagination from './components/Pagination';
import { Container, Grid, AppBar, Toolbar, IconButton, Typography, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCompany, setSelectedCompany] = useState('');
    const [sortOption, setSortOption] = useState('price-asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [minRating, setMinRating] = useState(0);
    const [maxRating, setMaxRating] = useState(5);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(5000);
    const [availability, setAvailability] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(false); // State for drawer open/close
    

    const productsPerPage = 10;

    useEffect(() => {
        axios.get('https://json-server.bytexl.app/products')
            .then(response => {
                setProducts(response.data);
                const uniqueCategories = [...new Set(response.data.map(product => product.category))];
                setCategories(uniqueCategories);
                const uniqueCompanies = [...new Set(response.data.map(product => product.company))];
                setCompanies(uniqueCompanies);
                setFilteredProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    useEffect(() => {
        let updatedProducts = [...products];

        // Apply category filter
        if (selectedCategory) {
            updatedProducts = updatedProducts.filter(product => product.category === selectedCategory);
        }

        // Apply company filter
        if (selectedCompany) {
            updatedProducts = updatedProducts.filter(product => product.company === selectedCompany);
        }

        // Apply rating filter
        updatedProducts = updatedProducts.filter(product => product.rating >= minRating && product.rating <= maxRating);

        // Apply price filter
        updatedProducts = updatedProducts.filter(product => product.price >= minPrice && product.price <= maxPrice);

        // Apply availability filter
        if (availability === 'yes' || availability === 'no') {
            updatedProducts = updatedProducts.filter(product => product.availability === (availability === 'yes'));
        }

        // Apply sorting
        switch (sortOption) {
            case 'price-asc':
                updatedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                updatedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                updatedProducts.sort((a, b) => compareProductNames(a.productName, b.productName));
                break;
            case 'name-desc':
                updatedProducts.sort((a, b) => compareProductNames(b.productName, a.productName));
                break;
            case 'rating-asc':
                updatedProducts.sort((a, b) => a.rating - b.rating);
                break;
            case 'rating-desc':
                updatedProducts.sort((a, b) => b.rating - a.rating);
                break;
            case 'discount-asc':
                updatedProducts.sort((a, b) => a.discount - b.discount);
                break;
            case 'discount-desc':
                updatedProducts.sort((a, b) => b.discount - a.discount);
                break;
            default:
                break;
        }

        setFilteredProducts(updatedProducts);
        setCurrentPage(1); // Reset to first page when filters or sort changes
    }, [selectedCategory, selectedCompany, minRating, maxRating, minPrice, maxPrice, sortOption, availability, products]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleCompanyChange = (company) => {
        setSelectedCompany(company);
    };

    const handleRatingChange = (min, max) => {
        setMinRating(min);
        setMaxRating(max);
    };

    const handlePriceChange = (min, max) => {
        setMinPrice(min);
        setMaxPrice(max);
    };

    const handleSortChange = (option) => {
        setSortOption(option);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleAvailabilityChange = (value) => {
        setAvailability(value);
    };

    const handleToggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const currentProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

    // Function to compare product names considering numeric part
    const compareProductNames = (nameA, nameB) => {
        // Split product names into parts
        const partsA = nameA.split(/(\d+)/).filter(Boolean);
        const partsB = nameB.split(/(\d+)/).filter(Boolean);

        // Compare each part sequentially
        for (let i = 0; i < Math.min(partsA.length, partsB.length); i++) {
            let partA = partsA[i];
            let partB = partsB[i];

            // If parts are numeric, convert to numbers for comparison
            if (!isNaN(partA) && !isNaN(partB)) {
                partA = parseInt(partA, 10);
                partB = parseInt(partB, 10);
            }

            // Compare parts
            if (partA < partB) {
                return -1;
            }
            if (partA > partB) {
                return 1;
            }
        }

        // If all parts are equal, compare by length
        return partsA.length - partsB.length;
    };

    return (
        <Router>
            <Container maxWidth={false} disableGutters>
                <AppBar position="static" style={{ width: '100%', marginLeft: 0, marginRight: 0 }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleToggleDrawer}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            CodeCanvas
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={handleToggleDrawer}
                    style={{ width: '280px' }}
                >
                    <FilterBar
                        categories={categories}
                        companies={companies}
                        selectedCategory={selectedCategory}
                        selectedCompany={selectedCompany}
                        minRating={minRating}
                        maxRating={maxRating}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        availability={availability}
                        onCategoryChange={handleCategoryChange}
                        onCompanyChange={handleCompanyChange}
                        onRatingChange={handleRatingChange}
                        onPriceChange={handlePriceChange}
                        onAvailabilityChange={handleAvailabilityChange}
                    />
                    <SortBar sortOption={sortOption} onSortChange={handleSortChange} />
                </Drawer>
                <Grid container spacing={3} style={{ width: '100%', margin: 0 }}>
                    {currentProducts.map(product => (
                        <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                    {currentProducts.length === 0 && (
                        <Grid item xs={12}>
                            <p>No products found.</p>
                        </Grid>
                    )}
                </Grid>
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
                    onPageChange={handlePageChange}
                />
            </Container>
        </Router>
    );
};

export default App;
