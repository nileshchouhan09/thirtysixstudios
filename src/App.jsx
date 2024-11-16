import { useEffect, useRef, useState } from 'react';
import Canvas from './Canvas'
import data from './data'
import LocomotiveScroll from 'locomotive-scroll';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';



const App = () => {

  const [showCanvas, setShowCanvas] = useState(false); 
  const ref = useRef(null); 
  const growingRef = useRef(null);

  useEffect(() => {
const locomotiveScroll = new LocomotiveScroll();
  },[])

  useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growingRef.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a",
            duration: 1.2,
            ease: "power2.inOut",
          });

          gsap.to(growingRef.current, {
            scale: 1000,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingRef.current, {
                scale: 0,
                clearProps: "all",
              });
            },
          });
        } else {
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000",
            duration: 1.2,
            ease: "power2.inOut",
          });
        }

        return !prevShowCanvas;
      });
    };

    const headingElement = ref.current;
    headingElement.addEventListener("click", handleClick);

    // Clean up event listener on unmount
    return () => headingElement.removeEventListener("click", handleClick);
  }, []);

  const navLinks = 
    [
      {name: 'Home', link: '/'},
      {name: 'About', link: '/about'},
      {name: 'Contact', link: '/contact'},
    ]
  
  return (
    <>
    <span ref={growingRef} className='growing rounded-full bg-red-700 block  fixed -top-[10%] left-0 w-5 h-5'></span>
    <div className='w-full relative min-h-screen  '>
      
      {
        showCanvas &&
        data[0].map((item,index)=>(
          <Canvas key={index} details={item}></Canvas>
        ))
      }

      <div className='w-full relative z-[1] h-screen  '>
        
      <nav className='w-full flex justify-between p-8 z-50'>
        <div className='text-2xl font-regular'>thirtysixstudios</div>
        <div className='links flex gap-10'>
        {
          navLinks.map((item, index)=>(
            <a key={index} className='text-md p-2 '  href={item.link}>{item.name}</a>
          ))
        }
        </div>
      </nav>

     <div className="text-container  w-full pl-[20%]">
     <div className='text w-[50%]' >
        <h3 className='text-4xl leading-[1.4]'>
        At Thirtysixstudio, we build immersive digital experiences for brands with a purpose.
        </h3>
          <p className='text-md w-[80%] leading-[1.4] mt-10 font-md'>
          We’re a boutique production studio focused on design, motion, and creative technology, constantly reimagining what digital craft can do for present-time ads and campaigns.
          </p>
          <p className='text-md w-[80%] leading-[1.4] mt-10 font-md'>
          Scroll
          </p>
      </div>
     </div>

      <div className='w-full absolute bottom-0 left-4   '>
        <h1 className='text-[16rem] font-normal tracking-tight leading-none' ref={ref}>
          Thirtysixstudios
        </h1>

      </div>

    

    </div>
    
    </div>
    <div className='w-full h-screenmt-43 px-10'>
        <h1 className='text-8xl mt-20 tracking-tight'>about the brand</h1>
        <p className='text-4xl leading-[1.8] w-[80%] mt-10 font-light'>AtThirtysixstudio,werecognizethatourindustrycanperpetuateharm.Webelievewehavetotryandreversesomeoftheseimbalances.That’swhywe’relaunchingSS36,ourlocalsocialsustainabilityhub.
        ThroughSS36,wereinvestsomeofourrevenueandexpertiseintothecommunitiesthatshapethecultureandtrendsourfieldsoheavilyrelieson.Ourmainfocusisonbridginggapsforthoseaffectedbysystemicobstaclesrelatedtorace,sexuality,wealthandgenderidentity.</p>
        <img
          className="w-[80%] mt-10"
          src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400"
          alt=""
        />
      </div>
    </>
  )
}

export default App
