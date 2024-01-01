import React from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const ProductImagesSwiper = ({ images }) => {
  return (
    <Swiper
      modules={[Navigation]}
      slidesPerView={1}
      navigation={{ clickable: true }}
    >
      {images.map(imageSrc => (
        <SwiperSlide key={imageSrc} style={{ textAlign: 'center' }}>
          <img src={imageSrc} style={{ height: '50ch' }} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductImagesSwiper;
