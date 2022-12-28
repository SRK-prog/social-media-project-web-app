import "./about.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Image from "./MyImg.jpeg";
import { Link } from "react-router-dom";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    document.title = "Mern - about";
  }, []);
  return (
    <div className="AboutFlexBox">
      <Sidebar />
      <div className="AboutContainerCenter">
        <div className="Display___None">
          <div className="AboutColorContainer"></div>
          <div className="AboutMyprofileContainer">
            <img src={Image} alt="" className="AboutMyImg" />
            <div className="AboutMyprpFlexbox">
              <Link to="/profile/siva" className="AboutMyProBtn">
                Profile
              </Link>
            </div>
            <div className="AboutMyname">SIVARAMAKRISHNAN.R</div>
            <div className="AboutMyTitle">Web Developer</div>
          </div>
          <div className="AboutMyAboutWrap">
            {" "}
            <div className="AboutMyAboutTitle">Profile</div>
            <div className="AboutMyAbout">
              I'm a self learned mern stack developer, I have a good knowledge
              in Mern stack development. I worked with some of my personal
              projects to enhance my skills in web web development.
            </div>
          </div>
          <div className="AboutMyEduWrap">
            <div className="AboutMyEduTitle">Education</div>
            <div className="AboutMyEdu">
              I have completed my BCA under graduate in 2021, I got decent
              experience on learning and socializing. Then I learned web
              technology with YouTube that developed my skills.
            </div>
          </div>
          <div className="AboutMySkillsWrap">
            <div className="AboutMySkillTitle">Key Skills</div>
            <div className="AboutMySkillSubs">
              <div className="SkillsList">HTML5</div>
              <div className="SkillsList">CSS</div>
              <div className="SkillsList">REACT.JS</div>
              <div className="SkillsList">JAVASCRIPT</div>
              <div className="SkillsList">NODE.JS</div>
              <div className="SkillsList">EXPRESS.JS</div>
              <div className="SkillsList">MONGODB</div>
              <div className="SkillsList">PYTHON</div>
              <div className="SkillsList">GIT/GITHUB</div>
            </div>
          </div>
          <div className="AboutMyEduWrap">
            <div className="AboutMyEduTitle">Experience</div>
            <div className="AboutMyEdu">
              I worked on few personal projects, I write short and reusable
              code, I know to work with libraries like react.js, bootstrap,
              material ui.
            </div>
          </div>
        </div>{" "}
        <div className="AboutMyAboutWrap">
          {" "}
          <div className="AboutMyAboutTitle">Description</div>
          <div className="AboutMyAbout" style={{ fontSize: "0.9rem" }}>
            Hai, I'm sivaramakrishnan. Mern is my first mern stack website, It
            took me a month to complete, I work a lot to develop this website,
            This website help me to learn a lot of new stuff in web development.
          </div>
        </div>
        <div className="AboutMyEduWrap">
          <div className="AboutMyEduTitle"> About Project</div>
          <div className="AboutMyEdu" style={{ fontSize: "0.9rem" }}>
            Mern is a fully fledged social media website. You can communicate
            with your friends and share posts. It has a chat option and you can
            like and comment a post. You can follow peoples to view their posts.
            I use React for front-end and node for back-end.
          </div>
        </div>
        <div className="AboutMySkillsWrap">
          <div className="AboutMySkillTitle">Tools</div>
          <div className="AboutMySkillSubs">
            <div className="SkillsList" style={{ fontSize: "0.9rem" }}>
              REACT.JS
            </div>
            <div className="SkillsList" style={{ fontSize: "0.9rem" }}>
              NODE.JS
            </div>
            <div className="SkillsList" style={{ fontSize: "0.9rem" }}>
              EXPRESS.JS
            </div>
            <div className="SkillsList" style={{ fontSize: "0.9rem" }}>
              MONGODB
            </div>
            <div className="SkillsList" style={{ fontSize: "0.9rem" }}>
              MATERIAL.IU
            </div>
            <div className="SkillsList" style={{ fontSize: "0.9rem" }}>
              CLOUDINARY
            </div>
          </div>
        </div>
        <div className="AboutMyIcons Display___None">
          <div className="IconList">
            <a href="https://twitter.com/SRK_R_?t=58WfgjgrqabaZrXWBHTZkg&s=08">
              <TwitterIcon className="IconsList" />
            </a>
            <a href="https://github.com/SRK-prog/">
              <GitHubIcon className="IconsList" />
            </a>
            <a href="https://www.linkedin.com/in/sivaramakrishnan-r262/">
              <LinkedInIcon className="IconsList" />
            </a>
            <a href="https://www.instagram.com/siva.r12/">
              <InstagramIcon className="IconsList" />
            </a>
          </div>
        </div>
      </div>
      <div className="AboutContainerRight">
        <div className="AboutColorContainer"></div>
        <div className="AboutMyprofileContainer">
          <img src={Image} alt="" className="AboutMyImg" />
          <div className="AboutMyprpFlexbox">
            <Link to="/about" className="AboutMyProBtn">
              Profile
            </Link>
          </div>
          <div className="AboutMyname">SIVARAMAKRISHNAN.R</div>
          <div className="AboutMyTitle">Web Developer</div>
        </div>
        <div className="AboutMyAboutWrap">
          {" "}
          <div className="AboutMyAboutTitle">Profile</div>
          <div className="AboutMyAbout">
            I'm a self learned mern stack developer, I have a good knowledge in
            Mern stack development. I worked with some of my personal projects
            to enhance my skills in web web development.
          </div>
        </div>
        <div className="AboutMyEduWrap">
          <div className="AboutMyEduTitle">Education</div>
          <div className="AboutMyEdu">
            I have completed my BCA under graduate in 2021, I got decent
            experience on learning and socializing. Then I learned web
            technology with YouTube that developed my skills.
          </div>
        </div>
        <div className="AboutMySkillsWrap">
          <div className="AboutMySkillTitle">Key Skills</div>
          <div className="AboutMySkillSubs">
            <div className="SkillsList">HTML5</div>
            <div className="SkillsList">CSS</div>
            <div className="SkillsList">REACT.JS</div>
            <div className="SkillsList">JAVASCRIPT</div>
            <div className="SkillsList">NODE.JS</div>
            <div className="SkillsList">EXPRESS.JS</div>
            <div className="SkillsList">MONGODB</div>
            <div className="SkillsList">PYTHON</div>
            <div className="SkillsList">GIT/GITHUB</div>
          </div>
        </div>
        <div className="AboutMyEduWrap">
          <div className="AboutMyEduTitle">Experience</div>
          <div className="AboutMyEdu">
            I worked on few personal projects, I write short and reusable code,
            I know to work with libraries like react.js, bootstrap, material ui.
          </div>
        </div>
        <div className="AboutMyIcons">
          <div className="IconList">
            <a href="https://twitter.com/SRK_R_?t=58WfgjgrqabaZrXWBHTZkg&s=08">
              <TwitterIcon className="IconsList" />
            </a>
            <a href="https://github.com/SRK-prog/">
              <GitHubIcon className="IconsList" />
            </a>
            <a href="https://www.linkedin.com/in/sivaramakrishnan-r262/">
              <LinkedInIcon className="IconsList" />
            </a>
            <a href="https://www.instagram.com/siva.r12/">
              <InstagramIcon className="IconsList" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
