"use client";

import { cn, getLocalStore, setLocalStore } from "@/lib/utils";
import { Nunito } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Switch } from "./ui/switch";
import { useEffect, useState } from "react";
import {
  DictionaryIcon,
  DocumentIcon,
  ExamIcon,
  NotebookIcon,
  PracticeIcon,
  SettingIcon,
  VietnamFlagIcon,
} from "./icons";
import Image from "next/image";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nunito",
});

export default function Header() {
  const links = [
    { url: "/", title: "Từ điển", icon: DictionaryIcon },
    { url: "/notebook", title: "Sổ tay", icon: NotebookIcon },
    { url: "/practice", title: "Luyện tập", icon: PracticeIcon },
    { url: "/exam", title: "Thi thử", icon: ExamIcon },
    { url: "/ebook", title: "Tài liệu", icon: DocumentIcon },
  ];

  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const darkMode = getLocalStore("darkMode");
    setDarkMode(darkMode);
  }, []);

  useEffect(() => {
    const html = document.documentElement;

    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    setLocalStore("darkMode", darkMode);
  }, [darkMode]);

  return (
    <header className="container mx-auto pt-4">
      <div className="flex items-center justify-between bg-(--surface-default-inverse) px-3.5 py-2 rounded-xl">
        <Link
          href="/"
          className="flex items-center text-[28px] font-bold gap-2"
        >
          <Image width={40} height={40} src="/images/logo.png" alt="Logo" />
          <span
            className={nunito.variable + ` font-(family-name:--font-nunito)`}
          >
            Eng
          </span>
        </Link>
        <nav className="flex items-center justify-center gap-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                href={link.url}
                key={link.url}
                className={cn(
                  "flex items-center gap-2 py-3 px-4 rounded-lg hover:bg-(--surface-brand-light) hover:text-(--text-brand-primary) cursor-pointer",
                  pathname === link.url &&
                    "bg-(--surface-brand-light) text-(--text-brand-primary)",
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 text-[#2c416d]",
                    pathname !== link.url && "hidden",
                  )}
                />
                <span>{link.title}</span>
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center flex-wrap">
          <div className="p-2 rounded-lg flex gap-2 bg-(--surface-neutral-primary) mr-4">
            <VietnamFlagIcon />
            <hr className="h-6 border-r-(--border-secondary) border-r border-solid" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div>
                  <SettingIcon />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-max">
                <DropdownMenuItem>
                  Chế độ ban đêm
                  <Switch
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                    onClick={(e) => e.stopPropagation()}
                    id="switch-focus-mode"
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Link href="/login" className="mr-3">
            <Button className="cursor-pointer! rounded-full h-9.5 bg-(--surface-brand-primary)">
              Đăng nhập
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              className="rounded-full h-9.5 cursor-pointer!"
              variant="ghost"
            >
              Đăng ký
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
