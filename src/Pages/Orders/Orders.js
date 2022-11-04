import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import OrderTable from './OrderTable/OrderTable';

const Orders = () => {

    const { user, logOut } = useContext(AuthContext)

    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetch(`https://genius-car-server-nu.vercel.app/orders?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    return logOut()
                }
                return res.json()
            })
            .then(data => setOrders(data))
    }, [user?.email, logOut])

    const handleDelete = id => {
        const proceed = window.confirm('are you sure want delete this service')
        if (proceed) {
            fetch(`https://genius-car-server-nu.vercel.app/orders/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('deleted successfully')
                        const remaining = orders.filter(odr => odr._id !== id)
                        setOrders(remaining)
                    }
                })
        }
    }

    const handleStatusUpdate = id => {
        fetch(`https://genius-car-server-nu.vercel.app/orders/${id}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ status: "Approved" })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    const remaining = orders.filter(odr => odr._id !== id)
                    const approve = orders.find(odr => odr._id === id)
                    approve.status = "Approved"
                    const newOder = [...remaining, approve]
                    setOrders(newOder)
                }
            })
    }

    return (
        <div className='my-20'>
            <h2 className="text-2xl text-center mb-6">You Have {orders.length} Orders</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            orders.map(order =>
                                <OrderTable
                                    key={order._id}
                                    order={order}
                                    handleDelete={handleDelete}
                                    handleStatusUpdate={handleStatusUpdate}
                                />)
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Orders;