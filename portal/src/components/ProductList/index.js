import React from 'react';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import './style.scss';

function ProductList({
	products,
	addToCart
}) {
	const fallbackImageSrc = 'http://www.abilityfab.com/wp-content/uploads/2015/12/no-product-image-570x456.png';

	const onErrorImg = (e) => {
		e.preventDefault();

		const img = e.target;
		img.src = fallbackImageSrc;
	}

	return (
		<Table striped bordered hover variant="dark" className="products-table">
			<thead>
				<tr>
					<th>Image</th>
					<th>Name</th>
					<th>Price</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{products.length === 0 && (
					<tr>
						<td colSpan={4}>No products available</td>
					</tr>
				)}
				{products.map(o => (
					<tr key={o.id}>
						<td className="products-table__td-img"><Image src={o.image} rounded onError={onErrorImg} /></td>
						<td>
							<p><strong>{o.name}</strong></p>
							<p>
								<small>
									Description: {o.description}<br />
									Category: {o.category}
								</small>
							</p>
						</td>
						<td className="products-table__td-price">{o.price}</td>
						<td>
							<Button variant="primary" onClick={() => addToCart(o.id)}>Add to Cart</Button>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	)
}

export default ProductList
