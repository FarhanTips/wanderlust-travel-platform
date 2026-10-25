"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleUserRound, Menu as MenuIcon } from "lucide-react";
import { Menu } from "@base-ui/react/menu";
import { cn } from "@/lib/utils";


const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "Add Destination", href: "/add-destination" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50  bg-background shadow-sm">
      <nav className="relative mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Mobile navigation */}
        <div className="md:hidden">
          <Menu.Root>
            <Menu.Trigger
              aria-label="Open navigation menu"
              className="-ml-2 flex items-center rounded-md p-2 text-foreground/80 transition-colors hover:text-brand"
            >
              <MenuIcon className="size-5" />
            </Menu.Trigger>
            <Menu.Portal>
              <Menu.Positioner sideOffset={8} className="z-50">
                <Menu.Popup className="min-w-56 rounded-lg border border-border bg-popover p-1.5 text-foreground shadow-xl">
                  {navLinks.map(({ label, href }) => (
                    <Menu.LinkItem
                      key={href}
                      href={href}
                      closeOnClick
                      className={cn(
                        "block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                        pathname === href && "text-brand",
                      )}
                    >
                      {label}
                    </Menu.LinkItem>
                  ))}
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>
        </div>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "text-sm font-medium text-foreground/75 transition-colors hover:text-brand",
                    isActive && "border-b-2 border-brand pb-0.5 text-brand",
                  )}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Brand — absolutely centered regardless of side widths */}
        <Link
          href="/"
          className={cn(
            "absolute left-1/2 -translate-x-1/2 text-2xl font-bold italic tracking-tight text-brand",
          )}
        >
          Wanderlust
        </Link>

        {/* Account actions */}
        <div className="flex items-center gap-4 text-sm font-medium sm:gap-5">
          <Link
            href="/profile"
            className="hidden items-center gap-1.5 text-foreground/75 transition-colors hover:text-brand sm:flex"
          >
            <CircleUserRound className="size-4" />
            Profile
          </Link>
          <Link
            href="/login"
            className="text-foreground/75 transition-colors hover:text-brand"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="text-foreground/75 transition-colors hover:text-brand"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}
