"use client";
import Image from "next/image";
import { Google_Sans_Flex } from "next/font/google";
const googleSans = Google_Sans_Flex({
  subsets: ["latin"],
  display: "swap",
});
import { motion, Variants, useSpring, useScroll } from "framer-motion";
import { FaEnvelope, FaGithub } from "react-icons/fa";
import "./app.css";
import { Poppins } from "next/font/google";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
    },
  },
};
export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="bg">
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",

          flexDirection: "column",
          padding: "10px",
          paddingTop: "120px",
        }}
      >
        <nav className="floating-nav">
          <a href="#about" className={poppins.className}>
            About
          </a>
          <a href="#experience" className={poppins.className}>
            Experience
          </a>
          <a href="#work" className={poppins.className}>
            Work
          </a>
          <a href="#contact" className={poppins.className}>
            Contact Me
          </a>

          <motion.div className="nav-progress-bar" style={{ scaleX }} />
        </nav>
        <div className="main-div" id="about">
          <div style={{ alignItems: "flex-start" }}>
            <h1 className={poppins.className}>
              Hello, I am <span className="gradient-text">Smaran.</span>
            </h1>
            <h3
              style={{
                fontWeight: "lighter",
                color: "gray",
                fontSize: "22px",
                width: "80%",
              }}
              className={poppins.className}
            >
              A full stack developer and coding enthusiast.
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
              boxShadow: " 0 20px 40px rgba(0, 113, 227, 0.35)",
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
            <p className={googleSans.className}>2025/26</p>
          </div>
        </div>
        <p
          style={{
            width: "70%",
            marginTop: "50px",
            textAlign: "center",
            fontSize: "17px",
          }}
          className={googleSans.className}
        >
          I live in Canada and I am currently in grade 10. I started coding when
          I was in grade 3. I was mainly into block coding in Scratch. Soon, I
          was introduced to web development by my mom and created my first
          website when I was 10. I got my first computer, a MacBook Pro at the
          age of 13. This led me to discovering React. From there, I learned how
          to create multiple full stack applications which can benefit my
          community. When I became 14, I discovered iOS development and SwiftUI.
          Although it was challenging at first, I kept learning until I became
          good at it. As of right now, I am developing my app and continuing to
          attend hackathons to gain experience. Not only that, I am very
          consistent academically by maintaining a 95 average throughout high
          school and a part of multiple clubs such as DECA, ModelUN, Band and
          more.
        </p>
        <h2
          id="experience"
          className={poppins.className}
          style={{ textAlign: "center" }}
        >
          ⎯ My Experience ⎯
        </h2>

        <motion.div
          className="div-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <Image
              src={"/download.png"}
              alt="React Native"
              className="img"
              width={50}
              height={50}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Image
              src={"/swiftui.png"}
              alt="swiftUI"
              className="img"
              width={50}
              height={50}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Image
              className="img"
              src={"/nextjs.png"}
              alt="Next.Js"
              width={100}
              height={100}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Image
              className="img"
              src={"/python.png"}
              alt="Python"
              width={50}
              height={50}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Image
              className="img"
              src={"/expoapp.png"}
              alt="Expo"
              width={40}
              height={40}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Image
              className="img"
              src={"/js.png"}
              alt="JavaScript"
              width={50}
              height={50}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Image
              className="img"
              src={"/css.png"}
              alt="Tailwind CSS"
              width={130}
              height={80}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Image
              className="img"
              src={"/bootstrap.png"}
              alt="Bootstrap"
              width={50}
              height={40}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Image
              className="img"
              src={"/node.png"}
              alt="node.js"
              width={70}
              height={50}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Image
              className="img"
              src={"/postgres.png"}
              alt="postgresql"
              width={70}
              height={70}
            />
          </motion.div>
        </motion.div>

        <h2
          className={poppins.className}
          style={{ textAlign: "center" }}
          id="work"
        >
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
              using React and Next.js. This is a sample website which does not
              have working payments.
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
              was made using React Native with the help of Google's AI model,
              Gemini 2.5 Flash.
            </p>

            <a
              className={`${googleSans.className} github-link`}
              href="https://github.com/smaranps/echoNotes"
              target="_blank"
            >
              <FaGithub size={20} style={{ marginRight: "5px" }} />
              GitHub Repository
            </a>
          </div>
          <div className="card">
            <Image
              src={"/twitter.png"}
              alt="Mini Twitter"
              width={280}
              height={180}
            />
            <h3
              style={{ alignSelf: "flex-start" }}
              className={poppins.className}
            >
              Mini Twitter
            </h3>
            <p className={googleSans.className}>
              Mini Twitter is the first full stack React Native application I
              created. It is a Twitter clone where users can post tweets and
              like other tweets. This was made using React Native with Expo,
              Express.js and PostgreSQL. My future plans to improve this app
              include having accounts, the ability to follow other users and
              edit posts.
            </p>

            <a
              className={`${googleSans.className} github-link`}
              href="https://github.com/smaranps/mini-twitter-final"
              target="_blank"
            >
              <FaGithub size={20} style={{ marginRight: "5px" }} />
              GitHub Repository
            </a>
          </div>
        </div>
        <h2 className={poppins.className} style={{ textAlign: "center" }}>
          ⎯ Contact Me ⎯
        </h2>

        <div className="contact-box" id="contact">
          <a
            href="https://www.instagram.com/smaran_dagoat"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item"
          >
            <FaInstagram size={22} />
            <span>@smaran_dagoat</span>
          </a>

          <a
            href="mailto:smaranpinisetty@gmail.com"
            target="_blank"
            className="contact-item"
          >
            <FaEnvelope size={22} />
            <span>smaranpinisetty@gmail.com</span>
          </a>

          <a
            href="https://github.com/smaranps"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item"
          >
            <FaGithub size={22} />
            <span>github.com/smaranps</span>
          </a>
        </div>
      </div>
    </div>
  );
}
