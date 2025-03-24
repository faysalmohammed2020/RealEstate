"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "@/validators/authValidators";
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
import { signUp } from "@/lib/auth-client";
import { FormError } from "@/components/FormError";
import { useState } from "react";
import { toast } from "sonner";
import { Link, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const SignupForm = () => {
  const [formError, setFormError] = useState("");
  const router = useRouter();
  const t = useTranslations();

  const form = useForm<yup.InferType<typeof signUpSchema>>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: yup.InferType<typeof signUpSchema>) => {
    await signUp.email(
      {
        name: values.name,
        password: values.password,
        email: values.email,
      },
      {
        onRequest: () => {
          setFormError("");
          toast.loading("Creating account...");
        },
        onSuccess: () => {
          toast.success("Account Creation Successful");
          router.push("/");
        },
        onError: (ctx) => {
          setFormError(ctx.error.message);
          toast.error(ctx.error.message);
        },
      }
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="items-center">
          <img src="/Boed Logo.png" width={100} height={100} />
          <CardTitle className="text-2xl">{t("app.auth.signUp")}</CardTitle>
          <CardDescription>{t("auth.register")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormFieldset>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("app.auth.Name")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("app.auth.Name")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                {t("auth.signUpButton")}
              </Button>
            </form>
          </Form>
          <div className="mt-5 space-x-1 text-center text-sm">
            <Link
              href="/auth/login"
              className="text-sm text-muted-foreground hover:underline"
            >
              {t("auth.alreadyHaveAccount")}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupForm;
