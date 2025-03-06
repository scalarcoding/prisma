import LogoIcon from "../../../../src/assets/logoicon.svg";
import { Button } from "../button";
import { TbAlignRight, TbSearch, TbShoppingBag, TbTrash } from "react-icons/tb";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link, useNavigate } from "react-router-dom";
import { ReusablePopover } from "@/pages/ProductsDetail/atomic/tabs/ReusablePopover";
import GoodsAvatar from "@/pages/ProductsDetail/atomic/GoodsAvatar";
import { useEffect, useRef, useState } from "react";
import { User } from "@/types/user";
import AuthDialogButton from "@/pages/Auth/AuthDialogButton";
import SignupForm from "@/pages/Auth/Signup/SignupForm";
import { DNA } from "react-loader-spinner";
import LoginForm from "@/pages/Auth/Login/atomic/LoginForm";
import { useAuth } from "@/hooks/use-auth";
import { PopoverClose } from "@radix-ui/react-popover";
import SuggestionText from "../suggestiontext/suggestiontext";
import { routes } from "@/pages/Routes/routes";
import { getEmailByUserId } from "@/api/auth/getEmailByUserId";
import { Combobox } from "../combobox/ComboBox";
import { Label } from "../label";
import { Separator } from "../separator";
import { updateLastActiveDistrict } from "@/api/auth/switch-district";

