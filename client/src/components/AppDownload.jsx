import { assets } from "../assets/assets";

const AppDownload = () => {
  return (
    <div className="container px-4 2xl:px-20 mx-auto my-20">
      <div className="relative bg-gradient-to-r from-violet-50 to-purple-50 p-12 sm:p-24 lg:p-32 rounded-lg">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold mb-8 max-w-md">
            Download Mobile App For Better Experience
          </h1>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/rashid-c/"
              className="inline-block"
            >
              <img
                className="h-12"
                src={assets.play_store}
                alt="play_store img"
              />
            </a>
            <a href="https://github.com/Rashid-C" className="inline-block">
              <img
                className="h-12"
                src={assets.app_store}
                alt="app_store img"
              />
            </a>
          </div>
        </div>
        <img
          className="absolute w-80 right-0 bottom-0 mr-32 max-lg:hidden"
          src={assets.app_main_img}
          alt="app_main_img"
        />
      </div>
    </div>
  );
};

export default AppDownload;