import { hasMinLength, isEmail, isNotEmpty } from "@/app/util/validation";
import { Lock, Mail, User, X } from "lucide-react";
import { useActionState } from "react";
import { useModalStore } from "@/app/store/useModalStore";
import { signIn } from "next-auth/react";
export default function AuthForm() {
  const { activeModal, openModal, closeModal } = useModalStore();
  // let activeModal === 'signup' = false;

  async function SigninAction(prevFormState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const errors = []; //
    if (!isEmail(email)) {
      errors.push("Invalid email address.");
    }
    if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
      errors.push("You must provide a password with at least six characters.");
    }

    if (errors.length > 0) {
      return { errors };
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      return { errors: ["Invalid eamil or password"] };
    }
    closeModal();
    return { errors: null };
  }

  async function SignupAction(prevFormState, formData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const errors = [];
    if (!isEmail(email)) {
      errors.push("Invalid email address.");
    }
    if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
      errors.push("You must provide a password with at least six characters.");
    }

    if (errors.length > 0) {
      return { errors };
    }

    // εδώ θα κάνουμε το fetch
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { errors: [data.error] };
    }
    return { errors: null };
  }

  const [signinState, signinAction] = useActionState(SigninAction, {
    errors: null,
  });

  const [signupState, signupAction] = useActionState(SignupAction, {
    errors: null,
  });
  const formAction = activeModal === "signup" ? signupAction : signinAction;
  const formState = activeModal === "signup" ? signupState : signinState;
  // const { closeModal } = useModalStore();

  return (
    <>
      <div className="p-3 pl-7 pb-7 bg-gradient-to-br from-blue-600 rounded-t-lg to-purple-600">
        {/* <X className="ml-auto" onClick={closeModal} /> */}
        <h1 className="text-2xl font-bold  ">
          {activeModal === "signup" ? "Create Account" : "Welcome Back!"}
        </h1>
        <p className="text-sm pt-2">
          {activeModal === "signup"
            ? "Join our community"
            : "Sign in to continue"}
        </p>
      </div>
      <form action={formAction}>
        <div className=" flex flex-col p-7   text-gray-400">
          {activeModal === "signup" && (
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
            {activeModal === "signup" ? "Sign up" : "Sign in"}
          </button>
        </div>
        <div className=" mt-2 flex flex-row gap-2 justify-center items-baseline">
          <p className="text-gray-600 text-sm  ">
            {activeModal === "signup"
              ? "Already have an acount?"
              : "Don't have an account?"}
          </p>

          <p
            className="text-blue-600 text-center"
            onClick={() =>
              openModal(activeModal === "signup" ? "login" : "signup")
            }
          >
            {activeModal === "signup" ? "sign in" : "sign up"}
          </p>
        </div>
      </form>
    </>
  );
}
