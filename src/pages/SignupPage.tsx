import { useState } from "react";

import type {
  ChangeEvent,
  FormEvent,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  signup,
} from "../services/auth.service";

import {
  useAuth,
} from "../hooks/useAuth";

import AuthLayout from "../components/AuthLayout";

function SignupPage() {
  const navigate =
    useNavigate();

  const {
    login: saveAuth,
  } = useAuth();

  const [formData,
    setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const [loading,
    setLoading] =
    useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (
      e: FormEvent
    ) => {
      e.preventDefault();

      try {
        setLoading(true);

        const data =
          await signup(
            formData
          );

        saveAuth(
          data.token,
          data.user
        );

        navigate("/");
      } catch (error) {
        console.error(error);

        alert(
          "Signup failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start your AI-powered learning experience"
    >
      <form
        onSubmit={
          handleSubmit
        }
        className="
          flex
          flex-col
          gap-4
        "
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={
            formData.name
          }
          onChange={
            handleChange
          }
          className="
            border
            rounded-lg
            px-4
            py-3
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={
            formData.email
          }
          onChange={
            handleChange
          }
          className="
            border
            rounded-lg
            px-4
            py-3
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={
            formData.password
          }
          onChange={
            handleChange
          }
          className="
            border
            rounded-lg
            px-4
            py-3
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

        <button
          type="submit"
          className="
            bg-blue-600
            text-white
            py-3
            rounded-lg
            hover:bg-blue-700
            transition
            font-semibold
          "
        >
          {loading
            ? "Loading..."
            : "Signup"}
        </button>
      </form>

      <p
        className="
          text-center
          text-gray-600
          mt-6
        "
      >
        Already have an
        account?{" "}

        <Link
          to="/login"
          className="
            text-blue-600
            font-semibold
          "
        >
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}

export default SignupPage;