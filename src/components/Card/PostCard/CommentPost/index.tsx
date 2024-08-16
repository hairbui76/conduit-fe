'use client';

import { useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/Form';
import { Textarea } from '@/components/TextArea';
import { CommentSchema } from '@/forms/comment-form';
import { Profile } from '@/types/Profile';
import PostCardHeaderAvatar from '../PostCardAvatar';
import { commentPost } from '@/actions/post';
import toast from 'react-hot-toast';
import { insertNewLine } from '@/lib/utils';

export default function CommentPost({ currentUser, slug }: { currentUser: Profile; slug: string }) {
  const [pending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema)
  });

  function onSubmit(data: z.infer<typeof CommentSchema>) {
    startTransition(async () => {
      const response = await commentPost({ slug, comment: insertNewLine(data.comment) });
      if (response?.error) {
        toast.error(response.error, {
          position: 'top-center'
        });
      } else {
        form.setValue('comment', '');
      }
    });
  }

  return (
    <div className="flex px-4 my-6 gap-3">
      <PostCardHeaderAvatar author={currentUser} />
      <Form {...form}>
        <form className="flex-grow">
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Add a comment"
                    className="resize-none"
                    {...field}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        form.handleSubmit(onSubmit)();
                      }
                    }}
                    disabled={pending}
                    maxLength={500}
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
