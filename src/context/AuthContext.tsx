import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { supabase } from "@/api/repository/supabase";
import { DNA } from "react-loader-spinner";
import { AuthContextType } from "@/model/AuthContextType";
import { CurrentUser } from "@/types/user";
import { nanoid } from "nanoid";
import { getCurrentUserByAccessToken, getCurrentUserByEmail } from "./getPrivileges";
import { unixToSupabaseTimestamptz } from "@/utils/dateUtils";
import { AddItemPayload, WarehouseRequisitionCart } from "@/components/ui/navbar/Cart/wr_cart_model";
import { getUserCart } from "./getUserCart";
import { PostgreError } from "./postgreError";

// Create the AuthContext with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<{
    authToken: string | null;
    currentUser: CurrentUser | null;
  }>({
    authToken: null,
    currentUser: null,
  });
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch current session and user from localStorage or Supabase
  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true); // Start loading

        //Get Session from supabase
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error fetching session:", error.message);
          throw error;
        }

        if (!data.session) {
          console.warn("Session is null. User is not authenticated.");
          setAuthState({ authToken: null, currentUser: null });
          signOut();
          return;
        }

        // If user is authenticated then retrieve the token from local storage
        const userToken = localStorage.getItem("token");

        // If token is not found, meaning somebody erased it, then call signout
        if (!userToken) {
          signOut();
          throw new Error("token not found");
        }
          const user = await getCurrentUserByAccessToken(userToken);

          //If the session is expired, call signOut
          if(!user?.isSessionActive){
            signOut();
            return;
          }

          setAuthState({
            authToken: data.session.access_token,
            currentUser: user,
          });
                
      } catch (err) {
        console.error("Unexpected error fetching session:", err);
        setAuthState({ authToken: null, currentUser: null });
      } finally {
        setLoading(false); // End loading
      }
    };

    getUser();
  }, []);





  // Sign-in logic
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        throw error;
      }


      const session = data.session;
      if (session) {

        
        

        const user = await getCurrentUserByEmail(email);

        console.log(user)
        // Generate a random UUID for the access token
        let newAccessToken = nanoid(32);

        // Check if the generated UUID already exists in the public_users table
        let { data: existingTokens, error: checkError } = await supabase
          .from("public_users")
          .select("*")
          .eq("access_token", newAccessToken);

        if (checkError) {
          console.error(
            "Error checking existing access token:",
            checkError.message
          );
          throw checkError;
        }

        // If the access token already exists, regenerate until unique
        while (existingTokens && existingTokens.length > 0) {
          newAccessToken = nanoid(32); // Generate a new UUID
          ({ data: existingTokens, error: checkError } = await supabase
            .from("public_users")
            .select("access_token")
            .eq("access_token", newAccessToken));

          if (checkError) {
            console.error(
              "Error checking existing access token:",
              checkError.message
            );
            throw checkError;
          }
        }

        // Store the access token in localStorage (for now, ensure secure handling in production)
        localStorage.setItem("token", newAccessToken);

        // Update the user's access token in the public_users table
        const { error: updateError } = await supabase
          .from("public_users")
          .update({ access_token: newAccessToken, expired_at : unixToSupabaseTimestamptz!(data.session.expires_at!) }) // Update the access_token field
          .eq("email", email); // Match the row based on the user id

        if (updateError) {
          console.error(
            "Error updating access token in public_users table:",
            updateError.message
          );
          throw updateError;
        }


        setAuthState({
          authToken: newAccessToken,
          currentUser: user,
        });
      }
    } catch (err) {
      console.error("Error during sign-in:", err);
      throw err;
    }
  };

  // Sign-out logic
const signOut = async () => {
  try {
    // Get the current user before signing out
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      console.error("Error retrieving session:", sessionError.message);
      throw sessionError;
    }

    const user = sessionData?.session?.user;

    if (!user) {
      console.log('No user found');
      return;
    }

    // Proceed with the sign-out
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      console.error("Error during sign-out:", signOutError.message);
      throw signOutError;
    }

    // After sign-out, clear the token from the public_users table
    const { email } = user;

    const { error: updateError } = await supabase
      .from("public_users")
      .update({ access_token: null }) // Assuming 'access_token' is the column storing the token
      .eq("email", email); // Use email as the unique identifier

    if (updateError) {
      console.error("Error clearing token from database:", updateError.message);
      throw updateError;
    }

    // Update the local auth state and clear token from localStorage
    setAuthState({ authToken: null, currentUser: null });
    localStorage.removeItem("token");

    // Optionally redirect to the home page or another page after sign-out
    window.location.href = "/";

  } catch (err) {
    console.error("Error during sign-out:", err);
    throw err;
  }

  
};

