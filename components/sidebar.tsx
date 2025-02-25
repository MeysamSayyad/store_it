"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { avatarPlaceHolder, navItems } from "../constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
interface Props {
  fullName: string;
  avatar: string;
  email: string;
}

function Sidebar({ fullName, avatar, email }: Props) {
  const pathname = usePathname();
  return (
    <aside className="sidebar">
      <Link href={"/"}>
        <Image
          src={"/assets/icons/logo-full-brand.svg"}
          alt="logo"
          width={160}
          height={50}
          className="hidden lg:block h-auto"
        />
        <Image
          src={"/assets/icons/logo-brand.svg"}
          className="lg:hidden"
          alt="logo"
          width={52}
          height={52}
        />
      </Link>
      <nav className="sidebar-nav">
        <ul className=" flex flex-1 flex-col gap-6">
          {navItems.map((item) => (
            <Link key={item.name} className=" lg:w-full" href={item.url}>
              <li
                className={cn(
                  "sidebar-nav-item",
                  pathname === item.url && "shad-active"
                )}
              >
                <Image
                  className={cn(
                    "nav-icon",
                    pathname === item.url && "nav-icon-active"
                  )}
                  src={item.icon}
                  alt="name"
                  width={24}
                  height={24}
                />
                <p className=" hidden lg:block">{item.name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      <Image
        src={"/assets/images/files-2.png"}
        alt="logo"
        width={170}
        height={200}
      />
      <div className="sidebar-user-info">
        <Image
          src={avatar}
          width={40}
          height={40}
          alt="avatar"
          className="sidebar-user-avatar"
        />
        <div className=" hidden lg:block">
          <p className=" subtitle-2 capitalize">{fullName}</p>
          <p className="caption">{email}</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
