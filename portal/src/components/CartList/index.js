import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import './style.scss';

function CartList({
	cart,
	show,
	onToggleModal,
	updateProduct,
	deleteProduct,
	loadingCheckout,
	checkout
}) {
	const [showDelete, setShowDelete] = useState(false);
	const [toDeleteProduct, setToDeleteProduct] = useState(null);
	const [showCheckout, setShowCheckout] = useState(false);
	const fallbackImageSrc = 'http://www.abilityfab.com/wp-content/uploads/2015/12/no-product-image-570x456.png';
	const totalPrice = cart.length > 0
		? cart.map(o => +o.quantity * +o.price).reduce((total, o) => total + o)
		: 0;

	const onErrorImg = (e) => {
		e.preventDefault();

		const img = e.target;
		img.src = fallbackImageSrc;
	}

	const updateQuantity = (o, action) => {
		let quantity = o.quantity;

		if (action === 'minus') {
			quantity = quantity - 1;
		} else {
			quantity = quantity + 1;
		}

		if (quantity === 0) {
			onSetDeleteProduct(o);
		} else {
			updateProduct({ id: o.id, quantity });
		}
	}

	const onSetDeleteProduct = (o) => {
		setShowDelete(true);
		setToDeleteProduct(o);
	}

	const clearDelete = () => {
		setShowDelete(false);
		setToDeleteProduct(null);
	}

	const onConfirmDelete = () => {
		deleteProduct(toDeleteProduct.id);
		clearDelete();
	}

	const onConfirmCheckout = () => {
		checkout();
		setShowCheckout(false);
	}

	return (
		<>
			<Modal show={show} onHide={onToggleModal} size="lg" backdrop="static">
				<Modal.Header closeButton>
					<Modal.Title>Cart</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Table striped bordered hover className="cart-table">
						<thead>
							<tr>
								<th>Image</th>
								<th>Name</th>
								<th>Price</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{cart.length === 0 && (
								<tr>
									<td colSpan={4}>No products in cart</td>
								</tr>
							)}
							{cart.map(o => (
								<tr key={o.id}>
									<td className="cart-table__td-img">
										<Image src={o.image} rounded onError={onErrorImg} />
									</td>
									<td>
										<strong>{o.name}</strong><br />
										Qty: {o.quantity}
									</td>
									<td className="cart-table__td-price">
										{+o.quantity === 1 && <strong>{+o.price}</strong>}
										{+o.quantity > 1 && (
											<>
												<span>{+o.price}</span>
												<br />
												<span>✕ {+o.quantity} = <strong>{+o.price * +o.quantity}</strong></span>
											</>
										)}
									</td>
									<td>
										<div className="d-flex justify-content-center">
											<Button variant="secondary" size="sm" onClick={() => updateQuantity(o, 'minus')}>-</Button>
											<span className="mx-3">{+o.quantity}</span>
											<Button variant="secondary" size="sm" onClick={() => updateQuantity(o, 'plus')}>+</Button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
						{cart.length > 0 && (
							<tfoot>
								<tr>
									<td colSpan={3} align="right">
										<h5>Total: <strong>{totalPrice}</strong></h5>
									</td>
									<td>
										<Button variant="primary" block disabled={loadingCheckout} onClick={() => setShowCheckout(true)}>Checkout</Button>
									</td>
								</tr>
							</tfoot>
						)}
					</Table>
				</Modal.Body>
			</Modal>
			{showDelete && toDeleteProduct && (
				<Modal show={showDelete} onHide={clearDelete} backdrop="static" centered className="modal-delete">
					<Modal.Header closeButton>
						<Modal.Title>Remove Product from Cart</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="d-flex align-items-center">
							<Image src={toDeleteProduct.image} rounded onError={onErrorImg} />
							<strong className="ml-5">{toDeleteProduct.name}</strong>
						</div>
						Are you sure to remove this product?
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={clearDelete}>No</Button>
						<Button variant="danger" onClick={onConfirmDelete}>Yes, remove this product</Button>
					</Modal.Footer>
				</Modal>
			)}
			{showCheckout && (
				<Modal show={showCheckout} onHide={() => setShowCheckout(false)} backdrop="static" centered className="modal-delete">
					<Modal.Header closeButton>
						<Modal.Title>Checkout</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						Are you sure to checkout with these products?
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={() => setShowCheckout(false)}>No</Button>
						<Button variant="primary" onClick={onConfirmCheckout} disabled={loadingCheckout}>Yes, checkout with these products</Button>
					</Modal.Footer>
				</Modal>
			)}
		</>
	)
}

export default CartList;
