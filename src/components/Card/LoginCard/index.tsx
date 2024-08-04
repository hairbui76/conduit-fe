import { useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { loginSchema } from '@/forms/login-form';
import { login } from '@/actions/auth';
import { Button } from '@/components/common/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/common/Card';
import { Input } from '@/components/common/Input';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/common/Form';
import toast from 'react-hot-toast';
import Spinner from '@/components/common/Spinner';

export function LoginCard({
  setState
}: {
  setState: React.Dispatch<React.SetStateAction<'login' | 'signup'>>;
}) {
  const [isPending, startTransition] = useTransition();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  function onLogin(loginFormData: z.infer<typeof loginSchema>) {
    startTransition(async () => {
      try {
        await login(loginFormData);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : 'Something went wrong. Try again later'
        );
      }
    });
  }

  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(onLogin)}>
        <Card className="h-fit">
          <CardHeader className="pb-8">
            <CardTitle className="text-2xl">Welcome to Conduit!</CardTitle>
            <CardDescription className="!mt-0">
              Enter your credentials below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} disabled={isPending} maxLength={50} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} disabled={isPending} maxLength={50} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending && <Spinner className="mr-2 h-4 w-4" />}
              Login
            </Button>
            <p className="text-sm gap-1 flex items-center">
              Dont&apos;t have an account?{' '}
              <Button
                type="button"
                variant="link"
                className="text-primary font-bold flex p-0"
                disabled={isPending}
                onClick={() => {
                  setState('signup');
                }}
              >
                Sign up <IconArrowNarrowRight className="w-5 h-5" />
              </Button>
            </p>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
