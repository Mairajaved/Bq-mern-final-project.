import Slider from 'react-slick';

const BrandsSlider = ({ brands }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...sliderSettings}>
      {brands.map((brands, index) => (
        <div key={index} className="brand-slide">
          <img src={brands.BrandsImage} alt={brands.BrandsName} />
          <p>{brands.BrandsName}</p>
        </div>
      ))}
    </Slider>
  );
};

export default BrandsSlider;
