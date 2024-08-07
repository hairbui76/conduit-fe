'use client';

import { useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/common/Form';
import { Textarea } from '@/components/common/TextArea';
import { commentSchema } from '@/forms/comment-form';
import { Profile } from '@/types/Profile';
import PostCardHeaderAvatar from '../PostCardAvatar';
import { commentPost } from '@/actions/post';
import { replace } from 'lodash';
import toast from 'react-hot-toast';

export default function CommentPost({ currentUser, slug }: { currentUser: Profile; slug: string }) {
  const [pending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema)
  });

  function onSubmit(data: z.infer<typeof commentSchema>) {
    startTransition(async () => {
      try {
        await commentPost(slug, replace(data.comment, new RegExp('\n', 'g'), '\\n'));
        form.setValue('comment', '');
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Something went wrong. Try again later', {
          position: 'top-center'
        });
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
