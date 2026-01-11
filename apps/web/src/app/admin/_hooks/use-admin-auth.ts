"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminLoginSchema, AdminLoginForm } from "../admin.schema";

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");

  const form = useForm<AdminLoginForm>({
    resolver: zodResolver(adminLoginSchema),
  });

  const onSubmit = (data: AdminLoginForm) => {
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (data.password !== adminPassword) {
      setLoginError("Credencial inválida. Tente novamente.");
      return;
    }

    setIsAuthenticated(true);
    setLoginError("");
  };

  return {
    isAuthenticated,
    loginError,
    form,
    handleSubmit: form.handleSubmit(onSubmit),
  };
}
