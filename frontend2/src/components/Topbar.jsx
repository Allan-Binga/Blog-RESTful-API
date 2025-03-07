import Link from "next/link";

export default function Topbar() {
  const user = true;
  return (
    <div className="w-full h-12 bg-white sticky top-0 flex items-center z-50 shadow-md">
      <div className="flex-1 flex justify-center items-center">
        <i className="text-xl mr-3 text-gray-700 cursor-pointer fab fa-facebook-square"></i>
        <i className="text-xl mr-3 text-gray-700 cursor-pointer fab fa-instagram-square"></i>
        <i className="text-xl mr-3 text-gray-700 cursor-pointer fab fa-pinterest-square"></i>
        <i className="text-xl text-gray-700 cursor-pointer fab fa-twitter-square"></i>
      </div>
      <div className="flex-2">
        <ul className="flex justify-center m-0 p-0 list-none">
          <li className="mr-5 text-lg font-light cursor-pointer hover:text-gray-500">
            <Link href="/">HOME</Link>
          </li>
          <li className="mr-5 text-lg font-light cursor-pointer hover:text-gray-500">
            ABOUT
          </li>
          <li className="mr-5 text-lg font-light cursor-pointer hover:text-gray-500">
            CONTACT
          </li>
          <li className="mr-5 text-lg font-light cursor-pointer hover:text-gray-500">
            <Link href="/write">WRITE</Link>
          </li>
          {user && (
            <li className="text-lg font-light cursor-pointer hover:text-gray-500">
              LOGOUT
            </li>
          )}
        </ul>
      </div>
      <div className="flex-1 flex justify-center items-center">
        {user ? (
          <Link href="/settings">
            <img
              className="w-10 h-10 rounded-full object-cover mr-4 cursor-pointer"
              src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
          </Link>
        ) : (
          <ul className="flex">
            <li className="mr-5 text-lg font-light cursor-pointer hover:text-gray-500">
              <Link href="/login">LOGIN</Link>
            </li>
            <li className="text-lg font-light cursor-pointer hover:text-gray-500">
              <Link href="/register">REGISTER</Link>
            </li>
          </ul>
        )}
        <i className="text-lg text-gray-600 cursor-pointer fas fa-search"></i>
      </div>
    </div>
  );
}
