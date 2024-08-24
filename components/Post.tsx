"use client";

import Image from "next/image";
import React, { useState } from "react";
import { BsChat } from "react-icons/bs";
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
      <div className="w-[554px]">
        <Image
          src="/images/placeholder.png"
          alt="no image"
          width={554}
          height={603}
          className="w-[554px] h-[603px] rounded-[100px] cursor-pointer"
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
            <div className="flex flex-row items-center">
              <FcLike className="w-9 h-9" />
              <span className="text-red-500 ml-2">0</span>
            </div>
            <BsChat className="w-9 h-9" />
          </div>
        </div>
        <p className="w-[460px] ml-4 mt-4"></p>
      </div>
      {isFocused && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center z-50">
          <button
            className="absolute top-4 right-4 text-white text-3xl"
            onClick={handleClose}
          >
            &times;
          </button>
          <div className="bg-white rounded-lg p-4 w-[90%] max-w-[900px] flex flex-row">
            <div className="w-[60%] h-[100%]">
              <Image
                src="/images/placeholder.png"
                alt="no image"
                width={554}
                height={603}
                className="w-full h-[603px] rounded-xl"
              />
            </div>
            <div className="w-[40%] pl-4 flex flex-col">
              <p className="mt-2 flex-grow"></p>
              <div className="overflow-y-auto flex-grow rounded-xl bg-blue-950 h-full">
                {/* {comments.map((comment) => (
                  <p>{comment.text}</p>
                ))} */}
              </div>
            </div>
          </div>
          <div className="w-[890px] flex justify-start">
            <div className="flex flex-row justify-between items-center w-[530px]">
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
                <BsChat className="w-9 h-9" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
