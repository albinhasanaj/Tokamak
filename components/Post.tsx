"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FcLike } from "react-icons/fc";
import comments from "../constant/api/comments";

const Post = () => {
  const [isFocused, setIsFocused] = useState(false);

  const handlePostClick = () => {
    setIsFocused(true);
  };

  const handleClose = () => {
    setIsFocused(false);
  };

  return (
    <>
      <div className="md2:w-[550px] w-[350px] h-auto]">
        <Image
          src="/images/placeholder.png"
          alt="no image"
          width={550}
          height={600}
          className="w-[550px] h-auto rounded-[50px] cursor-pointer"
          onClick={handlePostClick}
        />
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-2">
            <Image
              src=""
              alt="no image"
              className="w-[48px] h-[48px] border rounded-full"
            />
            <span className="text-neutral-400 text-xl font-bold font-['Istok Web']">
              @
            </span>
          </div>
          <div className="flex flex-row gap-8 items-center">
            <div className="flex items-center">
              <FcLike className="w-9 h-9" />
              <span className="text-red-500 ml-2">0</span>
            </div>
          </div>
        </div>
        <p className="w-[230px] ml-4 mt-4 text-white md2:w-[460px] font-istok">
          a lovely image of a really ocol thing that i really enjoyed when i
          went on this beautiful place to watch people eat my katttomtte
        </p>
      </div>
      {isFocused && (
        <div className="fixed inset-0 backdrop-blur-[10px] bg-white/10 bg-opacity-75 flex flex-col justify-center items-center z-50">
          <button
            className="absolute top-4 right-4 text-white text-3xl"
            onClick={handleClose}
          >
            &times;
          </button>
          <div className="max-w-[900px] flex flex-row">
            <div className="w-full md:w-[60%] h-[100%]">
              <Image
                src="/images/placeholder.png"
                alt="no image"
                width={554}
                height={603}
                className="w-full h-[400px] md:h-[603px]"
              />
            </div>
            <div className="w-[40%] flex-col hidden md:flex bg-black">
              <p className="mt-2 ml-4 mb-4 text-white">
                a lovely image of a really ocol thing that i really enjoyed when
                i went on this beautiful place to watch people eat my katttomtte
              </p>
              <div className="overflow-y-auto ml-4 flex-grow bg-black h-0">
                <div className={`flex flex-col max-w-[400px] w-full justify-center gap-20 h-full transition-opacity duration-300`}>
                  {/* Comment Section */}
                  <div>
                    <div className='flex flex-col overflow-y-auto h-[500px] rounded-t-md border-[2px] border-b-0 border-[#4B5766] justify-between bg-[#2e363f'>
                      <div className='flex flex-col gap-3 bg-[#2e363f] p-4'>
                        {comments.map((item, key) => (
                          <p className='text-sm'><span className='font-bold text-cyan-400'>{item.user}:</span>{item.text}</p>

                        ))}
                      </div>
                    </div>
                    <div className='flex relative'>
                      <input type="text" placeholder='Comment...' className='text-white w-full rounded-b-lg bg-[#38424d] border-[2px] border-[#4B5766] focus:border-[rgba(255,255,255,1)] outline-none font-istok p-2 pr-[80px]' />
                      <button className='absolute h-[45px] right-[0] p-3 bottom-0 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold shadow-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-300'>Submit</button>
                    </div>
                  </div>
                </div>
                <div className="flex w-full bg-slate-800">
                  <input type="text" className="w-[80%]" />
                  <button className="flex justify-center w-[20%]">Send</button>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-[890px] mt-2 w-full flex justify-start">
            <div className="flex flex-row justify-between items-center w-[100%]">
              <div className="flex flex-row items-center justify-start gap-2">
                <Image
                  src=""
                  alt="no image"
                  className="w-[48px] h-[48px] border rounded-full"
                />
                <span className="text-neutral-400 text-xl font-bold font-['Istok Web']">
                  @
                </span>
              </div>
              <div className="flex flex-row gap-8 items-center">
                <div className="flex flex-row items-center">
                  <FcLike className="w-9 h-9" />
                  <span className="text-red-500">0</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-black mt-1 rounded-3xl md:hidden">
            <div className="flex flex-col">
              <p className="mt-1 ml-4 text-white">
                a lovely image of a really ocol thing that i really enjoyed when
                i went on this beautiful place to watch people eat my katttomtte
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
