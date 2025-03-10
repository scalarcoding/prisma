
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



// const registerUser: React.FC<NewUser> = ({ name, email, password }) => {
//   const newUser = { name, email, password };

//   console.log(newUser);
//   return null;
// };

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const formSchema = z.object({
  userid: z.string().min(3, {
    message: "User ID must be at least 3 characters.",
  }),
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().min(1, {
    message: "You must give an email address.",
  }).email("This is not a valid email."),
  password: z.string().min(1, {
    message: "You must give a password",
  }).regex(passwordValidation, {
    message: 'Your password is not valid',
  }),
});


interface SignUpFormProps {
  onSave: (values: User) => void; // Updated to accept form values
}

const SignupForm: React.FC<SignUpFormProps> = ({ onSave }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userid: "",
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: User) {
    // Pass the form values to the parent component.
    onSave(values); // Pass values to the parent
  }

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
                <Input placeholder="User Id" {...field} />
              </FormControl>
              <FormDescription>Enter your User Id (Or Employee ID)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input placeholder="Specify a Name" {...field} />
              </FormControl>
              <FormDescription>Give Your Full Name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Specify an Email" {...field} />
              </FormControl>
              <FormDescription>Give a Valid Email Address</FormDescription>
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default SignupForm;