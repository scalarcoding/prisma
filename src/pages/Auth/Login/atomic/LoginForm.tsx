import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { User } from "@/types/user";
import { useRef, useState } from "react";
import { supabase } from "@/api/repository/supabase";
import { debounce } from "lodash";

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const formSchema = z.object({
  userid: z.string().min(3, {
    message: "User ID must be at least 3 characters.",
  }),
  password: z.string().min(1, {
    message: "You must give a password",
  }).regex(passwordValidation, {
    message: 'Your password is not valid',
  }),
});

interface LoginFormProps {
  onSave: (values: User) => void; // Updated to accept form values
}

const LoginForm: React.FC<LoginFormProps> = ({ onSave }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userid: "",
      password: "",
      email: "",
    },
  });

  const [userValid, setUserValid] = useState<boolean | null>(null); // Use null for indeterminate state
  const [userId, setUserId] = useState<string | undefined>(undefined);

  // Handle submit
  async function onSubmit(values: User) {
    if (userValid === null || userValid === false) {
      console.log("User ID is not valid, cannot submit.");
      return;
    }

    // Pass the form values to the parent component.
    onSave(values); // Pass values to the parent
  }

  const debouncedSearch = useRef(
    debounce(async (searchTerm: string) => {
      if (!searchTerm) {
        setUserValid(null); // Reset state if input is empty
        return;
      }

      const { data, error } = await supabase
        .from('public_users')
        .select('*')
        .eq('user_id', searchTerm)
        .single();

      if (error) {
        console.error(error.message);
        setUserValid(false); // User not found
        return;
      }
      

      form.setValue("email", data.email);

      setUserValid(true); // User found
    }, 1000)
  );

  const handleChangeUserId = (val:string) => {
    setUserId(val);
    if (val === '') {
      setUserValid(null); // Reset state if input is empty
      debouncedSearch.current.cancel(); // Cancel previous debounce on clear
      return;
    }
    debouncedSearch.current(val); // Trigger search after debounce
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="userid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Id</FormLabel>
              <FormControl>
                <Input
                  placeholder="User Id"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    handleChangeUserId(value)
                    setUserId(value);  // update the local state
                    field.onChange(value);  // update react-hook-form state
                  }}
                  value={userId || field.value}
                  autoFocus
                />
              </FormControl>
              <FormDescription
                style={{
                  color: userValid === null
                    ? 'initial' // Keep the initial color
                    : userValid
                    ? 'green'  // If valid
                    : 'red',   // If invalid
                }}
              >
                {userValid === null
                  ? "Enter your User Id (Or Employee ID)"
                  : userValid
                  ? "User ID is valid!"
                  : "User ID not found, please try again."}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Specify a Password"
                  {...field}
                  disabled={!userValid} // Disable the input if user is not valid
                />
              </FormControl>
              <FormDescription>
                A password must be with a minimum of 8 characters, at least one
                uppercase letter, one lowercase letter, one number, and one
                special character.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!userValid}>Submit</Button> {/* Disable submit if user is not valid */}
      </form>
    </Form>
  );
};

export default LoginForm;
