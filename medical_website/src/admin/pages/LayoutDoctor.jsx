import { useMediaQuery } from "@uidotdev/usehooks";
import React, { useEffect, useRef, useState } from "react";
import useClickOutSide from "../hooks/useClickOutSide";
import { cn } from "../utils/cn";
import { Sidebar } from "../layouts/sidebar";
import { Outlet } from "react-router-dom";
import { Header } from "../layouts/Header";
import { SideBarDoctor } from "../layouts/SideBarDoctor";

export default function LayoutDoctor() {
  const isDesktopDevice = useMediaQuery("(min-width: 768px)");
  const [collapsed, setCollapsed] = useState(!isDesktopDevice);

  const sidebarRef = useRef(null);

  useEffect(() => {
    setCollapsed(!isDesktopDevice);
  }, [isDesktopDevice]);

  useClickOutSide([sidebarRef], () => {
    if (!isDesktopDevice && !collapsed) {
      setCollapsed(true);
    }
  });
  return (
    <div>
      <div className="min-h-screen bg-white transition-colors">
        <div
          className={cn(
            "pointer-events-none fixed inset-0 -z-10 bg-black opacity-0 transition-opacity",
            !collapsed &&
              "max-md:pointer-events-auto max-md:z-50 max-md:opacity-30"
          )}
        />
        <SideBarDoctor ref={sidebarRef} collapsed={collapsed} />
        <div
          className={cn(
            "transition-[margin] duration-300",
            collapsed ? "md:ml-[70px]" : "md:ml-[240px]"
          )}
        >
          <Header collapsed={collapsed} setCollapsed={setCollapsed} />
          <div className="h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
