import NavBar from "./navbar/page";

export default function Home() {
  return (
    <div className="h-[100vh] w-ful grid items-start">
      <NavBar />
      <div className="h-[80vh] w-full flex items-center justify-center">
        <div className="h-[85vh] w-[90%] bg-white grid md:grid-cols-2">
          <div className="text-black p-4 h-auto w-full flex items-center justify-center">
            <div className="mb-4 font-medium text-5xl uppercase flex flex-col justify-center items-center  leading-normal	">
              <p>Welcome</p>
              <p>to</p>
              <p>sultan tracker</p>
            </div>
          </div>
          <img
            src="https://sultantracker.com/static/media/City_driver.fd3eed00.svg"
            alt=""
            className="w-screen h-full"
          />
        </div>
      </div>
    </div>
  );
}
