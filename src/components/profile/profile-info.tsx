"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { Camera, Save } from "lucide-react";

// Define the validation schema and form data type for the profile form.
// Without these definitions the TypeScript compiler cannot find
// `ProfileFormData` or `profileSchema`. Adjust the constraints as
// necessary for your application.
const profileSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
});
type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileInfo() {
  const user = useAuth().user;
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName:
        user?.firstName ||
        ((user as { name?: string }).name
          ? (user as { name?: string }).name!.trim().split(/\s+/)[0]
          : "") ||
        "",
      lastName:
        user?.lastName ||
        ((user as { name?: string }).name
          ? (user as { name?: string })
              .name!.trim()
              .split(/\s+/)
              .slice(1)
              .join(" ")
          : "") ||
        "",
      email: user?.email || "",
      phone: user?.phone || "",
      dateOfBirth: user?.dateOfBirth || "",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsSaving(true);
    try {
      // Update profile logic here
      console.log("Updating profile:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      {/* Profile Picture */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>Update your profile picture</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={user.avatar}
                /*
                 * Build the alt text by using either the explicit
                 * first/last names or by splitting the full `name` field on
                 * whitespace. Casting to `{ name?: string }` allows us to
                 * access an optional `name` property without resorting to
                 * `any`. Empty strings are used when no name information
                 * exists.
                 */
                alt={`${(
                  user.firstName ||
                  ((user as { name?: string }).name
                    ? (user as { name?: string }).name!.trim().split(/\s+/)[0]
                    : "") ||
                  ""
                ).trim()} ${(
                  user.lastName ||
                  ((user as { name?: string }).name
                    ? (user as { name?: string })
                        .name!.trim()
                        .split(/\s+/)
                        .slice(1)
                        .join(" ")
                    : "") ||
                  ""
                ).trim()}`}
              />
              <AvatarFallback className="text-lg">
                {(
                  user.firstName ||
                  ((user as { name?: string }).name
                    ? (user as { name?: string }).name!.trim().split(/\s+/)[0]
                    : "") ||
                  ""
                )
                  .charAt(0)
                  .toUpperCase()}
                {(
                  user.lastName ||
                  ((user as { name?: string }).name
                    ? (user as { name?: string })
                        .name!.trim()
                        .split(/\s+/)
                        .slice(1)
                        .join(" ")
                    : "") ||
                  ""
                )
                  .charAt(0)
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              <Camera className="h-4 w-4 mr-2" />
              Change Photo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </div>
            {!isEditing && (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  {...register("firstName")}
                  disabled={!isEditing}
                  // error messages are handled outside of the Input component
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  {...register("lastName")}
                  disabled={!isEditing}
                  // error messages are handled outside of the Input component
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                disabled={!isEditing}
                // error messages are handled outside of the Input component
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                disabled={!isEditing}
                // error messages are handled outside of the Input component
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                {...register("dateOfBirth")}
                disabled={!isEditing}
                // error messages are handled outside of the Input component
              />
            </div>

            {isEditing && (
              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>
            Your account details and membership status
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Member Since
              </Label>
              <p className="text-sm">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Account Type
              </Label>
              <p className="text-sm capitalize">{user.role}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
