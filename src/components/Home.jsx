import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaPhone } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Blog from './Blog';
import Teachers from './Teachers';
import Gallery from './Gallery';
import Reviews from './Reviews';

// Import your images
import gandhiSlideImage from '../public/carousel-1.jpg';
import templeSlideImage from '../public/temple-slide.jpg';
import familySlideImage from '../public/family-slide.jpg';
import TrainingPlatform from './TrainingPlatform';

function Home() {
  const stats = [
    { label: "వాసవి ఇన్ఫర్మేషన్ సెంటర్", value: "0+" },
    { label: "SERVICE CATEGORIES", value: "0+" },
    { label: "TOTAL BRUNCH", value: "17+" },
    { label: "HAPPY VOLUNTEERS", value: "567+" },
  ];

  return (
    <div>
      <section className="hero-section relative">
        {/* Set a fixed container with max-width and height */}
        <div className="w-screen h-96 md:h-[450px] lg:h-[500px]">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            loop={true}
            className="h-full w-full"
          >
            {/* Slide 1 - Gandhi and leader */}
            <SwiperSlide>
  <div className="relative w-full h-full bg-white">
    <img 
      src={gandhiSlideImage} 
      alt="Gandhi and Leader" 
      className="w-full h-full object-contain" 
    />
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-center text-white px-4">
                  <p className="text-yellow-400 font-bold mb-2 drop-shadow-md">LET'S వాసవి ఇన్ఫర్మేషన్ సెంటర్</p>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">విశిష్టం - విస్మృత్యం - విశ్వవ్యాప్తం</h1>
                    <p className="text-sm md:text-base mb-3 md:mb-6 max-w-3xl mx-auto">ఆర్య వైశ్యుల అభివృద్ధి సంక్షేమం దృష్టిలో ఉంచుకుని వారి స్నేహితులు విశిష్టంగా విస్మృత్యంగా విశ్వవ్యాప్తం చేయాలన్న ఆశయ సంకల్పంతో మీ ముందుకు వస్తుంది</p>
                    <div className="space-x-4">
                      <button className="bg-pink-500 text-white px-4 py-1 md:px-6 md:py-2 text-sm md:text-base rounded-full hover:bg-pink-600">
                        Join Now
                      </button>
                      <button className="bg-yellow-500 text-white px-4 py-1 md:px-6 md:py-2 text-sm md:text-base rounded-full hover:bg-pink-600">
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
  </div>
            </SwiperSlide>


            {/* Slide 2 - Temple Image */}
            <SwiperSlide>
              <div className="relative h-full">
                <img 
                  src={templeSlideImage} 
                  alt="Temple" 
                  className="w-full h-full object-contain" 
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-center text-white px-4">
                  <p className="text-yellow-400 font-bold mb-2 drop-shadow-md">LET'S వాసవి ఇన్ఫర్మేషన్ సెంటర్</p>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">విశిష్టం - విస్మృత్యం - విశ్వవ్యాప్తం</h1>
                    <p className="text-sm md:text-base mb-3 md:mb-6 max-w-3xl mx-auto">ఆర్య వైశ్యుల అభివృద్ధి సంక్షేమం దృష్టిలో ఉంచుకుని వారి స్నేహితులు విశిష్టంగా విస్మృత్యంగా విశ్వవ్యాప్తం చేయాలన్న ఆశయ సంకల్పంతో మీ ముందుకు వస్తుంది</p>
                    <div className="space-x-4">
                      <button className="bg-pink-500 text-white px-4 py-1 md:px-6 md:py-2 text-sm md:text-base rounded-full hover:bg-pink-600">
                        Join Now
                      </button>
                      <button className="bg-yellow-500 text-white px-4 py-1 md:px-6 md:py-2 text-sm md:text-base rounded-full hover:bg-pink-600">
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 3 - Family Photo */}
            <SwiperSlide>
              <div className="relative h-full">
                <img 
                  src={familySlideImage} 
                  alt="Family" 
                  className="w-full h-full object-contain"   
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-center text-white px-4">
                  <p className="text-yellow-400 font-bold mb-2 drop-shadow-md">LET'S వాసవి ఇన్ఫర్మేషన్ సెంటర్</p>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">విశిష్టం - విస్మృత్యం - విశ్వవ్యాప్తం</h1>
                    <p className="text-sm md:text-base mb-3 md:mb-6 max-w-3xl mx-auto">ఆర్య వైశ్యుల అభివృద్ధి సంక్షేమం దృష్టిలో ఉంచుకుని వారి స్నేహితులు విశిష్టంగా విస్మృత్యంగా విశ్వవ్యాప్తం చేయాలన్న ఆశయ సంకల్పంతో మీ ముందుకు వస్తుంది</p>
                    <div className="space-x-4">
                      <button className="bg-pink-500 text-white px-4 py-1 md:px-6 md:py-2 text-sm md:text-base rounded-full hover:bg-pink-600">
                        Join Now
                      </button>
                      <button className="bg-yellow-500 text-white px-4 py-1 md:px-6 md:py-2 text-sm md:text-base rounded-full hover:bg-pink-600">
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          
          {/* Custom Navigation Buttons */}
          <div className="swiper-button-prev absolute left-4 z-10 top-1/2 -translate-y-1/2 bg-pink-500 text-white rounded-full w-8 h-8 md:w-12 md:h-12 flex items-center justify-center cursor-pointer">
            <span className="sr-only">Previous</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>

           <div className="swiper-button-next absolute right-4 z-10 top-1/2 -translate-y-1/2 bg-pink-500 text-white rounded-full w-8 h-8 md:w-12 md:h-12 flex items-center justify-center cursor-pointer">
            <span className="sr-only">Next</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </section>


      <section class="h-36">
  <div class="w-full h-full bg-yellow-500 text-black px-4 py-4 flex items-center justify-center text-center">
    <span class="text-3xl font-medium mr-10">
      Join us today for your first వాసవి ఇన్స్పిరేషన్ సెంటర్
    </span>
    <a href="tel:9246581272" class="ml-2 text-2xl inline-flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="white">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
      <span class="text-white font-bold">9246581272</span>
    </a>
  </div>
</section>



<section className="about-section py-16">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
      <div className="flex justify-end">
        <img 
          src={templeSlideImage} 
          alt="Vasavi Temple" 
          className="rounded-lg shadow-xl w-full max-w-md h-auto object-cover"
        />
      </div>
      <div>
        <h6 className="text-yellow-500 font-medium text-lg mb-2">ABOUT THE వాసవి ఇన్స్పిరేషన్ సెంటర్ SCHOOL</h6>
        <h2 className="text-2xl md:text-4xl mb-4 md:mb-6">
          <span className="text-pink-500 font-bold">Justవాసవి ఇన్స్పిరేషన్ సెంటర్</span>
          <span className="text-black font-bold">, We have been teaching </span>
          <span className="text-black font-bold">వాసవి ఇన్స్పిరేషన్ సెంటర్ since 2001</span>
        </h2>
        <p className="text-gray-600 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sint commodi alias, eius incidunt similique 
          exercitationem magni quod recusandae maiores ducimus non porro neque odio explicabo, doloribus deleniti rem 
          sequi adipisci sed ab qui dolorem. Optio sint eius illum consequatur. Odit.
        </p>
        <p className="text-gray-600 mb-6">
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Inventore illum nemo deserunt reiciendis perferendis 
          incidunt ullam expedita dolor, voluptas repellat necessitatibus dolore repellendus dolorum, voluptate dolorem. 
          Debitis quis ipsa ullam neque compti maxime sit magni, tempore, aperiam rerum, perspiciatis fuga.
        </p>
        <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-medium">
          Learn More
        </button>
      </div>
    </div>
  </div>
</section>


 <section className="stats-section py-12 bg-cover bg-center" style={{ backgroundImage: 'url(/path-to/image.png)' }}>
  <div className="bg-white bg-opacity-50 py-10">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {/* First Stat - వాసవి ఇన్స్పిరేషన్ సెంటర్ */}
        <div className="text-center">
          <div className="w-full max-w-[160px] mx-auto rounded-b-full shadow-lg overflow-hidden">
            <div className="bg-pink-500 text-white text-sm md:text-base font-medium py-3 px-2 min-h-[60px] flex items-center justify-center">
              <span>వాసవి ఇన్స్పిరేషన్ సెంటర్</span>
            </div>
            <div className="bg-white py-4 rounded-b-full">
              <h3 className="text-lg md:text-2xl font-bold text-orange-500">0+</h3>
            </div>
          </div>
        </div>
        
        {/* Second Stat - SERVICE CATEGORIES */}
        <div className="text-center">
          <div className="w-full max-w-[160px] mx-auto rounded-b-full shadow-lg overflow-hidden">
            <div className="bg-pink-500 text-white text-sm md:text-base font-medium py-3 px-2 min-h-[60px] flex items-center justify-center">
              <span>SERVICE<br />CATEGORIES</span>
            </div>
            <div className="bg-white py-4 rounded-b-full">
              <h3 className="text-lg md:text-2xl font-bold text-orange-500">0+</h3>
            </div>
          </div>
        </div>
        
        {/* Third Stat - TOTAL BRUNCH */}
        <div className="text-center">
          <div className="w-full max-w-[160px] mx-auto rounded-b-full shadow-lg overflow-hidden">
            <div className="bg-pink-500 text-white text-sm md:text-base font-medium py-3 px-2 min-h-[60px] flex items-center justify-center">
              <span>TOTAL BRUNCH</span>
            </div>
            <div className="bg-white py-4 rounded-b-full">
              <h3 className="text-lg md:text-2xl font-bold text-orange-500">17+</h3>
            </div>
          </div>
        </div>
        
        {/* Fourth Stat - HAPPY VOLUNTEERS */}
        <div className="text-center">
          <div className="w-full max-w-[160px] mx-auto rounded-b-full shadow-lg overflow-hidden">
            <div className="bg-pink-500 text-white text-sm md:text-base font-medium py-3 px-2 min-h-[60px] flex items-center justify-center">
              <span>HAPPY<br />VOLUNTEERS</span>
            </div>
            <div className="bg-white py-4 rounded-b-full">
              <h3 className="text-lg md:text-2xl font-bold text-orange-500">567+</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>     

      <TrainingPlatform />
      <Blog />
      <Teachers />
      <Gallery />
      <Reviews />
    </div>
  );
}

export default Home;