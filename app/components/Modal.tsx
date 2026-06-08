import { Lock, Mail, X } from "lucide-react";

export default function Modal() {
  return (
    <dialog open className="m-auto w-100 h-100  rounded-4xl text-white">
       
      <div className="p-3 pl-7 pb-7 bg-gradient-to-br from-blue-600 rounded-t-lg to-purple-600">
        <X className="ml-auto"/>
        <h1 className="text-2xl font-bold  ">Welcome Back!</h1>
        <p className="text-sm pt-2">Sign in to continue</p>
      </div>
      <form>
        <div className=" flex flex-col p-7   text-gray-400">
          <label htmlFor="email">Email</label>
          <div className="relative mt-2">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

            <input
              type="email"
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
        </div>
        <div className="flex justify-center   mx-5 h-12">
        <button className=" bg-gradient-to-br from-blue-600   rounded-2xl to-purple-600  w-[80%] hover:from-blue-700 hover:to-purple-700 transition-all">Sign in</button>

        </div>
      </form>
    </dialog>
  );
}
