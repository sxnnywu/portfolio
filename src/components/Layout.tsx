import { NavLink, Outlet } from 'react-router-dom'

const links = [
  { to: '/', label: 'home' },
  { to: '/experience', label: 'experience' },
  { to: '/projects', label: 'projects' },
  { to: '/community', label: 'community' },
  { to: '/awards', label: 'awards' },
  { to: '/contact', label: 'contact' },
]

export default function Layout() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-neutral-200">
        <nav className="mx-auto flex max-w-3xl flex-wrap gap-x-6 gap-y-2 px-6 py-5">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                isActive ? 'underline' : 'text-neutral-500 hover:text-neutral-900'
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-12">
        <Outlet />
      </main>
    </div>
  )
}
