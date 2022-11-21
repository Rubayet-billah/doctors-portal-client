import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Spinner from '../../Shared/Spinner/Spinner';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    const booking = useLoaderData();
    const navigation = useNavigation();
    const { treatment, price, slot, appointmentDate } = booking;

    if (navigation.state === "loading") {
        return <Spinner></Spinner>
    }
    return (
        <div>
            <h3 className="text-3xl">Payment for {treatment}</h3>
            <p>Please pay <span className='font-bold'>${price}</span> for your appointment on {appointmentDate} at {slot}</p>

            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        booking={booking}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;