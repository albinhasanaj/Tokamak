"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FcLike } from "react-icons/fc";
// import { comments } from "../constants/api/comments.ts";

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
                className="w-full h-[480px] md:h-[603px]"
              />
            </div>
            <div className="w-[40%] flex-col hidden md:flex bg-black">
              <p className="mt-2 ml-4 mb-4 text-white">
                a lovely image of a really ocol thing that i really enjoyed when
                i went on this beautiful place to watch people eat my katttomtte
              </p>
              <div className="overflow-y-auto ml-4 flex-grow bg-black h-0">
                {/* {comments.map((comment) => (
                  <p>{comment.text}</p>
                ))} */}
                <div className="flex w-full bg-slate-800">
                  <input type="text" className="w-[80%]"/>
                  <button className="flex justify-center w-[20%]">Send</button>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-[890px] mt-4 w-full flex justify-start">
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
          <div className="bg-black mt-4 rounded-3xl md:hidden">
            <div className="flex flex-col">
              <p className="mt-2 ml-4 text-white">
                a lovely image of a really ocol thing that i really enjoyed when
                i went on this beautiful place to watch people eat my katttomtte
              </p>
              <div className="overflow-y-auto ml-4 flex-grow max-h-[150px]">
                {/* {comments.map((comment) => (
                  <p>{comment.text}</p>
                ))} */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
