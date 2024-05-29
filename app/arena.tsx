import { StackedLayout } from '@/components/stacked-layout'
import { Navbar, NavbarItem, NavbarLabel, NavbarSection, NavbarDivider, NavbarSpacer } from '@/components/navbar'
import { Sidebar, SidebarBody, SidebarHeader, SidebarItem, SidebarLabel, SidebarSection } from '@/components/sidebar'

import { SparklesIcon } from '@heroicons/react/20/solid'

const navItems = [
  { label: 'Live Arena', url: '/' },
  { label: 'Leaderboard', url: '/events' },
  { label: 'Order Explorer', url: '/orders' },
]

export default function Arena({ children }) {
  return (
    <StackedLayout
      navbar={
        <Navbar>
            <NavbarItem className="max-lg:hidden" href="https://urani.xyz">
              <img src="/urani.svg" />
              <NavbarLabel>Urani</NavbarLabel>
            </NavbarItem>
          <NavbarDivider className="max-lg:hidden" />
          <NavbarSection className="max-lg:hidden">
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
    >
      {children}
    </StackedLayout>
  )
}
