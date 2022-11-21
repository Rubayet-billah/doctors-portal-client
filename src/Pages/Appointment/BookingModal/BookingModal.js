import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const BookingModal = ({ selectedDate, treatment, setTreatment, refetch }) => {
    const { user } = useContext(AuthContext)
    const { name, slots, price } = treatment;
    const date = format(selectedDate, 'PP')

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const date = form.date.value;
        const slot = form.slot.value;
        const patient = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const booking = {
            appointmentDate: date,
            service: name,
            patient,
            slot,
            email,
            phone,
            price

        }
        // post booking to database
        fetch('https://doctors-portal-server-delta-five.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Booking successfull')
                    setTreatment(null);
                    refetch();
                }
                else {
                    console.log(data.message)
                    toast.error(data.message)
                }
            })
    }

    return (
        <div>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleSubmit}>
                        <input name='date' type="text" value={date} disabled className="input input-bordered w-full my-3" />
                        <select name='slot' className="select select-bordered w-full">
                            {
                                slots.map((slot, idx) => <option
                                    key={idx}
                                >{slot}</option>)
                            }
                        </select>
                        <input name='name' type="text" defaultValue={user?.displayName} disabled placeholder="Your name" className="input input-bordered w-full my-3" />
                        <input name='email' type="text" defaultValue={user?.email} disabled placeholder="Email address" className="input input-bordered w-full my-3" />
                        <input name='phone' type="text" placeholder="Phone number" className="input input-bordered w-full my-3" />
                        <input type="submit" value='Submit' className="btn btn-accent text-white w-full" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;