import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { baseUrl } from '../assets/constant';
import ProductCard from './ProductCard';

export default function ProductListing() {
    const [products, setProducts] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [filterEnabled, setFilterEnabled] = useState(false); // Toggle filter

    const fetchProducts = useCallback(async () => {
        if (loading) return; // Prevent duplicate calls

        setLoading(true);
        try {
            const { data } = await axios.get(`${baseUrl}/product/all`, {
                params: {
                    min_price: filterEnabled ? minPrice : undefined,
                    max_price: filterEnabled ? maxPrice : undefined,
                    page: filterEnabled ? 1 : page, // Page is always 1 for filters
                },
            });

            if (data.products.length === 0) {
                setHasMore(false); // Stop infinite scroll if no products are returned
            } else {
                setProducts((prevProducts) =>
                    filterEnabled || page === 1
                        ? data.products // Replace products for filter or first page
                        : [...prevProducts, ...data.products] // Append for infinite scroll
                );
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [minPrice, maxPrice, page, filterEnabled, loading]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handlePriceFilterSubmit = (e) => {
        e.preventDefault();
        if (filterEnabled) {
            setPage(1); // Reset page to 1 for filter
            setHasMore(true); // Allow filtering to fetch fresh results
            fetchProducts();
        }
    };

    const handleToggleFilter = () => {
        setFilterEnabled((prev) => !prev);
        setPage(1); // Reset page
        setProducts([]); // Clear product list
        setHasMore(!filterEnabled); // Re-enable infinite scroll when disabling filter
    };

    useEffect(() => {
        if (filterEnabled) return; // Disable infinite scroll when filtering

        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 50
            ) {
                if (!loading && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading, hasMore, filterEnabled]);

    return (
        <div className="product-listing-container">
            {/* Enable/Disable Filter */}
            <div className="filter-toggle d-flex justify-content-center mb-4">
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="enableFilter"
                        checked={filterEnabled}
                        onChange={handleToggleFilter}
                    />
                    <label className="form-check-label" htmlFor="enableFilter">
                        Enable Filter
                    </label>
                </div>
            </div>

            {/* Price Filter */}
            {filterEnabled && (
                <div className="price-filter d-flex justify-content-center mb-4">
                    <form onSubmit={handlePriceFilterSubmit} className="d-flex gap-3 align-items-center">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Min Price"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Max Price"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary">
                            Apply
                        </button>
                    </form>
                </div>
            )}

            {/* Product List */}
            <div className="d-flex gap-4 flex-wrap justify-content-center">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>

            {/* Spinner while loading */}
            {loading && (
                <div className="spinner-container d-flex justify-content-center mt-4">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {/* End of Products Message */}
            {!hasMore && !loading && (
                <div className="text-center mt-4">
                    <p>{filterEnabled ? 'No products match the filter.' : 'No more products to load.'}</p>
                </div>
            )}
        </div>
    );
}
