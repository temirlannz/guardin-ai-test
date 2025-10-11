import z from "zod";
import { useRegister } from "../../model/use-register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { cn } from "@/shared/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/ui/kit/form";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/shared/ui/kit/field";
import { Input } from "@/shared/ui/kit/input";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/shared/ui/kit/button";
import { Spinner } from "@/shared/ui/kit/spinner";
import { Link } from "react-router-dom";

const registerSchema = z.object({
  first_name: z.string().min(2, { message: "Имя должно содержать минимум 2 символа" }),
  last_name: z.string().min(2, { message: "Фамилия должна содержать минимум 2 символа" }),
  email: z.email({ message: "Введите корректный email" }),
  password: z
      .string()
      .min(8, { message: "Минимум 8 символов" })
      .regex(/[0-9]/, { message: "Добавьте хотя бы 1 цифру" })
      .regex(/[a-z]/, { message: "Добавьте хотя бы 1 строчную букву" })
      .regex(/[A-Z]/, { message: "Добавьте хотя бы 1 заглавную букву" })
      .regex(/[!@#$%^&*(),.?-]/, { message: "Добавьте хотя бы 1 спецсимвол" }),
});

export function RegisterForm({ className, ...props }: React.ComponentProps<"form">) {
  const { register, isPending } = useRegister();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
  });

  const [visible, setVisible] = useState(false);

  return (
      <Form {...form}>
        <form
            onSubmit={form.handleSubmit(register)}
            className={cn("flex flex-col gap-6", className)}
            {...props}
        >
          <FieldGroup>
            {/* Имя и фамилия */}
            <div className="flex items-center gap-x-2">
              <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                      <FormItem className="flex-1">
                        <Field>
                          <FieldLabel>Имя</FieldLabel>
                          <FormControl>
                            <Input placeholder="Паленше" {...field} />
                          </FormControl>
                          <FormMessage />
                        </Field>
                      </FormItem>
                  )}
              />

              <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                      <FormItem className="flex-1">
                        <Field>
                          <FieldLabel>Фамилия</FieldLabel>
                          <FormControl>
                            <Input placeholder="Паленшеев" {...field} />
                          </FormControl>
                          <FormMessage />
                        </Field>
                      </FormItem>
                  )}
              />
            </div>

            {/* Email */}
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                      <Field>
                        <FieldLabel>Электронная почта</FieldLabel>
                        <FormControl>
                          <Input type="email" placeholder="example@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </Field>
                    </FormItem>
                )}
            />

            {/* Password */}
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                      <Field>
                        <FieldLabel>Пароль</FieldLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                                type={visible ? "text" : "password"}
                                placeholder="Введите пароль"
                                autoComplete="new-password"
                                {...field}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                onClick={() => setVisible((v) => !v)}
                            >
                              {visible ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </Field>
                    </FormItem>
                )}
            />

            {/* Submit */}
            <Field>
              <Button type="submit" disabled={isPending}>
                {isPending && <Spinner />}
                {isPending ? "Регистрируемся..." : "Зарегистрироваться"}
              </Button>

              <FieldDescription className="text-center">
                Уже есть аккаунт?{" "}
                <Link
                    to="/auth/login"
                    className="text-primary underline-offset-4 hover:underline"
                >
                  Войти
                </Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </Form>
  );
}
