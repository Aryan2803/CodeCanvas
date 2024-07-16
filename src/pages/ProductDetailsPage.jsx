// src/pages/ProductDetailsPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import { fetchProductById } from '../services/productService';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductById(id).then((response) => {
      setProduct(response.data);
    });
  }, [id]);

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4">{product.productName}</Typography>
      <Box mt={2}>
        <img
          src={`https://via.placeholder.com/300?text=${product.productName}`}
          alt={product.productName}
          width="300"
        />
        <Typography variant="h6">Company: {product.company}</Typography>
        <Typography variant="body1">Category: {product.category}</Typography>
        <Typography variant="body1">Price: ${product.price}</Typography>
        <Typography variant="body1">Rating: {product.rating}</Typography>
        <Typography variant="body1">Discount: {product.discount}%</Typography>
        <Typography variant="body1">Availability: {product.availability}</Typography>
      </Box>
    </Container>
  );
};

export default ProductDetailsPage;
