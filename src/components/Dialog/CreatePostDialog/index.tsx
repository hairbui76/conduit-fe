'use client';

import { useTransition } from 'react';

import { Button } from '@/components/Button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/Form';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/TextArea';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/Dialog';
import { PostSchema } from '@/forms/create-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createPost } from '@/actions/post';
import toast from 'react-hot-toast';
import Spinner from '@/components/Spinner';

export default function CreatePostDialog() {
  const [pending, startTransition] = useTransition();

  const createPostForm = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: '',
      description: '',
      body: '',
      tagList: ''
    }
  });

  function onCreatePost(createPostFormData: z.infer<typeof PostSchema>) {
    startTransition(async () => {
      const response = await createPost(createPostFormData);
      if (response?.error) {
        toast.error(response.error, { position: 'top-center' });
      } else {
        toast.success('Post was created successfully', { position: 'top-center' });
      }
    });
  }

  return (
    <Dialog>
      <DialogTrigger className="flex-grow">
        <Input
          placeholder="Start create your new post"
          className="rounded-full hover:cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent className="gap-6">
        <DialogHeader>
          <DialogTitle className="text-xl">Create new post</DialogTitle>
          <DialogDescription className="!mt-0">
            Let people know what you are thinking
          </DialogDescription>
        </DialogHeader>
        <Form {...createPostForm}>
          <form
            onSubmit={createPostForm.handleSubmit(onCreatePost)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={createPostForm.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} maxLength={100} disabled={pending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={createPostForm.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} maxLength={100} disabled={pending} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={createPostForm.control}
              name="tagList"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input {...field} maxLength={100} disabled={pending} />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Each tag separated by a comma
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={createPostForm.control}
              name="body"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="resize-none"
                      maxLength={1000}
                      disabled={pending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex-row justify-end gap-3 sm:gap-0">
              <DialogClose>
                <Button variant="outline" disabled={pending} type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="w-fit" disabled={pending}>
                {pending && <Spinner className="mr-2 h-4 w-4" />}
                Post
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
