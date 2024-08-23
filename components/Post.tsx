import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsChat } from "react-icons/bs";
import { FcLike } from "react-icons/fc";

const Post = () => {
  return (
    <div className="w-[554px]">
      <Image
        src=""
        alt="no image"
        className="w-[554px] h-[603px] rounded-[100px]"
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
            <span>0</span>
          </div>
          <BsChat className="w-9 h-9" />
        </div>
      </div>
      <p className="w-[460px] ml-4 mt-4">
        
      </p>
    </div>
  );
};

export default Post;
