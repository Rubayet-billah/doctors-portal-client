import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Shared/Spinner/Spinner';

const AddDoctor = () => {
    const { register, handleSubmit } = useForm()
    const imgHostKey = process.env.REACT_APP_imgbb_apikey;

    const navigate = useNavigate()

    const handleAddDoctor = data => {
        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image)

        fetch(`https://api.imgbb.com/1/upload?key=${imgHostKey}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url)
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        image: imgData.data.url
                    }
                    fetch('https://doctors-portal-server-delta-five.vercel.app/doctors', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('doctorsToken')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(result => {
                            toast.success(`Doctor ${data.name} added successfully`)
                            console.log(result)
                            navigate('/dashboard/managedoctors')
                        })
                }
            })
    }

    const { data: specialties = [], isLoading } = useQuery({
        queryKey: ['/appointmentSpecialty'],
        queryFn: async () => {
            const res = await fetch('https://doctors-portal-server-delta-five.vercel.app/appointmentSpecialty');
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <Spinner></Spinner>
    }
    return (
        <div>
            <form onSubmit={handleSubmit(handleAddDoctor)} className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-2xl text-center">Add A Doctor</h2>
                    <label htmlFor="">Name</label>
                    <input type="text" {...register('name')} placeholder="Name" className="input input-bordered w-full mb-2" />
                    <label htmlFor="">Email</label>
                    <input type="email" {...register('email')} placeholder="Email" className="input input-bordered w-full mb-2" />
                    <label htmlFor="">Specialty</label>
                    <select {...register('specialty')} className="select select-ghost input input-bordered w-full max-w-xs">
                        <option disabled>Pick the sepcialty</option>
                        {
                            specialties.map(specialty => <option
                                key={specialty._id}
                                value={specialty.name}
                            >{specialty.name}</option>)
                        }
                    </select>
                    <label htmlFor="">Photo</label>
                    <input type="file" {...register('img')} placeholder="img" className="input input-bordered w-full mb-2" />
                    <div className="card-actions justify-end">
                        <input type="submit" value='Add Doctor' className="btn btn-accent w-full" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddDoctor;