'use client';

import { useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import { UpdatePassWordSchema } from '@/forms/update-user-form';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import toast from 'react-hot-toast';
import Spinner from '@/components/Spinner';
import { updatePassword } from '@/actions/user';
import { Profile } from '@/types/Profile';
import NeedAuthCard from '@/components/Card/NeedAuthCard';

export default function AccountSettingsSection({ currentUser }: { currentUser: Profile | null }) {
  const [pending, startTransition] = useTransition();
  const updatePasswordForm = useForm<z.infer<typeof UpdatePassWordSchema>>({
    resolver: zodResolver(UpdatePassWordSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  });

  if (!currentUser) return <NeedAuthCard message="You need login to update your account" />;

  function onSubmit(updatePasswordFormData: z.infer<typeof UpdatePassWordSchema>) {
    startTransition(async () => {
      const response = await updatePassword(updatePasswordFormData.password);
      if (response?.error) {
        toast.error(response.error, {
          position: 'top-center'
        });
      } else {
        toast.success(() => <p className="w-max">Your password was changed</p>, {
          position: 'top-center'
        });
      }
    });
  }

  return (
    <Form {...updatePasswordForm}>
      <form onSubmit={updatePasswordForm.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={updatePasswordForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input {...field} type="password" disabled={pending} maxLength={50} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={updatePasswordForm.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm new password</FormLabel>
              <FormControl>
                <Input type="password" {...field} disabled={pending} maxLength={50} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={pending}>
          {pending && <Spinner className="w-4 h-4 mr-2" />}
          Change password
        </Button>
      </form>
    </Form>
  );
}
