import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';

const ManageDoctors = () => {
    const [deletingDoctor, setDeletingDoctor] = useState(null)

    const closeModal = () => {
        setDeletingDoctor(null)
    }

    const { data: doctors = [], refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('https://doctors-portal-server-delta-five.vercel.app/doctors', {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('doctorsToken')}`
                    }
                });
                const data = await res.json()
                return data
            } catch (error) {
                console.log(error)
            }
        }
    })


    const handleDoctorDelete = (doctor) => {
        fetch(`https://doctors-portal-server-delta-five.vercel.app/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('doctorsToken')}`
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result.deletedCount) {
                    toast.success(`Doctor ${doctor.name} deleted successfully`)
                    refetch()
                }
            })
    }

    return (
        <div>
            <h2 className="text-3xl">Manage doctors</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialty</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doctor, idx) => <tr key={doctor._id}>
                                <th>{idx + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={doctor.image} alt='' />
                                        </div>
                                    </div>
                                </td>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.specialty}</td>
                                <td><label onClick={() => setDeletingDoctor(doctor)} htmlFor="confirmation-modal" className='btn btn-xs btn-error text-white'>Delete</label></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            {
                deletingDoctor && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete doctor ${deletingDoctor.name} .It cannot be undone.`}
                    closeModal={closeModal}
                    successButtonName='Delete'
                    successAction={handleDoctorDelete}
                    modalBody={deletingDoctor}
                ></ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctors;