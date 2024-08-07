import { createUser } from '@/actions/user';
import { Button } from '@/components/common/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/common/Card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/common/Form';
import { Input } from '@/components/common/Input';
import Spinner from '@/components/common/Spinner';
import { SignupSchema } from '@/forms/signup-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

export function SignupCard({
  setState
}: {
  setState: React.Dispatch<React.SetStateAction<'login' | 'signup'>>;
}) {
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
        toast.success('Account has been successfully created.');
        setState('login');
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : 'Something went wrong. Try again later'
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
            <Button className="w-full" disabled={isPending}>
              {isPending && <Spinner className="mr-2 h-4 w-4" />}
              Create account
            </Button>
            <Button
              className="w-full"
              variant="outline"
              disabled={isPending}
              onClick={() => setState('login')}
            >
              <IconArrowNarrowLeft className="w-4 h-4 mr-2" />
              Back to login
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
