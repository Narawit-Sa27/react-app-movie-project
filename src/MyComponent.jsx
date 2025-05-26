// import React, {useState} from "react";

// function MyComponent() {
//     const [cars, setCars] = useState([]);
//     const [carYear, setCarYear] = useState([new Date().getFullYear()]);
//     const [carMake, setCarMake] = useState("");
//     const [carModel, setCarModel] = useState("");


//     function handleAddCar() {
//         const newCar = {year: carYear,
//                         make: carMake,
//                         model: carModel};
//     setCars(c => [...c, newCar]);

//     setCarYear(new Date().getFullYear());
//     setCarMake("");
//     setCarModel("");
//     }
    

//     function handleRemoveCar(index) {
//         setCars(c => c.filter((_, i) => i !== index));
//         console.log(cars);
//     }
//     function handleYearChange(event) {
//         setCarYear(event.target.value)
//     }
//     function handleMakeChange(event) {
//         setCarMake(event.target.value)
//     }
//     function handleModelChange(event) {
//         setCarModel(event.target.value)
//     }
//     return(
//         <>
        
//         <div>
//         <h2>List of Car Objects</h2>
//         <ul>
//           {cars.map((car, index) =>
//             <li key={index} onClick={() => handleRemoveCar(index)}>
//                 {car.year} {car.make} {car.model} 
//             </li>
//           )}
//         </ul>
//         <input type="number" value={carYear} onChange={handleYearChange}/>
//             <input type="text" value={carMake} onChange={handleMakeChange}/>
//             <input type="text" value={carModel} onChange={handleModelChange}/>
//             <button onClick={handleAddCar}>Add Car</button>
//         </div>
//         </>
//     )
// }
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import Banner from './assets/banner.jpg'; // Ensure this path is correct
import './App.css';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export default function MyComponent() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : {}}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {[...Array(10)].map((_, index) => (
          <SwiperSlide key={index}>
            <img src={Banner} alt={`Slide ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {[...Array(10)].map((_, index) => (
          <SwiperSlide key={index}>
            <img src={Banner} alt={`Thumb ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
