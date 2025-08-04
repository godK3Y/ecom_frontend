"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AddressForm } from "@/components/profile/address-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Edit, MapPin, Plus, Trash2 } from "lucide-react"
import type { Address } from "@/interfaces/user"

// Mock addresses data
const mockAddresses: Address[] = [
  {
    id: "1",
    type: "shipping",
    firstName: "John",
    lastName: "Doe",
    company: "Tech Corp",
    address1: "123 Main Street",
    address2: "Apt 4B",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    country: "United States",
    phone: "+1 (555) 123-4567",
    isDefault: true,
  },
  {
    id: "2",
    type: "billing",
    firstName: "John",
    lastName: "Doe",
    address1: "456 Oak Avenue",
    city: "Brooklyn",
    state: "NY",
    postalCode: "11201",
    country: "United States",
    phone: "+1 (555) 987-6543",
    isDefault: false,
  },
]

export function ProfileAddresses() {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddAddress = (address: Omit<Address, "id">) => {
    const newAddress: Address = {
      ...address,
      id: Date.now().toString(),
    }
    setAddresses([...addresses, newAddress])
    setIsDialogOpen(false)
  }

  const handleEditAddress = (address: Address) => {
    setAddresses(addresses.map((addr) => (addr.id === address.id ? address : addr)))
    setEditingAddress(null)
    setIsDialogOpen(false)
  }

  const handleDeleteAddress = (addressId: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== addressId))
  }

  const handleSetDefault = (addressId: string) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === addressId,
      })),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Saved Addresses</h2>
          <p className="text-sm text-muted-foreground">Manage your shipping and billing addresses</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingAddress(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Address
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingAddress ? "Edit Address" : "Add New Address"}</DialogTitle>
            </DialogHeader>
            <AddressForm
              address={editingAddress}
              onSubmit={editingAddress ? handleEditAddress : handleAddAddress}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {addresses.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <MapPin className="h-12 w-12 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">No addresses saved</h3>
              <p className="text-muted-foreground">Add your first address to make checkout faster.</p>
            </div>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Address
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <Card key={address.id} className={address.isDefault ? "ring-2 ring-primary" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base capitalize">{address.type} Address</CardTitle>
                    {address.isDefault && <Badge variant="default">Default</Badge>}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditingAddress(address)
                        setIsDialogOpen(true)
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteAddress(address.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium">
                    {address.firstName} {address.lastName}
                  </p>
                  {address.company && <p className="text-muted-foreground">{address.company}</p>}
                  <p className="text-muted-foreground">{address.address1}</p>
                  {address.address2 && <p className="text-muted-foreground">{address.address2}</p>}
                  <p className="text-muted-foreground">
                    {address.city}, {address.state} {address.postalCode}
                  </p>
                  <p className="text-muted-foreground">{address.country}</p>
                  {address.phone && <p className="text-muted-foreground">{address.phone}</p>}
                </div>

                {!address.isDefault && (
                  <Button variant="outline" size="sm" onClick={() => handleSetDefault(address.id)}>
                    Set as Default
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
