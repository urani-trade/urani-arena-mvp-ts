import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Image from "next/image";

import { StackedLayout } from '@/components/stacked-layout'
import { Navbar, NavbarItem, NavbarLabel, NavbarSection, NavbarDivider, NavbarSpacer } from '@/components/navbar'
import { Sidebar, SidebarBody, SidebarHeader, SidebarItem, SidebarLabel, SidebarSection } from '@/components/sidebar'
import Footer from '@/components/footer'

import { SparklesIcon } from '@heroicons/react/20/solid'

const navItems = [
  { label: 'Live Arena', url: '/' },
  { label: 'Leaderboard', url: '/leaderboard' },
  { label: 'Stats', url: '/stats' },
]

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Urani Arena | The Ultimate DeFi MEV Competition",
  description: "Watch sophisticated players eat glass live",
  icons: {
    icon: "/light-bg.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/light-bg.svg" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body className={inter.className}>
        <StackedLayout
        navbar={
          <div className="lg:mx-40">
          <Navbar>
              <NavbarItem className="max_lg:hidden" href="https://urani.trade">
                <img src="/urani.svg" />
                <NavbarLabel>Urani</NavbarLabel>
              </NavbarItem>
            <NavbarSection className="max_lg:hidden ml-10 max_md:ml-6">
              {navItems.map(({ label, url }) => (
                <NavbarItem key={label} href={url}>
                  {label}
                </NavbarItem>
              ))}
            </NavbarSection>
            <NavbarSpacer />
            <NavbarSection>
              <NavbarItem>
                <SparklesIcon />
                <span className="text-md max_md:text-sm max_sm:text-xs">2HPwR...5gSJr</span>
              </NavbarItem>
            </NavbarSection>
          </Navbar>
          </div>
        }
        sidebar={
          <Sidebar>
            <SidebarHeader>
              <NavbarItem href="https://urani.trade">
                <img src="/urani.svg" className="w-20 h-20 inline mr-5" />
                <span className="text-2xl font-bold">Urani</span>
              </NavbarItem>
            </SidebarHeader>
            <SidebarBody>
              <SidebarSection>
                {navItems.map(({ label, url }) => (
                  <SidebarItem key={label} href={url}>
                    {label}
                  </SidebarItem>
                ))}
              </SidebarSection>
            </SidebarBody>
          </Sidebar>
        }
        footer={<Footer/>}
      >
        {children}
      </StackedLayout>

      </body>
    </html>
  );
}
