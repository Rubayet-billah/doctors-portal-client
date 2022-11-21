import React from 'react';

const AppointmentOption = ({ appointmentOption, setTreatment }) => {
    const { name, price, slots } = appointmentOption;
    return (
        <div>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body text-center">
                    <h2 className="text-xl text-center text-secondary font-bold">{name}</h2>


                    <p>{slots.length ? slots[0] : 'Try another day'}</p>
                    {
                        // slots.length && <>
                        <p>{slots?.length} {slots?.length > 1 ? 'spaces' : 'space'} available</p>
                        // </>
                    }
                    <p>$ {price}</p>
                    <div className="card-actions justify-center">
                        <label
                            disabled={slots.length === 0}
                            onClick={() => setTreatment(appointmentOption)}
                            htmlFor="booking-modal" className="btn btn-primary text-white">Book Appointment</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentOption;