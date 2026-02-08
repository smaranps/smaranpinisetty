import Image from "next/image";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"], display: "swap" });
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Home() {
  // Creating a portofolio website using Next.js
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url(/background.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          paddingTop: "100px",
          flexDirection: "column",
          padding: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <div style={{ alignItems: "flex-start" }}>
            <h1 style={{ fontFamily: "Manrope, sans-serif" }}>
              Hi! I am Smaran!
            </h1>
            <h3
              style={{
                fontWeight: "lighter",
                color: "gray",
                fontFamily: "Manrope, sans-serif",
              }}
            >
              I am a 15 year old programmer who is passionate about coding.
            </h3>
          </div>
          <div
            style={{
              padding: "15px",
              backgroundColor: "#Faf9F9",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5%",
            }}
          >
            <Image
              src={"/portofolio_image.png"}
              alt="profile"
              width={250}
              height={300}
              style={{ borderRadius: "5%" }}
            />
            <p className={inter.className}>
              Smaran Pinisetty 24/25 School Year
            </p>
          </div>
        </div>
        <p style={{ fontFamily: "Manrope, sans-serif", width: "50%" }}>
          I started coding when I was in grade 3. I was mainly into block coding
          in Scratch. Soon, I was introduced to web development by my mom and
          created my first website when I was 10. I got my first computer, a
          MacBook Pro at the age of 13. This led me to discovering React. From
          there, I learned how to create multiple full stack applications which
          can benefit my community. When I became 14, I discovered iOS
          development and SwiftUI. Although it was challenging at first, I kept
          learning until I became good at it. When I turned 15, I discovered the
          Swift Student Challenge. I knew that this challenge could provide me
          the opportunity to showcase my talent to the world. I started
          developing an application that promotes creativity and critical
          thinking for children. As of right now, I am developing my app and
          continuing to attend hackathons to gain experience.
        </p>
      </div>
    </div>
  );
}
