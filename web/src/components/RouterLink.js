import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiArrowLeft } from 'react-icons/fi'
export default function RouterLink({ route, title, iconLeft = false }) {
    return (
        <Link className="router-link" to={route}>
            {iconLeft ? <FiArrowLeft size={16} color="#E02041" /> : <FiLogIn size={16} color="#E02041" />}
            {title}
        </Link>
    );
}