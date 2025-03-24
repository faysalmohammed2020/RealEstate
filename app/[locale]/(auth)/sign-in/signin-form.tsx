"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "@/validators/authValidators";
import { useForm } from "react-hook-form";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormFieldset,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "@/lib/auth-client";
import { FormError } from "@/components/FormError";
import { useState } from "react";
import { toast } from "sonner";
import { Link, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl"

const LoginPage = () => {
  const [formError, setFormError] = useState("");
  const router = useRouter();
  const session = useSession();
  const t = useTranslations();

  const form = useForm<yup.InferType<typeof signInSchema>>({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: yup.InferType<typeof signInSchema>) => {
    await signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onRequest: () => {
          setFormError("");
        },
        onSuccess: () => {
          toast.success("Login Successful");
          router.push("/");
        },
        onError: (ctx) => {
          setFormError(ctx.error.message);
        },
      }
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="items-center">
          <img src="/Boed Logo.png" width={100} height={100}/>
          <CardTitle className="text-2xl">{t("auth.login")}</CardTitle>
          <CardDescription>{t("auth.enterEmail&Password")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormFieldset>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("auth.Email")}</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t("auth.enterEmail")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("auth.Password")}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder={t("auth.enterPassword")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormFieldset>
              <FormError message={formError} />
              <Button type="submit" className="mt-4 w-full bg-green-600 hover:bg-green-500">
              {t("auth.loginButton")}
              </Button>
            </form>
          </Form>
          <div className="mt-5 text-center text-sm">
            <Link
              href="/auth/forgot-password"
              className="text-green-500 hover:underline"
            >
               {t("auth.forgotPassword")}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
