'use client';

import { useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/common/Form';
import { UpdateProfileSchema } from '@/forms/update-user-form';
import { Profile } from '@/types/Profile';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { updateProfile } from '@/actions/user';
import toast from 'react-hot-toast';
import Spinner from '@/components/common/Spinner';
import NeedAuthCard from '@/components/Card/NeedAuthCard';

export default function ProfileSettingsSection({ currentUser }: { currentUser: Profile | null }) {
  const [pending, startTransition] = useTransition();
  const updateProfileForm = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      username: currentUser?.username,
      image: currentUser?.image,
      bio: currentUser?.bio
    },
    mode: 'onChange'
  });

  if (!currentUser) return <NeedAuthCard message="You need login to update your profile" />;

  function onSubmit(updateProfileFormData: z.infer<typeof UpdateProfileSchema>) {
    startTransition(async () => {
      try {
        await updateProfile(updateProfileFormData);
        toast.success(() => <p className="w-max">Your profile has been updated successfully</p>, {
          position: 'top-center'
        });
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Something went wrong. Try again later.', {
          position: 'top-center'
        });
      }
    });
  }

  return (
    <Form {...updateProfileForm}>
      <form onSubmit={updateProfileForm.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={updateProfileForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} disabled={pending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={updateProfileForm.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Input
                  placeholder="Tell us a little bit about yourself"
                  maxLength={100}
                  {...field}
                  disabled={pending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={updateProfileForm.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input {...field} disabled={pending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={pending}>
          {pending && <Spinner className="w-4 h-4 mr-2" />}
          Update profile
        </Button>
      </form>
    </Form>
  );
}
