"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MessageCircle, Save, User, X } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";

const commentSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .max(100, "Email must be less than 100 characters"),
  body: z
    .string()
    .min(1, "Comment is required")
    .max(500, "Comment must be less than 500 characters"),
  postId: z.number().optional(),
});

type CommentFormData = z.infer<typeof commentSchema>;

interface CommentFormProps {
  onSubmit: (data: CommentFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialData?: Partial<CommentFormData>;
}

export function CommentForm({
  onSubmit,
  onCancel,
  isLoading = false,
  initialData,
}: CommentFormProps) {
  const form = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      body: initialData?.body || "",
      postId: initialData?.postId || undefined,
    },
  });

  const handleSubmit = (data: CommentFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your name..."
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Comment
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your comment..."
                  className="min-h-[80px] resize-none"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 pt-2">
          <Button type="submit" disabled={isLoading} className="flex-1">
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Saving..." : "Save Comment"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
