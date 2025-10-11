import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/shared/lib/utils';
import { useLogin } from '@/features/auth/model/use-login';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/ui/kit/form';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/shared/ui/kit/field';
import { Button } from '@/shared/ui/kit/button';
import { Input } from '@/shared/ui/kit/input';
import { Spinner } from '@/shared/ui/kit/spinner';
import { Link } from 'react-router-dom';

const loginSchema = z.object({
  email: z.email({ message: 'Почта должна быть корректной' }),
  password: z.string().min(1, { message: 'Пароль обязателен' }),
});

export function LoginForm({ className, ...props }: React.ComponentProps<'form'>) {
  const { login, isPending } = useLogin();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
      <Form {...form}>
        <form
            onSubmit={form.handleSubmit(login)}
            className={cn('flex flex-col gap-6', className)}
            {...props}
        >
          <FieldGroup>
            {/* Email Field */}
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                      <Field>
                        <FieldLabel htmlFor="email">Почта или никнейм</FieldLabel>
                        <FormControl>
                          <Input
                              id="email"
                              type="email"
                              placeholder="m@example.com"
                              required
                              {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </Field>
                    </FormItem>
                )}
            />

            {/* Password Field */}
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                      <Field>
                        <FieldLabel htmlFor="password">Пароль</FieldLabel>
                        <FormControl>
                          <Input
                              id="password"
                              type="password"
                              placeholder="********"
                              required
                              {...field}
                          />
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
                {isPending ? 'Входим...' : 'Войти'}
              </Button>
              <FieldDescription className="text-center">
                Нет аккаунта?{' '}
                <Link
                    to="/auth/register"
                    className="text-primary underline-offset-4 hover:underline"
                >
                  Зарегистрироваться
                </Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </Form>
  );
}
