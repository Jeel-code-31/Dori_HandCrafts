'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Aboutus() {
  const visionImages = [
    {
      src: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
      alt: 'Macrame detail crafting',
    },
    {
      src: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80',
      alt: 'Macrame wall hanging and room decor',
    },
    {
      src: 'https://images.unsplash.com/photo-1606744888344-493238951221?auto=format&fit=crop&w=600&q=80',
      alt: 'Woman in golden light with woven basket',
    },
    {
      src: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
      alt: 'Indian women artisans sitting together',
    },
    {
      src: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=600&q=80',
      alt: 'Cozy living space with handcrafted swing chair',
    },
    {
      src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
      alt: 'Organic cotton fibers and raw materials',
    },
    {
      src: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=600&q=80',
      alt: 'Group of empowered women artisans in sarees',
    },
    {
      src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
      alt: 'Hands holding a green growing plant',
    },
    {
      src: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80',
      alt: 'World map illuminated with ambient fairy lights',
    },
  ];

  return (
    <div className="w-full bg-white  min-h-screen text-[#2C2420] pb-16">
      {/* Page Header */}
      <div className="w-full py-5 text-center bg-white border-b border-[#EEDFCA]">
        <h1 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#2C2420]">
          About us
        </h1>
      </div>

      {/* Main Sections Wrapper */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">

        {/* 1. OUR MISSION SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-2 items-stretch rounded-none overflow-hidden">
          {/* Left Poster Image */}
          <div className="relative min-h-[480px] sm:min-h-[580px] bg-[#FAF2E4]">
            <Image
              src="/images/Our_mission.png"
              alt="Dori Handicrafts Our Mission Poster"
              fill
              sizes="(max-width: 768px) 50vw, 50vw"
              className="object-cover object-top"
              priority
            />
          </div>

          {/* Right Text Block */}
          <div className="bg-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-5">
            <h2 className="text-xl sm:text-2xl font-bold tracking-wider text-[#2C2420] font-sans uppercase">
              OUR MISSION
            </h2>
            <h2 className="text-sm sm:text-xl text-[#2C2420] font-sans font-medium">
              To create meaningful art,Design and lifestyle experiences by combining India creativity, skilled craftmanship,innovative thinking and responsible use of materials
            </h2>
            <p className="text-sm sm:text-base text-[#4E4137] leading-[1.8] font-sans font-medium">
              At <Link href='https://zizziq.com' target='blank' className="underline font-bold">Zizziq.com</Link>, We transform ideas into distinctive creative gifting ideas, tabletop Sculptures art installations, architectural artworks, sustainable creation and throughtfully designed products for contemporary spaces.<br></br>
              Our mission is to bridge the worlds of Art, Designed, Craftsmanship and Sustainablity- Creating works that are visually compelling, culturally meaningfull and relevant to the needs of modern homes, hospitality, corporate, public and commercial spaces.<br></br>
              We are committed to exploring new possibilites in materials and processes, including giving discarded and industrial materials a new life through creative transformation. At the same time, we seek to preserve and celebrate the human skill,creativity and cultural knowledge embadded in Indian Craftmanship.<br></br>
              Through <b>Zizziq</b>, Our international-facing platform, we extend this philosophy into a curated range of Indian-designed and handcrafted lifestyle products, connecting Indian makers and creative enterprise with global buyers, designers, retailers and hospitality businesses.
              
            </p>
            <p className="text-sm sm:text-base text-c[#4E4137] leading-[1.8] font-sans font-light"> 
              Our mission is to create responsibly, collaborate meaningfully and take Indian creativity from exceptional spaces to everyday life—and from India to the world.
            </p>
          </div>
        </section>

        {/* 2. OUR VISION SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-2 items-stretch rounded-none overflow-hidden">
          {/* Left Text Block */}
          <div className="bg-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-5 order-2 md:order-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-wider text-[#2C2420] font-sans uppercase">
              OUR VISION
            </h2>
            <h2 className="text-sm sm:text-xl text-[#2C2420] font-sans font-medium">
              To become a globally recognized creative enterprise from India, Transforming imagination,Craftsmanship & materials into art, design and products that create lasting value for people,places and the planet.
            </h2>
            <p className="text-sm sm:text-base text-[#4E4137] leading-[1.8] font-sans font-normal">
              At <Link href='https://zizziq.com' target='blank' className="underline font-bold">Zizziq.com</Link>, We envision a future where India Creativity is expericed beyon geographical boundaries-through iconic creative gifting ideas Sculptures, bespoke installations, sustainable design and throughtfully crafted lifestyle products.<br></br>
              We asprie to bridge art, design, technology and sustainablity, transforming overlooked and discarded materials into meaningful creations while creating new opportunities for skilled makers, artists and craftmen.<br></br>
              Through our Work and our international platform <b>Zizziq</b>, We aim to take distinctive Indian Creativity to global markets and build meaningful collabrations with architects, designers, hospitality brands, retailers, instituion and businesses.<br></br>
              Our vision to make india creativity gloablly relevent-turning materials into meaning,spaces into experiences, and ideas into enduring works of art.
            </p>
          </div>

          {/* Right 3x3 Photo Grid */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 p-1.5 sm:p-2 bg-[#FAF2E4] order-1 md:order-2 min-h-[420px] sm:min-h-[520px]">
            {visionImages.map((img, index) => (
              <div key={index} className="relative  overflow-hidden group">
                 <Image
              src="/images/Our_Vision.png"
              alt="Dori Handicrafts Our Vision Poster"
              fill
              sizes="(max-width: 768px) 100vw, 100vw"
              className="object-cover object-top"
              priority
            />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}


