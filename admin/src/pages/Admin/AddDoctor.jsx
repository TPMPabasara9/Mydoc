import React from 'react';
import { assets } from '../../assets/assets_admin/assets';
import { useState } from 'react';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';
;

const AddDoctor = () => {

  const [docImg, setDocImg] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [Speciality, setSpeciality] = useState('General Physician')

  const { backendUrl, aToken } = useContext(AdminContext)



  const onSubmithandler = async (event) => {
    event.preventDefault()
    try {
      if (!docImg) {
        return toast.error("Image not Selected")
      }
      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name)
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fee', Number(fees));
      formData.append('about', about);
      formData.append('speciality', Speciality)
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

      //console log formData
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      })

      const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, { headers: { aToken } })
      if (data.success) {
        setDocImg(false);
        setName('');
        setEmail('');
        setPassword('');
        setAbout('');
        setAddress1('');
        setAddress2('');
        setDegree('');
        setExperience('');
        setFees('');


        toast.success(data.message)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <form className='mt-5 w-full' onSubmit={onSubmithandler}>
      <p className='mb-3 text-lg font-medium'>Add Doctor</p>
      <div className='bg-white px-8 py-8 border-rounded w-full max-w-4xl max-h-[88vh] overflow-y-scroll'>
        {/* Image Upload */}
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="doc-img">
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p>Upload doctor <br />picture</p>
        </div>

        {/* Common Fields */}
        <div className='flex flex-col gap-4 text-gray-600 mb-8'>
          <div className='flex flex-col gap-1'>
            <p>Doctor Name</p>
            <input onChange={(e) => setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='Name' required />
          </div>
          <div className='flex flex-col gap-1'>
            <p>Doctor Email</p>
            <input onChange={(e) => setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type="email" placeholder='Email' required />
          </div>
          <div className='flex flex-col gap-1'>
            <p>Doctor Password</p>
            <input onChange={(e) => setPassword(e.target.value)} value={password} className='border rounded px-3 py-2' type="password" placeholder='Password' required />
          </div>

        </div>

        {/* Left & Right Columns Start */}
        <div className='flex flex-col lg:flex-row gap-10 text-gray-600'>
          {/* Left Column */}
          <div className='flex-1 flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <p>Doctor Experience</p>
              <select onChange={(e) => setExperience(e.target.value)} value={experience} className='border rounded px-3 py-2' required>
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1} value={`${i + 1} year`}>{i + 1}</option>
                ))}
              </select>
            </div>
            <div className='flex flex-col gap-1'>
              <p>Doctor Fee</p>
              <input onChange={(e) => setFees(e.target.value)} value={fees} className='border rounded px-3 py-2' type="number" placeholder='Fee' required />
            </div>
          </div>

          {/* Right Column */}
          <div className='flex-1 flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <p>Speciality</p>
              <select onChange={(e) => setSpeciality(e.target.value)} value={Speciality} className='border rounded px-3 py-2' required>
                <option value="General Physician">General Physician</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gynocologist">Gynocologist</option>
                <option value="Gastronologist">Gastronologist</option>
                <option value="Pediatricians">Pediatricians</option>
                  <option value="Dermotologist">Dermotologist</option>
              </select>
            </div>
            <div className='flex flex-col gap-1'>
              <p>Education</p>
              <input onChange={(e) => setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2' type="text" placeholder='Education' required />
            </div>
            <div className='flex flex-col gap-1'>
              <p>Address</p>
              <input onChange={(e) => setAddress1(e.target.value)} value={address1} className='border rounded px-3 py-2' type="text" placeholder='Address 1' required />
              <input onChange={(e) => setAddress2(e.target.value)} value={address2} className='border rounded px-3 py-2' type="text" placeholder='Address 2' required />
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <p className='mt-4 mb-2'>About Doctor</p>
          <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded' placeholder='Write about the Doctor' rows={5} required />
        </div>

        {/* Submit */}
        <div className='mt-8'>
          <button type="submit" className='bg-indigo-500 text-white px-10 py-3 rounded-full mt-4'>Add Doctor</button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
