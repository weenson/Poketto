"use client";

import { useState } from "react";
import { Eye, EyeClosed, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import Button from "@/components/button";

export default function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const passwordType = passwordVisible ? "text" : "password";
  const confirmType = confirmVisible ? "text" : "password";

  return (
    <main>
      <section className="mb-4">
        <div className="text-center">
          <h1 className="text-black text-3xl font-bold">
            Create Account <span>✨</span>
          </h1>
          <p className="text-muted-text">
            Sign up and start tracking your money today.
          </p>
        </div>
      </section>
      <section>
        <form className="flex flex-col gap-4 mb-3">
          <div className="flex flex-col gap-3">
            <div className="group relative">
              <User className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-text group-focus-within:text-primary" />
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                autoComplete="name"
                className="w-full border border-muted-text rounded-lg p-3 pl-12 font-medium text-sm outline-primary focus:border-primary focus:text-black"
              />
            </div>
            <div className="group relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-text group-focus-within:text-primary" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                autoComplete="email"
                className="w-full border border-muted-text rounded-lg p-3 pl-12 font-medium text-sm outline-primary focus:border-primary focus:text-black"
              />
            </div>
            <div className="group relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-text group-focus-within:text-primary" />
              <input
                type={passwordType}
                name="password"
                placeholder="Create a password"
                autoComplete="new-password"
                className="w-full border border-muted-text rounded-lg p-3 pl-12 pr-12 font-medium text-sm outline-primary focus:border-primary focus:text-black"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                aria-label={passwordVisible ? "Hide password" : "Show password"}
              >
                {passwordVisible ? (
                  <Eye className="text-muted-text" />
                ) : (
                  <EyeClosed className="text-muted-text" />
                )}
              </button>
            </div>
            <div className="group relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-text group-focus-within:text-primary" />
              <input
                type={confirmType}
                name="confirmPassword"
                placeholder="Confirm your password"
                autoComplete="new-password"
                className="w-full border border-muted-text rounded-lg p-3 pl-12 pr-12 font-medium text-sm outline-primary focus:border-primary focus:text-black"
              />
              <button
                type="button"
                onClick={() => setConfirmVisible(!confirmVisible)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                aria-label={confirmVisible ? "Hide password" : "Show password"}
              >
                {confirmVisible ? (
                  <Eye className="text-muted-text" />
                ) : (
                  <EyeClosed className="text-muted-text" />
                )}
              </button>
            </div>
          </div>
          <Button variant="black" size="sm" justify="center">
            Sign up
          </Button>
        </form>
        <div className="flex justify-center bg-muted p-2 rounded-lg w-full">
          <Link href="/login" className="text-sm">
            Already have an account? <span className="underline">Log in.</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
