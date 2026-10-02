import { Mail, User } from "lucide-react";

type ProfileHeaderProps = {
  name: string;
  email: string;
  image?: string | null;
};

export default function ProfileHeader({
  name,
  email,
  image,
}: ProfileHeaderProps) {
  const initial = name?.trim().charAt(0).toUpperCase() || "U";

  return (
    <div className="mt-4 flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm shadow-primary/20">
      {image ? (
        <img
          src={image}
          alt=""
          className="h-16 w-16 shrink-0 rounded-2xl object-cover"
        />
      ) : (
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
          <span className="text-2xl font-semibold text-primary">{initial}</span>
        </div>
      )}
      <div className="min-w-0">
        <p className="truncate text-lg font-semibold text-black">{name}</p>
        <p className="mt-0.5 truncate text-sm text-muted-text">{email}</p>
      </div>
    </div>
  );
}
