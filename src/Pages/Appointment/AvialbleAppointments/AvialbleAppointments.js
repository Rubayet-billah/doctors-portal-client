import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useState } from 'react';
import BookingModal from '../BookingModal/BookingModal';
import AppointmentOption from './AppointmentOption';

const AvialbleAppointments = ({ selectedDate }) => {
    // const [appointmentOptions, setAppointmentOptions] = useState([])
    const [treatment, setTreatment] = useState(null)
    const date = format(selectedDate, 'PP')

    const { data: appointmentOptions = [], refetch } = useQuery({
        queryKey: ['appointmentOption'],
        queryFn: async () => {
            const res = await fetch(`https://doctors-portal-server-delta-five.vercel.app/appointmentOptions/?date=${date}`)
            const data = res.json();
            return data;
        }
    })


    return (
        <section className='my-16'>
            <p className='text-secondary text-xl font-bold text-center'>Available appointments on {format(selectedDate, 'PP')}</p>

            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10'>
                {
                    appointmentOptions.map(appointment => <AppointmentOption
                        key={appointment._id}
                        appointmentOption={appointment}
                        setTreatment={setTreatment}
                    ></AppointmentOption>)
                }
            </div>
            {treatment &&
                <BookingModal
                    selectedDate={selectedDate}
                    treatment={treatment}
                    setTreatment={setTreatment}
                    refetch={refetch}
                ></BookingModal>
            }
        </section>
    );
};

export default AvialbleAppointments;