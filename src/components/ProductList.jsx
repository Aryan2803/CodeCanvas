import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
    return (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {products.map(product => (
                <div key={product.id} className="col mb-3">
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    );
};

export default ProductList;
