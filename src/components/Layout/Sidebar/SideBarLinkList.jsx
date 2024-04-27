import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import SideBarLinkItem from './SideBarLinkItem';

/**
 * @typedef {{
 *   to: string,
 *   text: string,
 *   activeNames: Array<string>
 * }} LinkRoute
 */

/**
 * @type {Array<LinkRoute>}
 */
const routesRaw = [
  {
    to: '/',
    text: 'Home',
    activeNames: ['/home', '/'],
  },
  {
    to: '/dashboards/1',
    text: 'Dashboard',
    activeNames: ['/dashboard'],
  },
  {
    to: '/some-url',
    text: 'Not Found Page',
    activeNames: ['/some-url'],
  },
];

export default function SideBarLinkList() {
  const { pathname } = useLocation();

  const routes = useMemo(
    () =>
      routesRaw.map(({ to, text, activeNames }) => ({
        to,
        text,
        isActive: activeNames.some((name) => name === pathname),
      })),
    [pathname],
  );

  return (
    <div className='flex animate-appear flex-col items-start justify-start text-sm font-thin'>
      {routes.map(({ to, text, isActive }) => (
        <SideBarLinkItem key={text} to={to} text={text} isActive={isActive} />
      ))}
    </div>
  );
}
