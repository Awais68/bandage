import Image from "next/image";
import couples from "@/images/asian-woman-man-with-winter-clothes 1.png";

export default function Whitediv() {
  return (
    <div className="flex flex-col lg:flex-row items-center w-full h-auto lg:px-16 py-10 lg:py-20 gap-8 lg:gap-16">
      {/* Image Section */}
      <div className="w-full h-auto lg:w-[725px] mx-auto items-center pl-5 md:lg:pl-0">
        <Image
          src={couples}
          alt="couple"
          className="w-full h-auto object-cover transform transition duration-500 hover:scale-110"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Text Section */}
      <div className="w-full lg:w-[573px] flex flex-col justify-center px-8 md:lg:px-0 space-y-6 lg:space-y-8 transform transition duration-500 hover:scale-110">
        <h5 className="text-[14px] lg:text-[16px] font-Montserrat font-bold leading-[24px] text-[#BDBDBD]">
          SUMMER 2020
        </h5>
        <h2 className="lg:w-[375px] text-[24px] lg:text-[40px] font-Montserrat font-bold leading-[32px] lg:leading-[50px] text-[#252B42]">
          Part of the Neural Universe
        </h2>
        <h4 className=" lg:w-[375px] text-[16px] lg:text-[20px] font-Montserrat font-normal leading-[24px] lg:leading-[30px] text-[#737373]">
          We know how large objects will act, but things on a small scale.
        </h4>
        <div className="flex flex-wrap justify-center lg:justify-start gap-[10px]">
          <button className="w-[140px] lg:w-[156px] h-[52px] rounded-[5px] py-[12px] px-[20px] lg:px-[40px] bg-[#2DC071] flex justify-center items-center">
            <h1 className="text-[14px] font-Montserrat font-bold text-white">
              BUY NOW
            </h1>
          </button>
          <button className="w-[140px] lg:w-[156px] h-[52px] rounded-[5px] py-[12px] px-[20px] lg:px-[40px] border border-[#2DC071] flex justify-center items-center">
            <h1 className="text-[14px] font-Montserrat font-bold whitespace-nowrap text-[#2DC071]">
              READ MORE
            </h1>
          </button>
        </div>
      </div>
    </div>
  );
}
