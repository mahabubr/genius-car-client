import React from 'react';
import { FiArrowRightCircle } from "react-icons/fi";


const ServiceCard = ({ service }) => {

    const { img, price, title } = service

    return (
        <div className="card card-compact bg-base-100 p-6 shadow-lg border border-slate-700">
            <figure><img className='w-full h-52 object-cover rounded-t-lg' src={img} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title text-2xl">{title}</h2>
                <div className='text-xl text-orange-600 font-semibold flex justify-between items-center'>
                    <p>Price : ${price}</p>
                    <FiArrowRightCircle className='cursor-pointer text-3xl font-bold' />
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;