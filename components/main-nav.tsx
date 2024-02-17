'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';

import {cn} from '@/lib/utils';
import {ILanguage} from '@/types';

interface MainNavProps {
  data: ILanguage[];
}

const MainNav: React.FC<MainNavProps> = ({data}) => {
  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/language/${route._id}`,
    label: route.name,
    active: pathname === `/language/${route._id}`,
  }));

  return (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-black',
            route.active ? 'text-black' : 'text-neutral-500',
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
