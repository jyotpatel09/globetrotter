import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { mockUser } from '../../data/mockData';

export const AppLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // Paths that do not show the global headers/footers (e.g. login, register, share)
  const isAuthOrShare = ['/login', '/register'].includes(currentPath) || currentPath.startsWith('/share/');

  const handleLogout = () => {
    // Just a mock navigation to login
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
    { label: 'My Trips', path: '/trips', icon: 'map' },
    { label: 'Discover', path: '/discover', icon: 'explore' },
    { label: 'Profile', path: '/profile', icon: 'person' }
  ];

  if (isAuthOrShare) {
    return (
      <div className="bg-surface min-h-screen text-on-surface font-body-md">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="bg-[#F4EBD0]/30 text-on-surface font-body-md min-h-screen flex flex-col pb-20 md:pb-0">
      {/* TopAppBar - Desktop Only */}
      <header className="bg-[#F4EBD0]/50 backdrop-blur-md sticky docked full-width top-0 border-b border-deep-forest/10 flat no shadows z-50">
        <div className="flex justify-between items-center px-margin-desktop w-full max-w-container-max mx-auto h-20">
          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="flex items-center gap-2">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-semibold">GlobeTrotter</span>
            </Link>
            <nav className="hidden md:flex gap-8 items-center h-full ml-4">
              {navItems.map((item) => {
                const isActive = currentPath === item.path || (item.path !== '/dashboard' && currentPath.startsWith(item.path));
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`font-label-md text-label-md transition-colors scale-95 duration-200 py-1 ${
                      isActive
                        ? 'text-deep-forest font-bold border-b-2 border-terracotta'
                        : 'text-deep-forest/70 hover:text-deep-forest'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-6">
            {/* Search Bar mockup */}
            <div className="relative hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-deep-forest/50 text-[18px]">search</span>
              <input
                className="pl-10 pr-4 py-1.5 rounded-full border border-deep-forest/20 bg-white/50 focus:border-terracotta focus:ring-1 focus:ring-terracotta text-label-sm font-label-sm w-48 transition-all focus:w-60 outline-none text-on-surface"
                placeholder="Search destinations..."
                type="text"
              />
            </div>

            {/* Profile Avatar & Logout */}
            <div className="flex items-center gap-3">
              <Link to="/profile" className="flex items-center gap-2 group">
                <img
                  alt={mockUser.name}
                  className="w-8 h-8 rounded-full object-cover border border-deep-forest/25 group-hover:border-terracotta transition-colors"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlE3ctjkaiq0H3iKPnicCcCyUzqd0d0VY923spFVUBOG5UqbNF5Vlq-4lQjUDAEbpbK210I8uGxwV8MsJZKscSZIPkMOQCDuy-A-uthjQ2VFVS3MAc-2iSeDRs9QlFWKjJGoT7MO6f7_VteU6mpMUZyCGFjxJdhhkWwdRAuDvUSk5jkM-UlyBZucYPzktyQ2_tdajxGGtkqoTNFc0naof9B7UbT8zLNAeDnm5tCXwtvJG0lOObWsFRvg"
                />
                <span className="hidden lg:inline text-label-md text-deep-forest font-semibold">{mockUser.name}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-deep-forest/60 hover:text-error transition-colors flex items-center p-1 rounded-full hover:bg-black/5"
                title="Sign Out"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12 flex flex-col">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation Bar - Mobile Only */}
      <div className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center py-2 md:hidden bg-surface shadow-[0_-4px_12px_rgba(26,58,50,0.06)] border-t border-outline-variant/30">
        {navItems.map((item) => {
          const isActive = currentPath === item.path || (item.path !== '/dashboard' && currentPath.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all active:scale-95 ${
                isActive
                  ? 'bg-primary-container/10 text-primary font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <span className={`material-symbols-outlined mb-0.5 ${isActive ? 'filled' : ''}`} style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                {item.icon}
              </span>
              <span className="font-label-sm text-[11px]">{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Editorial Footer - Hidden on Mobile to prevent layout clutter */}
      <footer className="bg-surface-container-low border-t border-outline-variant/30 mt-20 hidden md:block py-12">
        <div className="w-full px-margin-desktop max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="font-headline-sm text-headline-sm text-primary mb-2 tracking-tight font-semibold">GlobeTrotter</div>
            <p className="font-body-md text-body-md text-on-surface-variant">© 2026 GlobeTrotter Editorial. All journeys curated.</p>
          </div>
          <div className="flex gap-8">
            <a className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-[14px]" href="#privacy">Privacy Policy</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-[14px]" href="#terms">Terms of Service</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-[14px]" href="#guides">Travel Guides</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
