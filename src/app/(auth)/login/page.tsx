"use client";
import { useState } from "react";
import { Lock, Mail, Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import Button from "@/components/button";

export default function LogIn() {
  const [visible, setVisible] = useState(false);

  const passwordType = visible === false ? "password" : "text";
  return (
    <main>
      <section className="mb-4">
        <div className="text-center">
          <h1 className="text-black text-3xl font-bold">
            Welcome Back <span>👋</span>
          </h1>
          <p className="text-muted-text">
            Enter your credentials and start saving smart.
          </p>
        </div>
      </section>
      <section>
        <form className="flex flex-col gap-4 mb-3">
          <div className="flex flex-col gap-3">
            <div className="group relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-text group-focus-within:text-primary" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-muted-text rounded-lg p-3 pl-12 font-medium text-sm outline-primary focus:border-primary focus:text-black"
              />
            </div>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-text  group-focus-within:text-primary" />
              <input
                type={passwordType}
                placeholder="Enter your password"
                className="w-full border border-muted-text rounded-lg p-3 pl-12 font-medium text-sm outline-primary focus:border-primary focus:text-black"
              />
              <button type="button" onClick={() => setVisible(!visible)}>
                {visible === false ? (
                  <EyeClosed className="absolute right-3 top-2.5 text-muted-text" />
                ) : (
                  <Eye className="absolute right-3 top-2.5 text-muted-text" />
                )}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/" className="text-sm underline">
              Forgot your password?
            </Link>

            <Button variant="black" size="sm" justify="center">
              Log in
            </Button>
          </div>
        </form>
        <div className="flex justify-center bg-muted p-2 rounded-lg w-full">
          <Link href="/signup" className="text-sm">
            Don't have an account?{" "}
            <span className="underline">Sign Up free.</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
