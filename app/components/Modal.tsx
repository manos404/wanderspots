export default function Modal() {
  return (
    <dialog open className="m-auto w-100 h-100  rounded-t-lg    ">
      <div className="p-7 bg-gradient-to-br from-blue-600 rounded-t-lg to-purple-600 text-white">
        <h1 className="text-2xl font-bold  ">Welcome Back!</h1>
        <p className="text-sm pt-2">Sign in to continue</p>
      </div>
    </dialog>
  );
}
