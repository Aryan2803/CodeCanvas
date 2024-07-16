// ProductCard.js

import React from 'react';
import { Card, Button } from 'react-bootstrap';

const placeholderUrl = 'https://via.placeholder.com/150'; // Example placeholder image URL

const ProductCard = ({ product }) => {
    return (
        <Card style={{ width: '18rem', margin: '10px' }}>
            <Card.Img variant="top" src={product.image ? product.image : placeholderUrl} />
            <Card.Body>
                <Card.Title>{product.productName || product.name}</Card.Title>
                {/* Ensure other fields are displayed correctly */}
                <Card.Text>
                    <strong>Company:</strong> {product.company}<br />
                    <strong>Price:</strong> ${product.price}<br />
                    <strong>Rating:</strong> {product.rating}<br />
                    <strong>Discount:</strong> {product.discount}%<br />
                    <strong>Availability:</strong> {product.availability ? 'Yes' : 'No'}
                </Card.Text>
                <Button variant="primary">Add to Cart</Button>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