const Navbar = () => {
  const { user, signIn, signOut, deleteItemFromCart } = useAuth();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openSignupDialog, setOpenSignupDialog] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [activeDistrict, setActiveDistrict] = useState(
    user?.lastActiveDistrict
  );

  const navigate = useNavigate();


  const inputRef = useRef<HTMLInputElement | null>(null);

  const districtOptions =
    user?.district?.map((district) => ({
      value: district,
      label: district, // Assign the same value to the label
    })) || [];



  useEffect(() => {
    if (user) {
      setIsAuthenticated(true); // User is authenticated
    } else {
      setIsAuthenticated(false); // User is not authenticated
    }
  }, [user]); // Re-run whenever currentUser changes

  // Handle key press for Shift + Cmd + F
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key === "F") {
        inputRef.current?.focus(); // Focus on the input
        event.preventDefault(); // Prevent default browser action
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleShowCart = () => {
    window.location.href = "/cart";
  };

  // const handleLogin = async(values: User) =>{
  //   console.log(values);
  // }

  const handleSignUp = async (values: User) => {
    setIsAuthenticating(true); // Start the authenticating process
    try {
      // Simulate delay for demonstration (e.g., server response time)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Perform your logic
      console.log(values);
      // const token = values.userid;
      // const encrypted = await encryptToken(token, values.password);
      // const encoded = encode(encrypted);
      // console.log("Encrypted & Encoded Token:", encoded);

      // const decoded = decode(encoded)
      // const decrypted = await decryptToken(decoded, values.password);
      // console.log("Decoded & Decrypted Token:", decrypted);
    } catch (error) {
      console.error("Error during encryption/decryption:", error);
    } finally {
      setIsAuthenticating(false); // End the authenticating process
    }
  };

  const handleLogin = async (values: User) => {
    setIsAuthenticating(true); // Start the authenticating process

    try {
      // Perform your logic
      const email = await getEmailByUserId(values.userid);

      //PERFORM LOGIN
      signIn(email, values.password);
    } catch (error) {
      console.error("Error during encryption/decryption:", error);
    } finally {
      setIsAuthenticating(false); // End the authenticating process
      setIsAuthenticated(true);
    }
  };

  const handleSwitchDistrict = async (dist: string) => {
    setActiveDistrict(dist);
    await updateLastActiveDistrict({
      user_id: user!.userid,
      last_active_district: dist,
    });
    console.log(dist);
  };

  const handleNameSelected = (e: string) => {
    const parts = e.split("-").map((part) => part.trim());

    // Take the second element of the array
    const shortcut = parts[0];
    console.log(shortcut);

    const results = routes.filter(
      (route) =>
        route.isIndexed === true && // Ensure the route is indexed
        route.shortcut?.toLowerCase().includes(shortcut.toLowerCase()) // Check if the description includes secondPart
    );
    navigate(results[0].path);
  };

  const handleSuggestionSubmit = (e: string) => {
    const results = routes.filter(
      (route) => route.shortcut?.toLowerCase() == e.toLowerCase()
    );
    navigate(results[0].path);
  };

  const handleDeleteItem = (id: number) => async () => {
    console.log("Deleting item:", id);
    await deleteItemFromCart(id, user!.userid);
    
  }

  return (
    <div>
      <div className="top__navbar fixed bg-white z-20 w-full h-10 flex flex-row align-middle justify-between items-center pr-4">
        <Link to="/">
          <img src={LogoIcon} className="h-8 pl-4"></img>
        </Link>
        <div className="w-full  h-full hidden md:flex items-center justify-center ">
          <div className="search__box w-1/4 p-2  rounded-lg ml-16 inline-flex justify-center items-center gap-2">
            <SuggestionText
              label=""
              onFormSubmit={handleSuggestionSubmit}
              onNameSelected={(e) => handleNameSelected(e)}
              ref={inputRef} // Attach ref to SuggestionText
              placeholder="Shift + F to navigate"
              suggestions={routes
                .map(
                  ({ shortcut, description }) =>
                    shortcut && description
                      ? `${shortcut} - ${description}`
                      : null // Combine shortcut and description
                )
                .filter((item): item is string => !!item)} // Filter out null values
            />
          </div>
        </div>
        {isAuthenticated ? (
          <div className="gap-2 hidden md:flex pl-24  md:gap-4">
            <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center text-2xl relative">
              <div className="shopping__cart cursor-pointer">
                <ReusablePopover
                  trigger={
                    <Button variant="link">
                      <TbShoppingBag />
                    </Button>
                  }
                  title="Keranjang"
                  subtitle=""
                  content={
                    <div className="cart__contents flex flex-col gap-2 bg-white">
                      { user && user!.cart!.length === 0 && <h1 className="text-sm">Keranjang Kosong</h1>}
                      {
                      user?.cart!.map((item, index) => (
                        <div className="cart__item__container py-1" key={index}>
                          <div key={index} className="cart__item flex gap-2 items-center">
                          <div className="w-10 h-10">
                            { !item.img_url || item.img_url=='' ? <GoodsAvatar /> : <img src={item.img_url}></img> }
                          </div>
                          <div className="w-2/4 text-sm">
                            {item.item_description || "Unknown Item"}
                          </div>
                          <div className="w-1/4">
                            x{" "}
                            <span className="font-bold">
                              {item.order_qty || 0}
                            </span>
                          </div>
                          <button onClick={handleDeleteItem(item.id)}><TbTrash/> </button>
                        </div>
                        <Separator />
                        </div>
                      ))}
                      {/* <h1 className="text-sm">.....4 item lainnya</h1> */}
                      { user && user!.cart!.length > 0 && <div className="cart__actions mt-6 flex gap-2 w-ful justify-end">
                        <Button  onClick={handleShowCart}>
                          Check Out
                        </Button>
                      </div> }
                    </div>
                  }
                />
              </div>
              <div
                className={`absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-white text-xs font-bold ${
                  user && user?.cart!.length > 0 ? "bg-red-600" : "bg-gray-400"
                }`}
              >
                {user && user?.cart!.length}
              </div>
            </div>

            <div className="h-6 w-6 rounded-full object-contain overflow-hidden flex">
              <ReusablePopover
                title="User"
                subtitle=""
                trigger={
                  <button>
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>NN</AvatarFallback>
                    </Avatar>
                  </button>
                }
                content={
                  <div className="cart__contents flex flex-col w-full gap-2 bg-white">
                    <div className="profile text-slate-400">
                      <h1>{user?.userid}</h1>
                      <h1>{user?.email}</h1>
                    </div>
                    <Separator className="my-4" />
                    <Label>Active District</Label>
                    <Combobox
                      value={activeDistrict!}
                      options={districtOptions}
                      placeholder={user?.lastActiveDistrict}
                      onChange={handleSwitchDistrict}
                    />
                    <Separator className="my-4" />
                    <PopoverClose
                      className="bg-slate-100 w-full py-2"
                      onClick={() => {
                        console.log("loggin out");
                        signOut();
                      }}
                    >
                      <div className="">Log Out</div>
                    </PopoverClose>
                  </div>
                }
              ></ReusablePopover>
            </div>
          </div>
        ) : isAuthenticating ? (
          // Show a loader or placeholder when authenticating
          <div className="px-9 pl-12">
            <DNA
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        ) : (
          <div className="buttons_login gap-2 hidden md:flex">
            {/* Log In Button with Dialog */}
            <AuthDialogButton
              HeroLogo={LogoIcon}
              open={openLoginDialog}
              setOpen={setOpenLoginDialog}
              title="Log In"
              subtitle="Log in to your account"
              content={<LoginForm onSave={handleLogin} />} // Pass your form component
              onSave={handleLogin}
              triggerButton={<Button variant="default">Log In</Button>} // Custom trigger button
            />

            {/* Sign Up Button with Dialog */}
            <AuthDialogButton
              HeroLogo={LogoIcon}
              open={openSignupDialog}
              setOpen={setOpenSignupDialog}
              title="Sign Up"
              subtitle="Create an account to get started."
              content={<SignupForm onSave={handleSignUp} />} // Pass your form component
              onSave={handleSignUp}
              triggerButton={<Button variant="secondary">Sign Up</Button>} // Custom trigger button
            />
          </div>
        )}
        <div className="buttons_burger flex gap-2 md:hidden">
          <Button variant="secondary" className="text-xl">
            <TbSearch />
          </Button>
          <Button variant="outline" className="text-xl">
            <TbAlignRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
