import React from 'react';
import './styles.css';

export default function Switch({ tipo, handleChange, checado }) {
	return (
		<div className='switch item'>
			<h3>{tipo}</h3>
			<label>
				Off
				<input
					id={tipo}
					checked={checado}
					type='checkbox'
					onChange={(e) => handleChange(e, tipo)}
				/>
				<span className='lever'></span>
				On
			</label>
		</div>
	);
}
