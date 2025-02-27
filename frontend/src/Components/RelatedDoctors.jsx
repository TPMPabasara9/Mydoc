import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RelatedDoctors = ({ speciality, docId }) => {

    const {doctors } = useContext(AppContext);
    const navigate= useNavigate();

    const [relDoc,setRelDocs] = useState([]);

    useEffect(()=>{
        if(doctors.length > 0 && speciality){

            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDocs(doctorsData)
        }
    },[speciality,doctors,docId])


    return (
        <section className="container mx-auto px-3 sm:px-4 py-16">
        <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
                Top Doctors to Book
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
                Simply browse through our extensive list of trusted doctors
            </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-3 sm:px-0">
            {relDoc.slice(0, 5).map((doctor, index) => (
                <article
                    key={index}
                    className="group border border-blue-100 rounded-xl overflow-hidden shadow-sm transform hover:scale-110 transition duration-300 ease-in-out hover:border-blue-700"
                    onClick={() =>{ navigate(`/appointment/${doctor._id}`); scrollTo(0,0)}  }
                >
                    <div className="aspect-square bg-blue-50 relative overflow-hidden">
                        <img
                            className="w-full h-full object-cover"
                            src={doctor.image}
                            alt={`${doctor.name}, ${doctor.speciality}`}
                            loading="lazy"
                        />
                    </div>

                    <div className="p-4 space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span className="text-sm text-green-600">Available</span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-800">{doctor.name}</h3>
                        <p className="text-gray-600 text-sm">{doctor.speciality}</p>
                    </div>
                </article>
            ))}
        </div>

        <div className="text-center mt-8">
            <button onClick={()=>{navigate('/doctors')}} className="px-6 py-2.5 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors duration-200">
                Show More
            </button>
        </div>
    </section>
);
    }

    export default RelatedDoctors;