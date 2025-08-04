export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "customer" | "admin" | "seller"
  avatar?: string
  phone?: string
  dateOfBirth?: string
  createdAt: string
  updatedAt: string
}

export interface UserProfile extends User {
  addresses: Address[]
  preferences: UserPreferences
}

export interface Address {
  id: string
  type: "shipping" | "billing"
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone?: string
  isDefault: boolean
}

export interface UserPreferences {
  newsletter: boolean
  smsNotifications: boolean
  emailNotifications: boolean
  currency: string
  language: string
}
