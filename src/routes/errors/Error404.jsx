import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <div className="flex justify-center w-full items-center text-center">
      <div className="error mt-28">
        <img
          className="w-2/3 mx-auto object-contain"
          src="/images/error-image.png"
          alt="error404"
        />
        <div className="text-5xl text-gray-60 font-semibold mt-7">Page Not Found</div>
        <div className="mt-5">
          <Link className="text-blue-10 underline font-semibold" to="/">
            Return to Home page
          </Link>
        </div>
      </div>
    </div>
  );
}
