import Link from "next/link";
import { ChevronRight, Code, Settings, Trash2 } from "lucide-react";

type MenuCardProps = {
  href: string;
  title: string;
  icon: React.ReactNode;
  iconClass?: string;
  external?: boolean;
};

function MenuCard({
  href,
  title,
  icon,
  iconClass = "text-primary",
  external,
}: MenuCardProps) {
  const content = (
    <div className="mt-3 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm shadow-primary/20 transition hover:bg-black/5">
      <div className="rounded-xl bg-muted p-2.5">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-black">{title}</p>
      </div>
      <ChevronRight className={`h-5 w-5 shrink-0 ${iconClass}`} />
    </div>
  );

  if (external) {
    return (
      <a href={href || "#"} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <Link href={href}>{content}</Link>;
}

export default function ProfileMenu() {
  return (
    <div>
      <MenuCard
        href="/profile/manage"
        title="Manage account"
        icon={<Settings className="h-5 w-5 text-primary" />}
      />
      <MenuCard
        href="/profile/delete"
        title="Delete account"
        icon={<Trash2 className="h-5 w-5 text-primary" />}
        iconClass="text-danger"
      />
      <MenuCard
        href={"https://github.com/weenson"}
        title="GitHub"
        icon={<Code className="h-5 w-5 text-primary" />}
        external
      />
    </div>
  );
}
