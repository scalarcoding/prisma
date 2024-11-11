"use client";
import React from "react";
import { BackgroundBeams } from "../background-beams";
import { PlaceholdersAndVanishInput } from "../placeholders-and-vanish-input";
import { heroSearchPlaceholders } from "@/constants/placeholders";

export function HeroSection() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div className="h-[20rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative text-lg md:text-4xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Search Anything
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative">
          Search for your desired product by using keywords
        </p>
        <div className="z-1">
        <PlaceholdersAndVanishInput placeholders={heroSearchPlaceholders} onChange={handleChange} onSubmit={onSubmit}/>
        </div>
      </div>
      {/* <BackgroundBeams className="z-0"/> */}
    </div>
  );
}
