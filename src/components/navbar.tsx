// Updated Navbar component
import {
  Burger,
  Button,
  Drawer,
  Group,
  ScrollArea,
  Divider,
  Box,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classes from './HeaderMenu.module.css';

// Custom Logo Component
const JobPortalLogo = () => (
  <Link href="/" style={{ textDecoration: 'none' }}>
    <Box style={{ display: 'flex', alignItems: 'center' }}>
      <Box
        style={{
          width: rem(40),
          height: rem(40),
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: rem(8),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Geometric design inside logo */}
        <Box
          style={{
            width: rem(24),
            height: rem(24),
            background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
            borderRadius: rem(4),
            position: 'relative',
          }}
        />
        <Box
          style={{
            position: 'absolute',
            right: rem(8),
            bottom: rem(8),
            width: rem(16),
            height: rem(16),
            backgroundColor: '#2c2c2c',
            borderRadius: rem(2),
          }}
        />
      </Box>
    </Box>
  </Link>
);

interface NavbarProps {
  onCreateJobClick: () => void;
}

export default function Navbar({ onCreateJobClick }: NavbarProps) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const router = useRouter();
  const currentPath = router.pathname;

  const navigationLinks = [
    { href: '/', label: 'Home' },
    { href: '/find-jobs', label: 'Find Jobs' },
    { href: '/find-talents', label: 'Find Talents' },
    { href: '/about', label: 'About us' },
    { href: '/testimonials', label: 'Testimonials' },
  ];

  return (
    <>
    <Box 
      style={{
        backgroundColor: 'white',
        border: '1px solid #e9ecef',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        margin: '16px',
        overflow: 'hidden'
      }}
    >
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <JobPortalLogo />

          <Group h="100%" gap={32} visibleFrom="sm">
            {navigationLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`${classes.link} ${currentPath === link.href ? classes.activeLink : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </Group>

          <Group visibleFrom="sm">
            <Button 
              onClick={onCreateJobClick}
              size="md"
              radius="xl"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                fontWeight: 600,
                paddingLeft: '24px',
                paddingRight: '24px',
              }}
            >
              Create Job
            </Button>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>
    </Box>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px)" mx="-md">
          <Divider my="sm" />

          {navigationLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={classes.link}
              onClick={closeDrawer}
            >
              {link.label}
            </Link>
          ))}

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button 
              onClick={() => {
                onCreateJobClick();
                closeDrawer();
              }}
              size="md"
              radius="xl"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                fontWeight: 600,
                paddingLeft: '24px',
                paddingRight: '24px',
              }}
            >
              Create Job
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </>
    
  );
  
}