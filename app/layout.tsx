import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Image from "next/image";

import { StackedLayout } from '@/components/stacked-layout'
import { Navbar, NavbarItem, NavbarLabel, NavbarSection, NavbarDivider, NavbarSpacer } from '@/components/navbar'
import { Sidebar, SidebarBody, SidebarHeader, SidebarItem, SidebarLabel, SidebarSection } from '@/components/sidebar'

import { SparklesIcon } from '@heroicons/react/20/solid'

const navItems = [
  { label: 'Live Arena', url: '/arena' },
  { label: 'Leaderboard', url: '/leaderboard' },
  { label: 'Order Explorer', url: '/orders' },
  { label: 'Stats', url: '/stats' },
]

const footerItems = [
  { label: 'Terms', url: 'https://www.urani.xyz/terms/conditions' },
  { label: 'Privacy', url: 'https://www.urani.xyz/terms/privacy' },
  { label: 'Press', url: 'https://www.urani.xyz/media-kit' },
  { label: 'Careers', url: 'https://www.urani.xyz/careers' },
  { label: 'Values', url: 'https://www.urani.xyz/values' },
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
      <body className={inter.className}>
        <StackedLayout 
        navbar={
          <div className="lg:mx-40">
          <Navbar>
              <NavbarItem className="max-lg:hidden" href="https://urani.xyz">
                <img src="/urani.svg" />
                <NavbarLabel>Urani</NavbarLabel>
              </NavbarItem>
            <NavbarSection className="max-lg:hidden ml-10">
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
                2HPwR...5gSJr
              </NavbarItem>
            </NavbarSection>
          </Navbar>
          </div>
        }
        sidebar={
          <Sidebar>
            <SidebarHeader>
              <NavbarItem href="https://urani.xyz">
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
        footer={
          // give a horizontal margin
          <div className="mx-40">
            <Navbar>
              <NavbarItem className="max-lg:hidden">
                Think Infinite © Urani, Inc. 2024
              </NavbarItem>
              <NavbarSection className="max-lg:hidden ml-10">
                {footerItems.map(({ label, url }) => (
                  <NavbarItem key={label} href={url}>
                    {label}
                  </NavbarItem>
                ))}
              </NavbarSection>
              <NavbarSpacer />
              <NavbarSection>
                <NavbarItem>
                <a
                  href="https://github.com/urani-labs"
                  className="hover:text-decoration-line sm:ms-6 max-lg:hidden"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="github.svg"
                    alt="GitHub Logo"
                    className="w-4 h-4"
                    width={20}
                    height={20}
                    priority
                  />
                  <span className="sr-only">GitHub account</span>
                </a>
                </NavbarItem>
                <NavbarItem>
                <a
                  href="https://twitter.com/urani_labs"
                  className="hover:text-decoration-line ms-6 max-lg:hidden"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="x.svg"
                    alt="X Logo"
                    className="w-4 h-4"
                    width={20}
                    height={20}
                    priority
                  />
                  <span className="sr-only">X account</span>
                </a>
                </NavbarItem>
              </NavbarSection>
            </Navbar>
          </div>
        }
      > 
        {children}
      </StackedLayout>

      </body>
    </html>
  );
}
