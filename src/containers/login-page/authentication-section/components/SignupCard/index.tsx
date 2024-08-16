'use client';

import { useTransition } from 'react';
import Link from 'next/link';

import { createUser } from '@/actions/user';
import { Button } from '@/components/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/Card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import { Input } from '@/components/Input';
import Spinner from '@/components/Spinner';
import { SignupSchema } from '@/forms/signup-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

export function SignupCard() {
  const [isPending, startTransition] = useTransition();

  const signupForm = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  });

  function onSignup(signupFormData: z.infer<typeof SignupSchema>) {
    startTransition(async () => {
      try {
        await createUser(signupFormData);
        toast.success('Account was successfully created.', {
          style: {
            marginRight: '16px'
          }
        });
        signupForm.setValue('username', '');
        signupForm.setValue('email', '');
        signupForm.setValue('password', '');
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : 'Something went wrong. Try again later.',
          {
            style: {
              marginRight: '16px'
            }
          }
        );
      }
    });
  }

  return (
    <Form {...signupForm}>
      <form onSubmit={signupForm.handleSubmit(onSignup)}>
        <Card className="h-fit">
          <CardHeader className="pb-8">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription className="!mt-0">
              Enter your information below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <FormField
              control={signupForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} disabled={isPending} maxLength={50} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signupForm.control}
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
              control={signupForm.control}
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
            <Button className="w-full" disabled={isPending} type="submit">
              {isPending && <Spinner className="mr-2 h-4 w-4" />}
              Create account
            </Button>
            <Button className="w-full" variant="outline" disabled={isPending} type="button">
              <Link href="/login" className="flex items-center">
                <IconArrowNarrowLeft className="w-4 h-4 mr-2" />
                Back to login
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
