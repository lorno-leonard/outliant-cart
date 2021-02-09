import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

import CartList from '../CartList';

function Header({
	loadingCart,
	cart,
	updateProduct,
	deleteProduct,
	loadingCheckout,
	checkout
}) {
	const [show, setShow] = useState(false);
	const onToggleModal = () => setShow(!show);
	const totalQuantity = cart.length > 0
		? cart.map(o => +o.quantity).reduce((total, o) => total + o)
		: '';

	return (
		<>
			<Navbar bg="dark" variant="dark" fixed="top">
				<Navbar.Brand>Outliant Products</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Collapse className="justify-content-end">
					<Button variant="primary" onClick={onToggleModal} disabled={loadingCart}>
						<span className="mr-1">{loadingCart ? 'Loading Cart...' : 'Cart'}</span>
						{!loadingCart && cart.length > 0 && <Badge variant="light">{totalQuantity}</Badge>}
					</Button>
				</Navbar.Collapse>
			</Navbar>
			<CartList
				cart={cart}
				show={show}
				onToggleModal={onToggleModal}
				updateProduct={updateProduct}
				deleteProduct={deleteProduct}
				loadingCheckout={loadingCheckout}
				checkout={checkout}
			/>
		</>
	)
}

export default Header;
