import React from 'react';
import { FiArrowRightCircle } from "react-icons/fi";
import { Link } from 'react-router-dom';


const ServiceCard = ({ service }) => {

    const { _id, img, price, title } = service

    return (
        <div className="card card-compact bg-base-100 p-6 shadow-lg border border-slate-700">
            <figure><img className='w-full h-52 object-cover rounded-t-lg' src={img} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title text-2xl">{title}</h2>
                <div className='text-xl text-orange-600 font-semibold flex justify-between items-center'>
                    <p>Price : ${price}</p>
                    <Link to={`/checkout/${_id}` }>
                        <FiArrowRightCircle className='cursor-pointer text-3xl font-bold' />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;