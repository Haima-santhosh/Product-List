import React, { useState } from 'react';
import { products as allProducts } from '../data/productData';
import './ProductDisplay.css';

const ProductDisplay = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('');

  
  const filtered = allProducts
    .filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === 'All' || p.category === category)
    )
    .sort((a, b) => {
      if (sort === 'lowToHigh') return a.price - b.price;
      if (sort === 'highToLow') return b.price - a.price;
       if (sort === 'ratingHigh') return b.rating - a.rating;
  if (sort === 'ratingLow') return a.rating - b.rating;

      return 0;
    });

  return (
    <div className="py-4">
      <h1 className="bg-info text-white text-center py-3 mb-4">Mobile Product List</h1>

      {/* Search & Filters */}
      <div className="row mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Android">Android</option>
            <option value="iOS">iOS</option>
            <option value="Feature Phone">Feature Phone</option>
          </select>
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
            <option value="ratingHigh">Rating: High to Low</option>
  <option value="ratingLow">Rating: Low to High</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="row g-4">
        {filtered.map(product => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={product.id}>
            <div className="card h-100 shadow-sm p-2 border-0 product-card">
              <img
                src={product.image}
                className="card-img-top mx-auto product-image"
                alt={product.name}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{product.name}</h5>
                <p className="text-muted">{product.category}</p>
                <p className="fw-bold text-success">₹{product.price}</p>
                <p className="text-warning">⭐ {product.rating}</p>

                <button
                  className="btn btn-outline-primary w-100"
                onClick={() => console.log(`Added to cart: ${product.name}`)}

                >
                  Add to Cart
                </button>

              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-center text-danger">No products found.</p>}
      </div>
    </div>
  );
};

export default ProductDisplay;
