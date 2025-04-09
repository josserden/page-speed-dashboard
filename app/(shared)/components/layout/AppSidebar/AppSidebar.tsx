import {
  Calendar,
  ChevronUp,
  Home,
  Inbox,
  LayoutDashboard,
  Search,
  Settings,
  User2,
} from 'lucide-react';
import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/(shared)/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/app/(shared)/components/ui/sidebar';
import { logout } from '@/app/(shared)/utils/supabase/actions';

// Menu items.
const items = [
  {
    icon: Home,
    title: 'Home',
    url: '#',
  },
  {
    icon: Inbox,
    title: 'Inbox',
    url: '#',
  },
  {
    icon: Calendar,
    title: 'Calendar',
    url: '#',
  },
  {
    icon: Search,
    title: 'Search',
    url: '#',
  },
  {
    icon: Settings,
    title: 'Settings',
    url: '#',
  },
];

export const AppSidebar: React.FC = () => {
  return (
    <Sidebar className="h-dvh" variant="floating">
      <SidebarHeader>
        <div className="flex items-center gap-1.5">
          <LayoutDashboard color="#6366f1" size={28} strokeWidth={2.75} />
          <h1 className="text-3xl font-black text-slate-700">Dashboard</h1>
        </div>
      </SidebarHeader>
      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="sr-only">Application</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-[--radix-popper-anchor-width]" side="top">
                <DropdownMenuItem onClick={logout}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
