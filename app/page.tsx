import Image from "next/image";
import { Google_Sans_Flex } from "next/font/google";
const googleSans = Google_Sans_Flex({
  subsets: ["latin"],
  display: "swap",
});
import { FaGithub } from "react-icons/fa";
import "./app.css";
import { Poppins } from "next/font/google";
import { FaExternalLinkAlt } from "react-icons/fa";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Home() {
  // Creating a portofolio website using Next.js
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "whitesmoke",
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
        <div className="main-div">
          <div style={{ alignItems: "flex-start" }}>
            <h1 className={poppins.className}>Hello, I am Smaran!</h1>
            <h3
              style={{
                fontWeight: "lighter",
                color: "gray",
                fontSize: "22px",
                width: "80%",
              }}
              className={poppins.className}
            >
              a 15 year old programmer who is passionate about coding.
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
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              marginTop: "20px",
              width: "270px",
            }}
          >
            <Image
              src={"/portfolio.png"}
              alt="profile"
              width={260}
              height={300}
              style={{ borderRadius: "5%" }}
            />
            <p className={googleSans.className}>Me in 2024/25 school year</p>
          </div>
        </div>
        <p
          style={{
            width: "70%",
            marginTop: "50px",
          }}
          className={googleSans.className}
        >
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
        <h2 className={poppins.className} style={{ textAlign: "center" }}>
          ⎯ My Experience ⎯
        </h2>
        <div className="div-2">
          <Image
            src={"/download.png"}
            alt="React Native"
            width={50}
            height={50}
          />
          <Image
            className="img"
            src={"/swiftui.png"}
            alt="swiftUI"
            width={50}
            height={50}
          />
          <Image
            className="img"
            src={"/nextjs.png"}
            alt="Next.Js"
            width={100}
            height={100}
          />
          <Image
            className="img"
            src={"/python.png"}
            alt="Python"
            width={50}
            height={50}
          />
          <Image
            className="img"
            src={"/expoapp.png"}
            alt="Expo"
            width={40}
            height={40}
          />
          <Image
            className="img"
            src={"/js.png"}
            alt="JavaScript"
            width={50}
            height={50}
          />
          <Image
            className="img"
            src={"/css.png"}
            alt="Tailwind CSS"
            width={130}
            height={80}
          />
          <Image
            className="img"
            src={"/bootstrap.png"}
            alt="Bootstrap"
            width={50}
            height={40}
          />
          <Image
            className="img"
            src={"/node.png"}
            alt="node.js"
            width={70}
            height={50}
          />
          <Image
            className="img"
            src={"/postgres.png"}
            alt="postgresql"
            width={70}
            height={70}
          />
        </div>

        <h2 className={poppins.className} style={{ textAlign: "center" }}>
          ⎯ My Work ⎯
        </h2>
        <div className="card-container">
          <div className="card">
            <Image
              src={"/doorstep.png"}
              alt="Doorstep Desserts"
              width={310}
              height={200}
            />
            <h3
              style={{ alignSelf: "flex-start" }}
              className={poppins.className}
            >
              Doorstep Desserts
            </h3>
            <p className={googleSans.className}>
              DoorstepDesserts is a website I made for my neighbours baking
              business. It is a fully functional website that takes orders from
              customers and allow payments using Stripe. This website was made
              using React and Next.js.
            </p>

            <a
              className={`${googleSans.className} github-link`}
              href="https://doorstepdesserts-main.vercel.app"
              target="_blank"
            >
              <FaExternalLinkAlt size="0.8em" style={{ marginRight: "5px" }} />
              Demo
            </a>
          </div>
          <div className="card">
            <Image
              src={"/echo.jpg"}
              alt="Doorstep Desserts"
              width={300}
              height={190}
            />
            <h3
              style={{ alignSelf: "flex-start" }}
              className={poppins.className}
            >
              EchoNotes
            </h3>
            <p style={{ fontSize: "15px" }} className={googleSans.className}>
              EchoNotes is an app that can take long lectures and convert them
              into a few sentences, making it easier to interpret for students
              with learning disabilites.This App can also simplify questions
              instead of directly giving the answer to improve learning. This
              was made using React Native.
            </p>

            <a
              className={`${googleSans.className} github-link`}
              href="https://github.com/smaranps/echoNotes"
              target="_blank"
            >
              <FaGithub size={20} style={{ marginRight: "5px" }} />
              GitHub Repo
            </a>
          </div>
          <div className="card">
            <Image
              src={"/doorstep.png"}
              alt="Doorstep Desserts"
              width={310}
              height={200}
            />
            <h3
              style={{ alignSelf: "flex-start" }}
              className={poppins.className}
            >
              Doorstep Desserts
            </h3>
            <p className={googleSans.className}>
              DoorstepDesserts is a website I made for my neighbours baking
              business. It is a fully functional website that takes orders from
              customers and allow payments using Stripe. This website was made
              using React and Next.js.
            </p>

            <a
              className={`${googleSans.className} github-link`}
              href="https://doorstepdesserts-main.vercel.app"
              target="_blank"
            >
              <FaExternalLinkAlt size="0.8em" style={{ marginRight: "5px" }} />
              Sample Demo
            </a>
          </div>
          <div className="card">
            <Image
              src={"/doorstep.png"}
              alt="Doorstep Desserts"
              width={310}
              height={200}
            />
            <h3
              style={{ alignSelf: "flex-start" }}
              className={poppins.className}
            >
              Doorstep Desserts
            </h3>
            <p className={googleSans.className}>
              DoorstepDesserts is a website I made for my neighbours baking
              business. It is a fully functional website that takes orders from
              customers and allow payments using Stripe. This website was made
              using React and Next.js.
            </p>

            <a
              className={`${googleSans.className} github-link`}
              href="https://doorstepdesserts-main.vercel.app"
              target="_blank"
            >
              <FaExternalLinkAlt size="0.8em" style={{ marginRight: "5px" }} />
              Sample Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
