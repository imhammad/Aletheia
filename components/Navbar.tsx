import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./LogoutButton";

export async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-cream border-b border-pistachio-300">
      <Link href="/" className="font-serif text-xl text-charcoal">
        Aletheia
      </Link>
      <div className="flex items-center gap-4 font-sans text-sm">
        <Link href="/topics" className="text-charcoal/70 hover:text-charcoal">
          Topics
        </Link>
        <Link href="/roadmaps" className="text-charcoal/70 hover:text-charcoal">
          Roadmaps
        </Link>
        {user ? (
          <>
            <span className="text-charcoal/70">{user.email}</span>
            <LogoutButton />
          </>
        ) : (
          <Link
            href="/login"
            className="bg-charcoal text-cream px-4 py-2 rounded-md hover:bg-charcoal/80"
          >
            Log in
          </Link>
        )}
      </div>
    </nav>
  );
}