import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import LogoutButton from "@/features/profile/components/logout-button";
import ProfileHeader from "@/features/profile/components/profile-header";
import ProfileMenu from "@/features/profile/components/profile-menu";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const { name, email, image } = session.user;

  return (
    <section>
      <h1 className="text-2xl font-bold">Profile</h1>
      <ProfileHeader name={name} email={email} image={image} />

      <div className="mt-4">
        <p className="font-medium text-black">Account</p>
        <ProfileMenu />
      </div>

      <div className="mt-6">
        <LogoutButton />
      </div>
    </section>
  );
}
