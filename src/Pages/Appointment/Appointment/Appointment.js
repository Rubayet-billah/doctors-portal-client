import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import AvialbleAppointments from '../AvialbleAppointments/AvialbleAppointments';
import BookingModal from '../BookingModal/BookingModal';

const Appointment = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    return (
        <div>
            <AppointmentBanner
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            ></AppointmentBanner>
            <AvialbleAppointments
                selectedDate={selectedDate}
            ></AvialbleAppointments>
            <Toaster></Toaster>
        </div>
    );
};

export default Appointment;