import { ProfileContent } from "@/components/profile/profile-content"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function ProfilePage() {
  return (
    <AuthGuard requireAuth={true}>
      <ProfileContent />
    </AuthGuard>
  )
}
