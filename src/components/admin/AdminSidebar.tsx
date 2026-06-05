"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, Calendar, MessageSquare, FileText,
  Image, Star, HelpCircle, Settings, Wrench, LogOut,
  Music2, Menu, X, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "admin",              label: "Dashboard",    icon: LayoutDashboard  },
  { href: "admin/bookings",     label: "Bookings",     icon: Calendar         },
  { href: "admin/messages",     label: "Messages",     icon: MessageSquare    },
  { href: "admin/blog",         label: "Blog",         icon: FileText         },
  { href: "admin/gallery",      label: "Gallery",      icon: Image            },
  { href: "admin/testimonials", label: "Testimonials", icon: Star             },
  { href: "admin/services",     label: "Services",     icon: Wrench           },
  { href: "admin/faq",          label: "FAQ",          icon: HelpCircle       },
  { href: "admin/settings",     label: "Settings",     icon: Settings         },
];

interface Props { locale: string }

export function AdminSidebar({ locale }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    const full = `/${locale}/${href}`;
    return href === "admin"
      ? pathname === full
      : pathname.startsWith(full);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/8 flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full border border-amber-500/40 bg-amber-500/10 flex items-center justify-center">
          <Music2 className="w-3.5 h-3.5 text-amber-400" />
        </div>
        <div>
          <p className="font-heading text-sm text-amber-50 leading-tight">Torigo</p>
          <p className="font-mono text-[8px] tracking-[0.25em] uppercase text-stone-500">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={`/${locale}/${href}`}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-150 group",
                active
                  ? "bg-amber-600/15 text-amber-400 border-l-2 border-amber-500 pl-[10px]"
                  : "text-stone-400 hover:bg-white/5 hover:text-stone-200 border-l-2 border-transparent"
              )}
            >
              <Icon className={cn("w-4 h-4 shrink-0", active ? "text-amber-400" : "text-stone-500 group-hover:text-stone-300")} />
              <span className="font-mono text-[10px] tracking-[0.15em] uppercase">{label}</span>
              {active && <ChevronRight className="w-3 h-3 ml-auto text-amber-500/60" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-5 pt-3 border-t border-white/8 space-y-1">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-stone-500 hover:text-stone-300 hover:bg-white/5 transition-all text-xs font-mono tracking-widest uppercase"
        >
          <Music2 className="w-4 h-4" />
          View Site
        </Link>
        <form action={`/${locale}/api/auth/signout`} method="post">
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-stone-500 hover:text-red-400 hover:bg-red-500/5 transition-all text-xs font-mono tracking-widest uppercase"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 md:hidden w-9 h-9 bg-[#0d0a07] border border-white/10 flex items-center justify-center text-stone-400 hover:text-white"
      >
        {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div className={cn(
        "fixed top-0 left-0 h-full w-60 bg-[#0d0a07] border-r border-white/8 z-40 transition-transform duration-300 md:hidden",
        open ? "translate-x-0" : "-translate-x-full"
      )}>
        <SidebarContent />
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-col fixed top-0 left-0 h-full w-60 bg-[#0d0a07] border-r border-white/8 z-30">
        <SidebarContent />
      </div>
    </>
  );
}
