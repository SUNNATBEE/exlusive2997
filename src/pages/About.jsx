import React from "react";
import Slide from "../assets/Side Image (1).png";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import Man from "../assets/Frame 874.png"
import Woman from "../assets/Frame 875.png"
import Robo from "../assets/image 47.png"
import Services from "../assets/Services.png"
import Services2 from "../assets/Services (1).png"
import Services3 from "../assets/Services (2).png"


const AboutPage = () => {
  return (
    <div className="w-full bg-white">

      {/* ----------- ABOUT SECTION ----------- */}
      <div className="container mx-auto flex gap-20 mt-20 items-center">

        <div className="max-w-[550px] pl-[50px]">
          <h1 className="text-[54px] font-semibold text-black">Our Story</h1>

          <p className="text-[16px] text-gray-700 mt-6 leading-7">
            Launced in 2015, Exclusive is South Asia’s premier online shopping marketplace with
            an active presence in Bangladesh. Supported by a wide range of tailored marketing,
            data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves
            3 million customers across the region.
            <br /><br />
            Exclusive has more than 1 Million products to offer, growing at a very fast pace.
            Exclusive offers a diverse assortment in categories ranging from consumer.
          </p>
        </div>

        <div>
          <img src={Slide} className="w-[500px] rounded-xl" />
        </div>

      </div>


      {/* ----------- STATISTICS SECTION ----------- */}
      <div className="grid grid-cols-4 gap-6 max-w-6xl mx-auto mt-28">

        <div className="border rounded-xl px-6 py-6 flex flex-col items-center bg-black">
          <p className="text-[32px] font-bold">10.5k</p>
          <p className="text-gray-500 text-sm text-center">Sellers active our site</p>
        </div>

        <div className="border rounded-xl px-6 py-6 bg-black text-white flex flex-col items-center hover:bg-red-500">
          <p className="text-[32px] font-bold">33k</p>
          <p className="text-sm text-center">Monthly Product Sale</p>
        </div>

        <div className="border rounded-xl px-6 py-6 flex flex-col items-center bg-black">
          <p className="text-[32px] font-bold">45.5k</p>
          <p className="text-gray-500 text-sm text-center">Customer active in our site</p>
        </div>

        <div className="border rounded-xl px-6 py-6 flex flex-col items-center bg-black">
          <p className="text-[32px] font-bold">25k</p>
          <p className="text-gray-500 text-sm text-center">Annual gross sale</p>
        </div>

      </div>


      {/* ----------- TEAM SECTION ----------- */}
      <div className="grid grid-cols-3 max-w-6xl mx-auto gap-10 mt-24">

        {/* Card 1 */}
        <div className="flex flex-col items-center">
          <img
            className="w-full rounded-xl"
            src={Man}
            alt="person"
          />
          <h3 className="text-xl font-semibold mt-4 text-black">Tom Cruise</h3>
          <p className="text-black text-sm">Founder & Chairman</p>

          <div className="flex gap-4 mt-3">
            <Twitter size={18} />
            <Instagram size={18} />
            <Linkedin size={18} />
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col items-center">
          <img
            className="w-full rounded-xl"
            src={Woman}
            alt="person"
          />
          <h3 className="text-xl font-semibold mt-4 text-black">Emma Watson</h3>
          <p className="text-black text-sm">Managing Director</p>

          <div className="flex gap-4 mt-3">
            <Twitter size={18} />
            <Instagram size={18} />
            <Linkedin size={18} />
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center">
          <img
            className="w-full rounded-xl"
            src={Robo}
            alt="person"
          />
          <h3 className="text-xl font-semibold mt-4 text-black">Will Smith</h3>
          <p className="text-black text-sm">Product Designer</p>

          <div className="flex gap-4 mt-3 ">
            <Twitter size={18} />
            <Instagram size={18} />
            <Linkedin size={18} />
          </div>
        </div>

      </div>


      {/* ----------- BENEFITS SECTION ----------- */}
      <div className="grid grid-cols-3 max-w-6xl mx-auto mt-24 pb-16 gap-10 text-center">

        <div className="flex flex-col items-center">
          <img src={Services} className="w-[60px]" />
          <h3 className="font-semibold mt-3 text-black">FREE AND FAST DELIVERY</h3>
          <p className="text-black text-sm">Free delivery for all orders over $140</p>
        </div>

        <div className="flex flex-col items-center">
          <img src={Services2} className="w-[60px]" />
          <h3 className="font-semibold mt-3 text-black">24/7 CUSTOMER SERVICE</h3>
          <p className="text-black text-sm">Friendly 24/7 customer support</p>
        </div>

        <div className="flex flex-col items-center">
          <img src={Services3} className="w-[60px]" />
          <h3 className="font-semibold mt-3 text-black">MONEY BACK GUARANTEE</h3>
          <p className="text-black text-sm">We return money within 30 days</p>
        </div>

      </div>
 

    </div>
  );
};

export default AboutPage;
