import { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import type {
  ChangeEvent,
  FormEvent,
} from "react";

import {
  login,
} from "../services/auth.service";

import {
  useAuth,
} from "../hooks/useAuth";

import AuthLayout from "../components/AuthLayout";

function LoginPage() {
  const navigate =
    useNavigate();

  const {
    login: saveAuth,
  } = useAuth();

  const [formData,
    setFormData] =
    useState({
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
          await login(
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
          "Login failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to continue your study journey"
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
            : "Login"}
        </button>
      </form>

      <p
        className="
          text-center
          text-gray-600
          mt-6
        "
      >
        Don’t have an
        account?{" "}

        <Link
          to="/signup"
          className="
            text-blue-600
            font-semibold
          "
        >
          Signup
        </Link>
      </p>
    </AuthLayout>
  );
}

export default LoginPage;