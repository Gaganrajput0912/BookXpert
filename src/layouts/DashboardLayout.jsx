import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuth } from "../features/auth/authSlice";
import { LogOut, LayoutDashboard, Users, User, Menu, X } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(selectAuth);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="h-screen w-full bg-gray-50 flex overflow-hidden">
      {/* Sidebar - Fixed Height */}
      <aside
        className={clsx(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 shadow-sm transition-transform duration-300 transform h-full flex flex-col",
          isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0 lg:w-20 xl:w-64"
        )}
      >
        <div className="h-full flex flex-col">
          <div className="h-16 flex-shrink-0 flex items-center justify-center border-b border-gray-50">
            <div className="flex items-center gap-2 font-bold text-xl text-primary-600">
              <Users className="w-6 h-6" />
              <span
                className={clsx(
                  "transition-opacity duration-300",
                  !isSidebarOpen && "lg:hidden xl:block"
                )}
              >
                Emp.Dash
              </span>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
            <div className="flex items-center gap-3 px-4 py-3 bg-primary-50 text-primary-700 rounded-lg cursor-pointer">
              <LayoutDashboard size={20} />
              <span className={clsx(!isSidebarOpen && "lg:hidden xl:block")}>
                Dashboard
              </span>
            </div>
          </nav>

          <div className="p-4 border-t border-gray-50 flex-shrink-0">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span className={clsx(!isSidebarOpen && "lg:hidden xl:block")}>
                Logout
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        {/* Header */}
        <header className="h-16 flex-shrink-0 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-40">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                {user?.name?.charAt(0) || "U"}
              </div>
              <span className="text-sm font-medium text-gray-700 hidden md:block">
                {user?.name}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content - No Padding on container, let page handle it */}
        <main className="flex-1 overflow-hidden relative">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
