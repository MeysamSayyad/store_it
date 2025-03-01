"use client";
import React, { useState } from "react";
type FormType = "sign-in" | "sign-up";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { createAccount, signInUser } from "@/lib/actions/user.actions";
import OTPModal from "./OTPModal";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});
const AuthFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email(),
    fullName:
      formType === "sign-up"
        ? z.string().min(2).max(50)
        : z.string().optional(),
  });
};
const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const formSchema = AuthFormSchema(type);
  const [accountId, setAccountId] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const user =
        type === "sign-up"
          ? await createAccount({
              fullName: values.fullName || "",
              email: values.email,
            })
          : await signInUser({ email: values.email });
      setAccountId(user.accountId);
    } catch (error) {
      setErrorMessage("Failed to create an Account ,Try Again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="h1 flex justify-center">
            {type == "sign-in"
              ? "Sign In"
              : type == "sign-up"
              ? "Sign Up"
              : type}
          </h1>
          {type == "sign-up" && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item">
                    <FormLabel className=" shad-form-label">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className=" shad-input"
                        placeholder="Enter your full name"
                        {...field}
                      />
                    </FormControl>
                  </div>

                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className=" shad-form-label">Email</FormLabel>
                  <FormControl>
                    <Input
                      className=" shad-input"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                </div>

                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />
          <Button
            disabled={isLoading}
            className="form-submit-button"
            type="submit"
          >
            {type == "sign-in"
              ? "Sign In"
              : type == "sign-up"
              ? "Sign Up"
              : type}{" "}
            {isLoading && (
              <Image
                src={"/assets/icons/loader.svg"}
                alt="loader"
                width={24}
                height={24}
                className="ml-2 animate-spin"
              />
            )}
          </Button>
          {errorMessage && <p className=" error-message">{errorMessage}</p>}
          <div className=" body-2 flex justify-center">
            <p className="text-light-100">
              {type == "sign-in"
                ? "Don`t have an account?"
                : "Already have an account?"}
            </p>
            <Link
              className="ml-1 font-medium text-brand"
              href={type == "sign-in" ? "/sign-up" : "/sign-in"}
            >
              {" "}
              {type == "sign-in"
                ? "Sign Up"
                : type == "sign-up"
                ? "Sign In"
                : type}
            </Link>
          </div>
        </form>
      </Form>
      {accountId && (
        <OTPModal accountId={accountId} email={form.getValues("email")} />
      )}
    </>
  );
};

export default AuthForm;
