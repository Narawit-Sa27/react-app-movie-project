import React from "react";
import Logo from "../assets/Logo.png";
// import { Button } from "@material-tailwind/react";
import imgPlay from "../assets/play store.png";
import imgApple from "../assets/applelogo.png";
import { IconButton } from "@material-tailwind/react";

export default function Footer() {
  return (
    <footer className="bg-Secondary text-gray-400 py-6 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Left */}
        <p className="text-sm font-light">
          Copyright © 2024 Demo-web Hot Movie Dev by NS.
        </p>

        {/* Right */}
        <div className="flex space-x-4 mt-3 md:mt-0">
          <a href="#" className="text-sm hover:text-gray-200 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-sm hover:text-gray-200 transition-colors">
            Terms of Service
          </a>
          <a href="#" className="text-sm hover:text-gray-200 transition-colors">
            Contact
          </a>
        </div>
      </div>

      {/* <>
        <div className="flex flex-col items-center gap-32 pt-24 pb-5 bg-Secondary">
          <div className="w-10/12 mx-auto flex justify-between gap-y-4 items-center flex-wrap">
            <div className="logo flex flex-col gap-6">
                <img src={Logo} alt="logo" />
                <h6 className="font-bold text-Secondary-text">Follow US</h6>
                <div className="flex gap-4">
                    <IconButton className="rounded bg-[#ea4335] hover:shadow-[#ea4335]/20 focus:shadow-[#ea4335]/20 active:shadow-[#ea4335]/10">
                        <i className="fab fa-google text-lg" />
                    </IconButton>
                    <IconButton className="rounded bg-[#1DA1F2] hover:shadow-[#1DA1F2]/20 focus:shadow-[#1DA1F2]/20 active:shadow-[#1DA1F2]/10">
                        <i className="fab fa-twitter text-lg" />
                    </IconButton>
                    <IconButton className="rounded bg-[#ea4c89] hover:shadow-[#ea4c89]/20 focus:shadow-[#ea4c89]/20 active:shadow-[#ea4c89]/10">
                        <i className="fab fa-dribbble text-lg" />
                    </IconButton>
                    <IconButton className="rounded bg-[#333333] hover:shadow-[#333333]/20 focus:shadow-[#333333]/20 active:shadow-[#333333]/10">
                        <i className="fab fa-github text-lg" />
                    </IconButton>
                </div>
            </div>
            <div className="detail flex justify-between flex-wrap gap-14">
                <div>
                    <h6 className="font-bold text-Secondary-text">Contact Us</h6>
                    <p className="mt-6">Help Center</p>
                </div>
                <div>
                    <h6 className="font-bold text-Secondary-text">Terms and Conditions</h6>
                    <p className="mt-6">Help Center</p>
                    <p>Privacy Policy</p>
                    <p>Cookie Policy</p>
                </div>
                <div>
                    <h6 className="font-bold text-Secondary-text">Download</h6>
                    <div className='flex gap-2 mt-6 flex-wrap'>
                        <button size="md" color="white" className="flex items-center justify-center gap-3 font-bold relative bg-Primary rounded-lg p-3">
                            <img src={imgApple} alt="metamask" className="h-auto w-16 object-scale-down" />
                            <div className='flex flex-col justify-start'>
                                <span className='text-xs'>Download on the</span>
                                Apple Store
                            </div>
                        </button>
                        <button size="md" color="white" className="flex items-center justify-center gap-3 font-bold relative bg-Primary rounded-lg p-3">
                            <img src={imgPlay} alt="metamask" className="h-auto w-12 object-scale-down" />
                            <div className='flex flex-col items-start'>
                            <span className='text-xs'>GET IT ON</span>                          
                                Google Play
                            </div>
                        </button>
                    </div>
                </div>
            </div>
          </div>
          <p className='w-10/12 mx-auto font-bold text-center'>Copyright © 2024 Hot Movie Dev by Nws.</p>
        </div>
        </> */}
    </footer>
  );
}
