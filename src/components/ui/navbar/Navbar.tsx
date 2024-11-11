import LogoIcon from "../../../../src/assets/logoicon.svg";
import { Button } from "../button";
import { TbAlignRight, TbShoppingBag } from "react-icons/tb";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom";
const Navbar = () => {
  const isAuthenticated = true;

  return (
    <div>
      <div className="top__navbar fixed bg-white z-20 w-full h-10 flex flex-row align-middle justify-between items-center pr-4">
        <Link to="/">
          <img src={LogoIcon} className="h-8"></img>
        </Link>
        {isAuthenticated ? (
          <div className="gap-2 hidden md:flex">
            <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center text-2xl relative">
              <div className="shopping__cart">
                <TbShoppingBag />
              </div>
              <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-white text-xs font-bold">
                1
              </div>
            </div>

            <div className="h-6 w-6 rounded-full object-contain overflow-hidden ">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>NN</AvatarFallback>
              </Avatar>
            </div>
          </div>
        ) : (
          <div className="buttons_login gap-2 hidden md:flex">
            <Button variant="default">Log In</Button>
            <Button variant="outline" className="border border-primary">
              Sign Up
            </Button>
          </div>
        )}
        <div className="buttons_burger gap-2 md:hidden">
          <Button variant="outline" className="text-xl">
            <TbAlignRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