//set estimated value
const setCartItemEstimationValue = async (userId:string, itemNumber: number, estimatedValue: number, qty :number) => {
  console.log('Setting estimated value:', estimatedValue);
  
  try {
    const { data, error } = await supabase
      .from('warehouse_requisition_cart')
      .update({ inventory_value: estimatedValue, inventory_cost : qty * estimatedValue })
      .eq('item_number', itemNumber)
      .eq('ordered_by_id', userId);

    if (error) {
      console.error('Error setting estimated value:', error);
      return;
    }

    console.log('Estimated value set:', data);
    setAuthState((prevState) => {
      if (!prevState.currentUser) {
        return prevState; // No current user, no need to update state
      }

      // Find the cart item to update
      const updatedCart = prevState!.currentUser!.cart!.map((item) => {
        if (item.item_number === itemNumber) {
          return { ...item, estimated_value: estimatedValue };
        }
        return item;
      });

      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          cart: updatedCart,
        },
      };
    });
    window.location.reload();
  } catch (err) {
    console.error('Unexpected error:', err);
  }
};


// Adding item to the cart
async function addItemToCart(payload: AddItemPayload): Promise<{ data: WarehouseRequisitionCart | null; error: PostgreError | null }> {
  // Get item inventory value and cost
  const { data: itemData, error: itemError } = await supabase
    .from('district_stock')
    .select('inventory_value')
    .eq('district', authState.currentUser?.lastActiveDistrict)
    .eq('reg_number', payload.regNumber)
    .single();

  if (itemError) {
    console.error('Error fetching item data:', itemError);

    // Return a PostgreError object
    return {
      data: null,
      error: {
        code: itemError.code ?? "UNKNOWN",
        message: itemError.message,
        details: itemError.details ?? "No additional details provided.",
      },
    };
  }

  payload.inventoryValue = itemData?.inventory_value;
  payload.inventoryCost = itemData?.inventory_value * payload.orderQty!;

  // Insert the item into the cart
  const { data, error } = await supabase
    .from('warehouse_requisition_cart')
    .insert([
      {
        cart_item_code: payload.cartItemId,
        district: payload.district,
        ordered_by_id: payload.userId,
        reg_number: payload.regNumber,
        item_number: payload.itemNumber,
        order_qty: payload.orderQty,
        inventory_value: payload.inventoryValue,
        inventory_cost: payload.inventoryCost,
      },
    ])
    .single(); // Return a single inserted record

  if (error) {
    console.error('Error adding item to cart:', error);

    // Return a PostgreError object
    return {
      data: null,
      error: {
        code: error.code ?? "UNKNOWN",
        message: error.message,
        details: error.details ?? "No additional details provided.",
      },
    };
  }

  console.log('Item added to cart:', data);

  // Update the user's cart in the auth state
  const updatedUserCart = await getUserCart(payload.userId);

  setAuthState((prevState) => {
    if (!prevState.currentUser) {
      return prevState; // No current user, no need to update state
    }

    return {
      ...prevState,
      currentUser: {
        ...prevState.currentUser,
        cart: updatedUserCart, // Use the updated cart directly
      },
    };
  });

  // Return success response
  return {
    data,
    error: null,
  };
}



async function deleteItemFromCart(cartId: number, userId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('warehouse_requisition_cart')
      .delete()
      .eq('id', cartId);

    if (error) {
      console.error('Error deleting item from cart:', error);
      return false;
    }

    console.log(`Item with id ${cartId} deleted successfully.`);

    // Fetch updated cart data
    const updatedUserCart = await getUserCart(userId);

    // Update the app state
    setAuthState((prevState) => {
      if (!prevState.currentUser) {
        return prevState; // No current user, no need to update state
      }

      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          cart: updatedUserCart, // Use the updated cart directly
        },
      };
    });

    return true;
  } catch (err) {
    console.error('Unexpected error:', err);
    return false;
  }
}

const modifyItemInCart = async (cartId: number, quantity: number, inv_value:number) => {
  try {
    const { data, error } = await supabase.from('warehouse_requisition_cart').update({ order_qty: quantity, inventory_cost : quantity * inv_value }).eq('id', cartId);

    if (error) {
      console.error('Error updating cart item:', error);
      return;
    }

    console.log('Cart item updated:', data);
    setAuthState((prevState) => {
      if (!prevState.currentUser) {
        return prevState; // No current user, no need to update state
      }

      // Find the cart item to update
      const updatedCart = prevState!.currentUser!.cart!.map((item) => {
        if (item.id === cartId) {
          return { ...item, order_qty: quantity };
        }
        return item;
      });

      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          cart: updatedCart,
        },
      };
    });
  
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

  


  // Provide context values
  return (
    <AuthContext.Provider
      value={{ user: authState.currentUser, signIn, signOut, loading, addItemToCart, deleteItemFromCart, modifyItemInCart, setCartItemEstimationValue }}
    >
      {loading ? <DNA /> : children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider  };
