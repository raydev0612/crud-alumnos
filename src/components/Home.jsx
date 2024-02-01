import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import image1 from "../assets/1.jpg";
import image2 from "../assets/2.jpg";
import image3 from "../assets/3.jpg";
import image4 from "../assets/4.jpg";

const images = [image1, image2, image3, image4];

const Home = () => {
  const carousel = useRef();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    console.log(carousel.current?.scrollWidth, carousel.current?.offsetWidth);
    setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth);
  }, []);

  return (
    <>
      <h1 className="home-title">Slide hecho 100% con React JS</h1>
      <div className="home-container">
        <motion.div
          ref={carousel}
          className="carousel"
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            className="inner"
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {images.map((image) => (
              <motion.div className="item" key={image}>
                <img src={image} alt="Imagenes" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Home;
