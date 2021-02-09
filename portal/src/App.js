/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';

import './App.scss';
import axios from './helper/axios'

// Load toast
import ToastMessage from './helper/toastContainer';
import { toast } from 'react-toastify';

// Components
import Header from './components/Header';
import ProductHeader from './components/ProductHeader';
import ProductList from './components/ProductList';

function App() {
  // const [cartList, addToCart] = useState([]);
  const [key, setKey] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitError, setIsSubmitError] = useState(false);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const delay = async (ms = 1000) => {
    await new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    // Load key if any
    const _key = localStorage.getItem('outliant-product-key');
    if (!_key) {
      getProductKey();
    } else {
      setKey(_key);
    }
  }, [])

  // If key is set, call getCart
  useEffect(() => {
    if (key) {
      getCart();
    }
  }, [key])

  const getProductKey = () => {
    axios
      .get('key')
      .then(response => {
        const { key } = response.data;
        localStorage.setItem('outliant-product-key', key);
        setKey(key);
      })
      .catch(() => toast.error('Failed! Fetching API key.'));
  }

  const getProducts = () => {
    setLoadingProducts(true);
    setProducts([]);

    axios
      .get(`catalog?key=${key}`)
      .then(response => {
        (async () => {
          await delay();

          setProducts(response.data);
          setLoadingProducts(false);
        })();
      })
      .catch(() => {
        toast.error('Failed! Fetching products.');
        setLoadingProducts(false);
      });
  }

  const addProduct = (data) => {
    setIsSubmitError(false);
    setSubmitting(true);

    axios
      .post(`catalog?key=${key}`, { ...data })
      .then(response => {
        (async () => {
          await delay();

          setProducts(response.data);
          setSubmitting(false);
          toast.success('Success! Added new product.');
        })();
      })
      .catch(() => {
        toast.error('Failed! Adding new product.');
        setIsSubmitError(true);
        setSubmitting(false);
      });
  }

  const getCart = () => {
    setLoadingCart(true);
    setCart([]);

    axios
      .get(`cart?key=${key}`)
      .then(response => {
        setCart(response.data);
        setLoadingCart(false);
      })
      .catch(() => {
        toast.error('Failed! Fetching cart.');
        setSubmitting(false);
      });
  }

  const addToCart = (id) => {
    axios
      .post(`cart/${id}?key=${key}`)
      .then(response => {
        setCart(response.data);
        toast.success('Success! Added product to cart.');
      })
      .catch(() => {
        toast.error('Failed! Adding product to cart.');
        setSubmitting(false);
      });
  }

  const updateProduct = ({ id, quantity }) => {
    axios
      .put(`cart?key=${key}`, { id, quantity })
      .then(response => {
        setCart(response.data);
      })
      .catch(() => {
        toast.error('Failed! Updating product in cart.');
        setSubmitting(false);
      });
  }

  const deleteProduct = (id) => {
    axios
      .delete(`cart/${id}?key=${key}`)
      .then(response => {
        setCart(response.data);
      })
      .catch(() => {
        toast.error('Failed! Removing product to cart.');
        setSubmitting(false);
      });
  }

  const checkout = () => {
    setLoadingCheckout(true);

    axios
      .delete(`cart/checkout?key=${key}`)
      .then(response => {
        setCart(response.data);
        setLoadingCheckout(false);
        toast.success('Success! Checked out cart.');
      })
      .catch(() => {
        toast.error('Failed! Checking out cart.');
        setLoadingCheckout(false);
      });
  }

  return (
    <React.Fragment>
      <Header
        loadingCart={loadingCart}
        cart={cart}
        updateProduct={updateProduct}
        deleteProduct={deleteProduct}
        loadingCheckout={loadingCheckout}
        checkout={checkout}
      />
      <Container className="main-container">
        <ProductHeader
          hasKey={key ? true : false}
          loadingProducts={loadingProducts}
          submitting={submitting}
          isSubmitError={isSubmitError}
          getProducts={getProducts}
          addProduct={addProduct}
        />
        <ProductList
          products={products}
          addToCart={addToCart}
        />
      </Container>
      <ToastMessage />
    </React.Fragment>
  );
}

export default App;
