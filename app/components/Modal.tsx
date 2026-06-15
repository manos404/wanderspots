"use client";
import { Lock, Mail, X, User } from "lucide-react";
import { useActionState } from "react";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation";

export default function Modal() {
  let check = false;
  function SigninAction(prevFormState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    let errors = [];
    if (!isEmail(email)) {
      errors.push("Invalid email address.");
    }
    if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
      errors.push("You must provide a password with at least six characters.");
    }
    console.log(errors);
    if (errors.length > 0) {
      return { errors };
    }
    return { errors: null };
  }

  const [formState, formAction] = useActionState(SigninAction, {
    errors: null,
  });

  return (
    <dialog open className="m-auto w-100    rounded-4xl text-white">
      <div className="p-3 pl-7 pb-7 bg-gradient-to-br from-blue-600 rounded-t-lg to-purple-600">
        <X className="ml-auto" />
        <h1 className="text-2xl font-bold  ">
          {check ? "Create Account" : "Welcome Back!"}
        </h1>
        <p className="text-sm pt-2">
          {check ? "Join our community" : "Sign in to continue"}
        </p>
      </div>
      <form action={formAction}>
        <div className=" flex flex-col p-7   text-gray-400">
          {check && (
            <>
              <label htmlFor="email">Name</label>
              <div className="relative mt-2">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                <input
                  type="name"
                  name="name"
                  placeholder="Your name"
                  className="w-full h-10 rounded-xl border border-gray-300 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </>
          )}
          <label htmlFor="email" className="mt-2">
            Email
          </label>
          <div className="relative mt-2">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

            <input
              type="email"
              name="email"
              placeholder="email@example.com"
              className="w-full h-10 rounded-xl border border-gray-300 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <label htmlFor="password" className="mt-2">
            Password
          </label>

          <div className="relative mt-2">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

            <input
              id="password"
              type="password"
              name="password"
              placeholder="••••••"
              className="w-full border border-gray-300 rounded-xl h-12 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {formState.errors && (
            <ul className="text-red-600 text-sm pt-1  pl-3 list-disc">
              {formState.errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex justify-center   mx-5 h-12">
          <button className=" bg-gradient-to-br from-blue-600 rounded-2xl to-purple-600  w-[80%] hover:from-blue-700 hover:to-purple-700 transition-all">
            {check ? "Sign up" : "Sign in"}
          </button>
        </div>
        <div className=" mt-2 flex flex-row gap-2 justify-center items-baseline">
          <p className="text-gray-600 text-sm  ">
            {check ? "Already have an acount?" : "Don't have an account?"}
          </p>

          <p className="text-blue-600 text-center">
            {check ? "sign in" : "sign up"}
          </p>
        </div>
      </form>
    </dialog>
  );
}
