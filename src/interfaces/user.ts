export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "customer" | "admin";
  avatar?: string;
  phone?: string;
  dateOfBirth?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Represents the user profile returned by the backend API. The API
 * response uses different field names from our internal `User`
 * interface, so we define a separate type here to describe the
 * structure of the raw data. This interface mirrors the JSON
 * returned from `GET /users/profile` and allows us to perform
 * type‑safe transformations when mapping the API data onto our
 * internal `User` model.
 */
export interface ApiUserProfile {
  /** The unique identifier for the user in the database */
  _id: string;
  /** The full name of the user, e.g. "Alice Johnson" */
  name: string;
  /** The user’s email address */
  email: string;
  /** A hashed password. This field may be present in the API
   * response but is never surfaced in the UI or stored client‑side. */
  password?: string;
  /** The role assigned to the user */
  role: "customer" | "admin";
  /** ISO string for when the account was created */
  createdAt: string;
  /** ISO string for when the account was last updated */
  updatedAt: string;
  /** Optional phone number for the user */
  phone?: string;
  /** A list of items the user has added to their wishlist. The
   * contents are application specific and therefore typed as
   * `any[]` here. */
  wishlist?: string;
  /** An array of addresses associated with the user. This is optional
   * because the API may omit it when no addresses have been added. */
  addresses?: Address[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserProfile extends User {
  addresses: Address[];
  preferences: UserPreferences;
}

export interface Address {
  id: string;
  type: "shipping" | "billing";
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

export interface UserPreferences {
  newsletter: boolean;
  smsNotifications: boolean;
  emailNotifications: boolean;
  currency: string;
  language: string;
}
