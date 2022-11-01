import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';

const Checkout = () => {

    const { _id, title, price } = useLoaderData()
    const { user } = useContext(AuthContext)

    const handlePlaceOrder = (event) => {
        event.preventDefault()

        const form = event.target

        const name = `${form.firstName.value} ${form.lastName.value}`
        const email = user?.email || 'unregister'
        const phone = form.phone.value
        const message = form.message.value

        const order = {
            service: _id,
            service_name: title,
            price,
            customer: name,
            email,
            phone,
            message
        }

        fetch('http://localhost:5000/orders', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    alert('your order placed')
                    form.reset()
                }
            })
            .catch(e => console.log(e.message))

    }

    return (
        <div>
            <form onSubmit={handlePlaceOrder} className='w-3/5 mx-auto my-20'>
                <div className='mb-4 text-center'>
                    <h3 className="text-2xl">Your Are About To Order - {title}</h3>
                    <p className='text-xl'>Price - {price}</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <input type="text" placeholder="First Name" name='firstName' className="input input-bordered w-full" />
                    <input type="text" placeholder="Last Name" name='lastName' className="input input-bordered w-full" />
                    <input type="text" placeholder="Your Phone" name='phone' className="input input-bordered w-full" />
                    <input type="text" placeholder="Your Email" name='email' defaultValue={user?.email} className="input input-bordered w-full" readOnly />
                </div>
                <div>
                    <textarea className="textarea textarea-bordered h-32 w-full mt-6" placeholder="Your Message" name='message'></textarea>
                </div>
                <input type="submit" value="Place Your Order" className='btn btn-success mt-3 w-full' />
            </form>
        </div>
    );
};

export default Checkout;