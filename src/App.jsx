import { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react';
import './App.css';
import image from "./image"
import { motion } from 'framer-motion';

function App() {

  const containerRef = useRef();
  const [containerWidth, setContainerWidth] = useState(window.innerWidth);

  
  const handleResize = () => {
    setContainerWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth)
  };


  useEffect(() => {

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    
  }, [containerWidth]);


  useLayoutEffect(() => {
    handleResize()
  }, [containerWidth]);

  return (
    <>
      <section className="h-[100vh] w-full py-20 px-10">
        <motion.div
          ref={containerRef}
          className="container mx-auto cursor-grab overflow-hidden "
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -containerWidth }}
            className="flex py-10 px-4 gap-8">
            {image.map((img, index) => (
              <motion.div key={index} className="min-w-[20rem] h-[30rem] rounded-lg overflow-hidden">
                <img className='w-full h-full pointer-events-none' src={img} alt="animal" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}

export default App;
