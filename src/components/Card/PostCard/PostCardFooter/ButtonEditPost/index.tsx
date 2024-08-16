'use client';

import { useState, useTransition } from 'react';

import { Button } from '@/components/Button';
import { Post } from '@/types/Post';
import { IconEdit } from '@tabler/icons-react';
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
import toast from 'react-hot-toast';
import Spinner from '@/components/Spinner';
import { updatePost } from '@/actions/post';

export default function ButtonEditPost({ post }: { post: Post }) {
  const { title, description, body, tagList, slug } = post;
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const updatePostForm = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title,
      description: description || '',
      body,
      tagList: tagList.join(', ')
    },
    mode: 'onChange'
  });

  function onUpdatePost(updatePostFormData: z.infer<typeof PostSchema>) {
    startTransition(async () => {
      const response = await updatePost({ updatePostFormData, slug });
      if (response?.error) {
        toast.error(response.error, {
          style: { marginRight: '16px' },
          position: 'top-right'
        });
      } else {
        toast.success('Post was updated successfully', {
          style: { marginRight: '16px' },
          position: 'top-right'
        });
      }
      setOpen(false);
    });
  }

  return (
    <Dialog open={open}>
      <DialogTrigger className="flex-grow">
        <Button className="py-0 w-full" variant="ghost" onClick={() => setOpen(true)}>
          <IconEdit className="mr-2" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-6" onOpenAutoFocus={e => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-xl">Update your post</DialogTitle>
          <DialogDescription className="!mt-0">
            Let people know what you are thinking
          </DialogDescription>
        </DialogHeader>
        <Form {...updatePostForm}>
          <form
            onSubmit={updatePostForm.handleSubmit(onUpdatePost)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={updatePostForm.control}
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
              control={updatePostForm.control}
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
              control={updatePostForm.control}
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
              control={updatePostForm.control}
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
                <Button
                  variant="outline"
                  disabled={pending}
                  type="button"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="w-fit" disabled={pending}>
                {pending && <Spinner className="mr-2 h-4 w-4" />}
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
