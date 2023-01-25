import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    document.title = "Mern - about";
  }, []);

  return <div className="">About Project Page</div>;
}
