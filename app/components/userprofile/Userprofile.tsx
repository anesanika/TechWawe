"use client";
import { LuLogIn } from "react-icons/lu";
import { signOut } from "next-auth/react";
import Image from "next/image";

export const Userprofile = ({
  user,
}: {
  user: { email: string; id: number; name: string; image?: string } | any;
}) => {
  return (
    <div className="content p-6 bg-gray-50 rounded-lg shadow-lg max-w-md mx-auto mt-10">
      {user && (
        <>
          <h1 className="text-center text-4xl font-semibold italic text-amber-600 font-[roboto]">
            Settings
          </h1>
          <div className="mt-6">
            <h2 className="italic font-sans text-xl text-gray-700">
              User Info:
            </h2>
            <div className="w-24 h-24 relative mt-5 mx-auto rounded-full border-4 border-amber-300 overflow-hidden">
              <Image
                src={
                  user.image ||
                  "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1742889364~exp=1742892964~hmac=ebf6999628f693dc0e442c27df64b3bb8bce9a62a201d79bf5e136038e071321&w=740"
                }
                fill
                alt={user.name + " profile image"}
                className="object-cover"
              />
            </div>
            <div className="my-6">
              <div className="flex gap-1 text-gray-700">
                <span className="font-semibold">Username:</span>
                <h1 className="first-letter:uppercase">{user.name}</h1>
              </div>
              <h1 className="text-gray-600 mt-2">
                Email Address: {user.email || "You don't have an email address"}
              </h1>
            </div>
          </div>
        </>
      )}
      <button
        className="bg-red-400 cursor-pointer p-3 rounded-lg text-white hover:bg-red-500 transition-all duration-300 transform hover:scale-95 mt-6 mx-auto block"
        title="Sign Out"
        onClick={() => signOut()}
      >
        <LuLogIn size={24} />
      </button>
    </div>
  );
};
