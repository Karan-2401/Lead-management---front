import React, { useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, BarChart3, Settings, UserCog, Wrench, LogOut, User } from 'lucide-react'
import { DataContext } from '../dataContext'
import { useContext } from 'react'

export default function LmsLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const Data = useContext(DataContext)
  function removeFromLocalStorage(key) {
  sessionStorage.removeItem(key);
}
   useEffect(() => {
    if (!Data?.Data || Data.Data === '') {
      navigate('/');
    }
  }, [Data, navigate]); 
  // const role = Data?.Data?.profile?.role ? Data.Data.profile.role : 'thieve';
  const role = (Data?.Data && typeof Data.Data === 'object' && Data.Data.profile && Data.Data.profile.role)
    ? Data.Data.profile.role 
    : 'thieve';

  

      const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, for:['Admin','Employee']},
    { name: 'Leads', path: '/dashboard/lead', icon: Users, for:['Admin','Employee'] },
    { name: 'Analytics', path: '/dashboard/analytics', icon: BarChart3, for:['Admin'] },
    { name: 'Setting', path: '/dashboard/setting', icon: Settings, for:['Admin','Employee'] },
    { name: 'User Management', path: '/dashboard/usermanagement', icon: UserCog, for:['Admin'] },
  ]


  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div className="flex h-screen bg-neutral-950">
      {/* Sidebar */}
      <aside className="w-64 border-r border-neutral-800 bg-neutral-900">
        {/* Logo/Brand */}
        <div className="flex h-16 items-center border-b border-neutral-800 px-6">
          <h2 className="text-xl font-bold text-white">LeadTracker</h2>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${item.for.includes(role) ? '' : 'hidden'} ${
                  active
                    ? 'bg-blue-500 text-white'
                    : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                } `}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-neutral-800 bg-neutral-900 px-6">
          <div>
            <h1 className="text-lg font-semibold text-white">Welcome back!</h1>
            <p className="text-sm text-neutral-400">{"Here's what's happening today"}</p>
          </div>

          {/* Header Icons */}
          <div className="flex items-center gap-4">
            {/* Tool Icon */}
            <button className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white">
              <Wrench className="h-5 w-5" />
            </button>

            {/* Profile Icon */}
            <button className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white">
              <User className="h-5 w-5" />
            </button>

            {/* Logout Icon */}
            <button className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-red-400" onClick={()=>{
              removeFromLocalStorage('user')
              navigate('/')
            }}>
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-neutral-950 p-6">
           {/* {navigate.state === "loading" && <TopLoader />} */}
          <Outlet />
        </main>
      </div>
    </div>
  )
}