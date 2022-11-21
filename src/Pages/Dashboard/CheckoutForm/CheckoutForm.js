import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({ booking }) => {
    const { _id, price, patient, email } = booking
    const [cardError, setCardError] = useState('')
    const [cardSuccess, setCardSuccess] = useState('')
    const [transectionId, setTransectionId] = useState('')
    const [processing, setProcessing] = useState(false)
    const [clientSecret, setClientSecret] = useState('')
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        fetch('https://doctors-portal-server-delta-five.vercel.app/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('doctorsToken')}`
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(result => {
                // console.log(result)
                setClientSecret(result.clientSecret)
            })
    }, [price])

    const handleSubmit = async (event) => {
        event.preventDefault();

        setProcessing(true)
        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            setCardError(error.message);
        }

        else {
            setCardError('')
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patient,
                        email: email
                    },
                },
            },
        );
        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }

        if (paymentIntent.status === "succeeded") {
            console.log('payment intend', paymentIntent)
            setTransectionId(paymentIntent.id)
            setCardSuccess('Congratulation! Your payment is successfully done.')
            const payment = {
                price,
                email,
                transectionId,
                bookingId: _id
            }
            fetch('https://doctors-portal-server-delta-five.vercel.app/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('doctorsToken')}`

                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
        }
        else {
            setCardSuccess('')
        }
        setProcessing(false)

    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-primary btn-sm text-white mt-4' type="submit"
                    disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            <p className='text-red-500'>{cardError}</p>
            <p className='text-green-500'>{cardSuccess}</p>
        </>
    );
};

export default CheckoutForm;