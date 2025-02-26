import React from 'react'
import Header from '../Components/Header'
import SpecialityMenu from '../Components/specialityMenu';
import TopDoctors from '../Components/TopDoctors';
import Banner from '../Components/Banner';
  

const Home= () => {
  return (
    <div>
        <Header/>
        <SpecialityMenu/>
        <TopDoctors/>
        <Banner />
  
    </div>
    
  )
}

export default Home;

