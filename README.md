# Project Summary

This is a 1 hour test project, you will require to create a fully functional CRUD ( GET, PUT, POST, DELETE ). The majority of the React application will already be built for you. part of this project will be exploring the API and finding the appropriate endpoints to utilize to build the required functionality. utilize API endpoints that help you accomplish the goals of each feature and utilize the necessary `react hooks` that suits to your need.

To help you understand wether or not you API requests are failing or successful, we've used a UI tool to build in the ability to visualize notifications in the app. The specific style we use is referred to as a "toast" notification. To take advantage of this capability to visualize successful and failed API requests, an additional line of code will need to be added to [axios](https://www.npmjs.com/package/axios) requests, examples of which can be found below.

* Success: `toast.success("Success!");`
* Failure: `toast.error("Failed!");`

### Setup

* `Fork` and `clone` this repository.
* `cd` into the project directories.
* Run `npm install`.
* Run `npm start`.

### API Documentation

The Base API url is located at `portal/src/helper/axios.jsx`
```
// Default base url
import axios from 'axios'

export default axios.create({
  baseURL: 'https://localhost:5000/products'
})
```

Please reference [this](api/README.md) API documentation when completing the project steps.

# Requirements

First use `useEffect` hook to fetch display list of available products in the catalog and display it in a form of table. for the design you can free to use any of css framework you choose.

### Step 1: GET

In this first step, we'll make use of `axios` to get the `Get available products` button to work. When fetching data from a server you should always use a `GET` request.

* Open `./src/App.js`.
* Locate the pre-made `getProducts()` method.
* Using `axios` and the provided API documentation make a `GET` request to receive all the products.
	* If the request is successful, use `addToCart()` state to update the value of `cartList` and use `toast.success` to fetch success message.
	* If the request is unsuccessful, use `toast.error`	.
	
### Step 2: UPDATE

In this step, we'll make use of `axios` to update the added product in the cart. When modifying/updating data on a server, typically, you'll use a `PUT` request.

* Open `./src/App.js`.
* Locate the pre-made `updateProduct()` method and add the necessary parameters.
* If the request is successful, use `addToCart()` to update the value of `cartList` and use `toast.success` to display success message.
* If the request is unsuccessful, use toast.error.

### Step 3: CREATE

In this step, we'll make use of `axios` to get the `Add a Product` button to work. When creating new data on a server you should always use a `POST` request.

* Open `./src/App.js`.
* Locate the pre-made `addProducts()` method.
* If the request is successful, use `addToCart()` to update the value of `cartList` and use `toast.success`.
* If the request is unsuccessful, use `toast.error`.

### Step 4 : DELETE

In this step, we'll make use of `axios` to delete products. When deleting data on a server you should always use a DELETE request.


* Open `./src/App.js`.
* Locate the pre-made `deleteProduct()` method and add the necessary parameter.
* If the request is successful, use `addToCart()` to update the value of `cartList` and use `toast.success`.
* If the request is unsuccessful, use `toast.error`.

# Good Luck!
