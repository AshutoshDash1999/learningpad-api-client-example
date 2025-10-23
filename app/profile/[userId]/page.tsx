"use client";

import { useProfile, useUpdateProfile } from "@/api/hooks/useProfile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Building2,
  Edit,
  Globe,
  Mail,
  MapPin,
  Phone,
  Save,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

// Form schema with Zod validation
const profileFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  username: z
    .string()
    .min(1, "Username is required")
    .max(50, "Username is too long"),
  email: z.email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  website: z.url("Invalid website URL").or(z.literal("")),
  address: z.object({
    street: z.string().min(1, "Street is required"),
    suite: z.string().min(1, "Suite is required"),
    city: z.string().min(1, "City is required"),
    zipcode: z.string().min(1, "Zipcode is required"),
  }),
  company: z.object({
    name: z.string().min(1, "Company name is required"),
    catchPhrase: z.string().min(1, "Catch phrase is required"),
    bs: z.string().min(1, "Business description is required"),
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const ProfilePage = () => {
  const params = useParams();
  const userId = params.userId as string;

  const { data: profile, isLoading, error } = useProfile(userId);
  const { mutateAsync: updateProfile, isPending: isUpdating } =
    useUpdateProfile();

  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
      },
      company: {
        name: "",
        catchPhrase: "",
        bs: "",
      },
    },
  });

  const handleEdit = () => {
    if (profile) {
      form.reset({
        name: profile.name,
        username: profile.username,
        email: profile.email,
        phone: profile.phone,
        website: profile.website,
        address: {
          street: profile.address.street,
          suite: profile.address.suite,
          city: profile.address.city,
          zipcode: profile.address.zipcode,
        },
        company: {
          name: profile.company.name,
          catchPhrase: profile.company.catchPhrase,
          bs: profile.company.bs,
        },
      });
    }
    setIsEditing(true);
  };

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      await updateProfile({
        id: userId,
        data,
      });
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.reset();
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-20" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">
            Error Loading Profile
          </h1>
          <p className="text-muted-foreground">
            Failed to load profile data. Please try again.
          </p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
          <p className="text-muted-foreground">
            The requested profile could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Button
        asChild
        variant="ghost"
        className="mb-4 p-0 h-auto hover:bg-transparent"
      >
        <Link href="/posts">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Posts
        </Link>
      </Button>

      <Form {...form}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  {isEditing ? (
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              className="text-2xl font-bold border-0 p-0 h-auto"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    profile.name
                  )}
                </h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>@{profile.username}</span>
                  <Badge variant="secondary">ID: {profile.id}</Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button
                    onClick={form.handleSubmit(onSubmit)}
                    disabled={isUpdating}
                    size="sm"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isUpdating ? "Saving..." : "Save"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isUpdating}
                    size="sm"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={handleEdit} size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      {isEditing ? (
                        <FormControl>
                          <Input {...field} type="email" />
                        </FormControl>
                      ) : (
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{profile.email}</span>
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      {isEditing ? (
                        <FormControl>
                          <Input {...field} type="tel" />
                        </FormControl>
                      ) : (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{profile.phone}</span>
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      {isEditing ? (
                        <FormControl>
                          <Input {...field} type="url" />
                        </FormControl>
                      ) : (
                        <div className="flex items-center gap-2 text-sm">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <a
                            href={
                              profile.website.startsWith("http")
                                ? profile.website
                                : `https://${profile.website}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {profile.website}
                          </a>
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="address.street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street</FormLabel>
                      {isEditing ? (
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      ) : (
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{profile.address.street}</span>
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address.suite"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Suite</FormLabel>
                      {isEditing ? (
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      ) : (
                        <span className="text-sm">{profile.address.suite}</span>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      {isEditing ? (
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      ) : (
                        <span className="text-sm">{profile.address.city}</span>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address.zipcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zipcode</FormLabel>
                      {isEditing ? (
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      ) : (
                        <span className="text-sm">
                          {profile.address.zipcode}
                        </span>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Company Information */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="company.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        {isEditing ? (
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        ) : (
                          <span className="text-sm font-medium">
                            {profile.company.name}
                          </span>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company.catchPhrase"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Catch Phrase</FormLabel>
                        {isEditing ? (
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        ) : (
                          <span className="text-sm italic">
                            &quot;{profile.company.catchPhrase}&quot;
                          </span>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company.bs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business</FormLabel>
                        {isEditing ? (
                          <FormControl>
                            <Textarea {...field} className="min-h-[60px]" />
                          </FormControl>
                        ) : (
                          <span className="text-sm">{profile.company.bs}</span>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ProfilePage;
