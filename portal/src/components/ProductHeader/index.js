import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function AddProduct({
	hasKey,
	loadingProducts,
	submitting,
	isSubmitError,
	getProducts,
	addProduct
}) {
	const [show, setShow] = useState(false);
	const [form, setForm] = useState(null);
	const categories = [{
		value: 'hat',
		text: 'Hat'
	}, {
		value: 'shirt',
		text: 'Shirt'
	}, {
		value: 'swag',
		text: 'Swag'
	}, {
		value: 'cold weather',
		text: 'Cold weather'
	}];

	const onToggleModal = () => setShow(!show);
	const onSubmitForm = (e) => {
		e.preventDefault();

		const _form = e.target;
		const name = _form['name'].value;
		const description = _form['description'].value;
		const price = _form['price'].value;
		const image = _form['image'].value;
		const category = _form['category'].value;

		setForm(_form);
		addProduct({ name, description, price, image, category });
	}

	// Reset form if successfuly added a product
	useEffect(() => {
		if (form && !submitting && !isSubmitError) {
			form.reset();
			setForm(null);
		}
	}, [form, submitting, isSubmitError])

	return (
		<>
			<div className="d-flex justify-content-between mb-4">
				<Button variant="success" onClick={getProducts} disabled={!hasKey || loadingProducts}>{loadingProducts ? 'Loading products...' : 'Get available products'}</Button>
				<Button variant="success" onClick={onToggleModal}>Add Product</Button>
			</div>
			<Modal show={show} onHide={onToggleModal} backdrop="static">
				<Modal.Header closeButton>
					<Modal.Title>Add Product</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={onSubmitForm}>
						<Form.Group controlId="form-add-name">
							<Form.Label>Name</Form.Label>
							<Form.Control type="text" name="name" placeholder="Enter product name" required autoComplete="off" />
						</Form.Group>

						<Form.Group controlId="form-add-description">
							<Form.Label>Description</Form.Label>
							<Form.Control as="textarea" name="description" rows={3} placeholder="Enter product description" required />
						</Form.Group>

						<Form.Group controlId="form-add-price">
							<Form.Label>Price</Form.Label>
							<Form.Control type="number" name="price" placeholder="Enter product price" min={1} step={1} required />
						</Form.Group>

						<Form.Group controlId="form-add-image">
							<Form.Label>Image URL</Form.Label>
							<Form.Control type="url" name="image" placeholder="Enter product image URL" required autoComplete="off" />
						</Form.Group>

						<Form.Group controlId="form-add-category">
							<Form.Label>Category</Form.Label>
							<Form.Control as="select" name="category" required>
								<option value="">Select product category</option>
								{categories.map(o => <option key={o.value} value={o.value}>{o.text}</option>)}
							</Form.Control>
						</Form.Group>

						<Button variant="primary" type="submit" disabled={submitting}>
							Submit
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	)
}

export default AddProduct;
