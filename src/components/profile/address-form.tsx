"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addressSchema, type AddressFormData } from "@/lib/validators"
import type { Address } from "@/interfaces/user"

interface AddressFormProps {
  address?: Address | null
  onSubmit: (address: Address) => void
  onCancel: () => void
}

export function AddressForm({ address, onSubmit, onCancel }: AddressFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      firstName: address?.firstName || "",
      lastName: address?.lastName || "",
      company: address?.company || "",
      address1: address?.address1 || "",
      address2: address?.address2 || "",
      city: address?.city || "",
      state: address?.state || "",
      postalCode: address?.postalCode || "",
      country: address?.country || "United States",
      phone: address?.phone || "",
    },
  })

  const handleFormSubmit = (data: AddressFormData) => {
    const addressData: Address = {
      id: address?.id || "",
      type: address?.type || "shipping",
      isDefault: address?.isDefault || false,
      ...data,
    }
    onSubmit(addressData)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input id="firstName" {...register("firstName")} error={errors.firstName?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input id="lastName" {...register("lastName")} error={errors.lastName?.message} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company (Optional)</Label>
        <Input id="company" {...register("company")} error={errors.company?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address1">Address Line 1 *</Label>
        <Input id="address1" {...register("address1")} error={errors.address1?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address2">Address Line 2 (Optional)</Label>
        <Input id="address2" {...register("address2")} error={errors.address2?.message} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input id="city" {...register("city")} error={errors.city?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State *</Label>
          <Input id="state" {...register("state")} error={errors.state?.message} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code *</Label>
          <Input id="postalCode" {...register("postalCode")} error={errors.postalCode?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <Select defaultValue={watch("country")} onValueChange={(value) => setValue("country", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="United States">United States</SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
              <SelectItem value="United Kingdom">United Kingdom</SelectItem>
              <SelectItem value="Australia">Australia</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number (Optional)</Label>
        <Input id="phone" type="tel" {...register("phone")} error={errors.phone?.message} />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{address ? "Update Address" : "Add Address"}</Button>
      </div>
    </form>
  )
}
