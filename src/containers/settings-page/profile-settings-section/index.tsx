'use client';

import { useState, useTransition } from 'react';

import { getToken } from '@/actions/user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/Avatar';
import { Button } from '@/components/Button';
import NeedAuthCard from '@/components/Card/NeedAuthCard';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import { Input } from '@/components/Input';
import Spinner from '@/components/Spinner';
import { UpdateProfileSchema } from '@/forms/update-user-form';
import { Profile } from '@/types/Profile';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Tabs from '@radix-ui/react-tabs';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import './style.css';

export default function ProfileSettingsSection({ currentUser }: { currentUser: Profile | null }) {
  const [pending, startTransition] = useTransition();
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState('');

  const updateProfileForm = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      username: currentUser?.username || '',
      image: currentUser?.image || '',
      bio: currentUser?.bio || ''
    },
    mode: 'onChange'
  });

  if (!currentUser) return <NeedAuthCard message="You need login to update your profile" />;

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setPreview('');
  };

  function onSubmit(updateProfileFormData: z.infer<typeof UpdateProfileSchema>) {
    startTransition(async () => {
      const formData = new FormData();
      for (const key in updateProfileFormData) {
        formData.append(key, updateProfileFormData[key]);
      }
      if (selectedImage) {
        formData.delete('image');
        formData.append('avatar', selectedImage);
      }
      const token = await getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });
      if (response?.error) {
        toast.error(response.error, {
          position: 'top-center'
        });
      } else {
        toast.success(() => <p className="w-max">Your profile was updated successfully</p>, {
          position: 'top-center'
        });
      }
    });
  }

  return (
    <Form {...updateProfileForm}>
      <form onSubmit={updateProfileForm.handleSubmit(onSubmit)} className="space-y-8">
        <Avatar className="w-28 h-28">
          <AvatarImage
            src={updateProfileForm.getValues('image')}
            alt={`${currentUser.username} avatar`}
          />
          <AvatarFallback className="text-2xl">
            {currentUser.username[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <Tabs.Root className="TabsRoot" defaultValue="tab1">
          <Tabs.List className="TabsList" aria-label="Manage your account">
            <Tabs.Trigger className="TabsTrigger" value="tab1">
              Url
            </Tabs.Trigger>
            <Tabs.Trigger className="TabsTrigger" value="tab2">
              Upload
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content className="TabsContent" value="tab1">
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
          </Tabs.Content>
          <Tabs.Content className="TabsContent" value="tab2">
            <FormField
              control={updateProfileForm.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <div className="mb-4 w-full">
                      <label
                        htmlFor="imageInput"
                        className={`block w-full aspect-video cursor-pointer border-2 border-dashed rounded-lg p-4
            hover:bg-gray-50 transition-colors ${preview ? '' : 'flex items-center justify-center'}`}
                      >
                        {preview ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={preview}
                              alt="Preview"
                              width={0}
                              height={0}
                              className="w-full h-full object-contain rounded-lg"
                            />
                            <button
                              onClick={e => {
                                e.preventDefault();
                                removeImage();
                              }}
                              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <div className="text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            <p className="mt-1 text-sm text-gray-600">
                              Click to upload an image or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </div>
                        )}
                        <input
                          id="imageInput"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          {...field}
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Tabs.Content>
        </Tabs.Root>
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
        <Button type="submit" disabled={pending}>
          {pending && <Spinner className="w-4 h-4 mr-2" />}
          Update profile
        </Button>
      </form>
    </Form>
  );
}
