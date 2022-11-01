import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import OrderTable from './OrderTable/OrderTable';

const Orders = () => {

    const { user } = useContext(AuthContext)

    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [user?.email])

    const handleDelete = id => {
        const proceed = window.confirm('are you sure want delete this service')
        if (proceed) {
            fetch(`http://localhost:5000/orders/${id}`, {
                method: "DELETE"
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
        fetch(`http://localhost:5000/orders/${id}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json'
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