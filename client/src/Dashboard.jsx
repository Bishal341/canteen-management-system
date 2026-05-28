import { useEffect, useState } from "react";
import API from "./API/API";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  Plus,
  Bell,
  LayoutGrid,
  ChevronDown,
  User,
  Settings,
  HelpCircle,
  LogOut,
  CreditCard,
  Shield,
  MessageSquare,
  BookOpen,
  BarChart2,
  Zap,
  UtensilsCrossed,
  Home,
  ShoppingCart,
  Package,
  Users,
  ClipboardList,
  TrendingUp,
  Tag,
  Truck,
  ChevronRight,
  Coffee,
  Star,
  AlertCircle,
  DollarSign,
} from "lucide-react";

const sidebarSections = [
  {
    title: "Main",
    items: [
      { icon: Home, label: "Dashboard", active: true, badge: null },
      { icon: ShoppingCart, label: "Orders", badge: "12" },
      { icon: ClipboardList, label: "Menu Management", badge: null },
      {
        icon: Package,
        label: "Inventory",
        badge: "3",
        badgeColor: "bg-red-500",
      },
    ],
  },
  {
    title: "People",
    items: [
      { icon: Users, label: "Staff", badge: null },
      { icon: User, label: "Customers", badge: null },
      { icon: Star, label: "Feedback", badge: "5" },
    ],
  },
  {
    title: "Finance",
    items: [
      { icon: DollarSign, label: "Revenue", badge: null },
      { icon: TrendingUp, label: "Reports", badge: null },
      { icon: CreditCard, label: "Payments", badge: null },
      { icon: Tag, label: "Discounts", badge: null },
    ],
  },
  {
    title: "Operations",
    items: [
      { icon: Truck, label: "Suppliers", badge: null },
      {
        icon: AlertCircle,
        label: "Alerts",
        badge: "2",
        badgeColor: "bg-amber-500",
      },
      { icon: Settings, label: "Settings", badge: null },
    ],
  },
];

const stats = [
  {
    label: "Today's Orders",
    value: "148",
    change: "+12%",
    color: "from-orange-400 to-amber-500",
    icon: ShoppingCart,
  },
  {
    label: "Revenue",
    value: "Rs 24,560",
    change: "+8%",
    color: "from-emerald-400 to-teal-500",
    icon: DollarSign,
  },
  {
    label: "Items Sold",
    value: "392",
    change: "+5%",
    color: "from-blue-400 to-indigo-500",
    icon: UtensilsCrossed,
  },
  {
    label: "Low Stock",
    value: "3 Items",
    change: "Urgent",
    color: "from-red-400 to-rose-500",
    icon: AlertCircle,
  },
];

const recentOrders = [
  {
    id: "#1042",
    item: "Chicken Momo",
    qty: 2,
    amount: "Rs 240",
    status: "Served",
    time: "2 min ago",
  },
  {
    id: "#1041",
    item: "Veg Thali",
    qty: 1,
    amount: "Rs 120",
    status: "Preparing",
    time: "5 min ago",
  },
  {
    id: "#1040",
    item: "Masala Tea",
    qty: 4,
    amount: "Rs 80",
    status: "Served",
    time: "8 min ago",
  },
  {
    id: "#1039",
    item: "Buff Burger",
    qty: 1,
    amount: "Rs 180",
    status: "Pending",
    time: "12 min ago",
  },
  {
    id: "#1038",
    item: "Dal Bhat Set",
    qty: 3,
    amount: "Rs 450",
    status: "Served",
    time: "18 min ago",
  },
];

const popularItems = [
  { name: "Chicken Momo", sold: 84, revenue: "Rs 10,080", img: "🥟" },
  { name: "Veg Thali", sold: 61, revenue: "Rs 7,320", img: "🍱" },
  { name: "Masala Tea", sold: 120, revenue: "Rs 2,400", img: "☕" },
  { name: "Buff Burger", sold: 45, revenue: "Rs 8,100", img: "🍔" },
];

const statusColor = {
  Served: "bg-emerald-100 text-emerald-700",
  Preparing: "bg-amber-100 text-amber-700",
  Pending: "bg-red-100 text-red-700",
};

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [user, setUser] = useState(null);
  const greeting = getGreeting();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/profile");
        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch profile: ", err);
      }
    };
    fetchProfile();
  }, []);

  const handlelogout = () => {
    sessionStorage.removeItem("token");
    setProfileOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("[data-dropdown]")) {
        setProfileOpen(false);
        setAppsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      {/* ── SIDEBAR ── */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0 lg:w-16"
        } transition-all duration-300 ease-in-out flex-shrink-0 bg-gradient-to-b from-orange-600 to-amber-700 flex flex-col overflow-hidden z-30 shadow-2xl`}
      >
        {/* Sidebar Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-orange-500/40">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <UtensilsCrossed className="w-5 h-5 text-white" />
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <p className="text-white font-bold text-sm leading-tight whitespace-nowrap">
                Canteen Pro
              </p>
              <p className="text-orange-200 text-xs whitespace-nowrap">
                Management System
              </p>
            </div>
          )}
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-5 scrollbar-hide">
          {sidebarSections.map((section) => (
            <div key={section.title}>
              {sidebarOpen && (
                <p className="text-orange-300 text-xs font-semibold uppercase tracking-widest px-3 mb-2">
                  {section.title}
                </p>
              )}
              <ul className="space-y-0.5">
                {section.items.map(
                  ({
                    icon: Icon,
                    label,
                    badge,
                    badgeColor = "bg-orange-300",
                  }) => {
                    const isActive = activeItem === label;
                    return (
                      <li key={label}>
                        <button
                          onClick={() => setActiveItem(label)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group
                          ${
                            isActive
                              ? "bg-white/20 text-white shadow-inner"
                              : "text-orange-100 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-white" : "text-orange-200 group-hover:text-white"}`}
                          />
                          {sidebarOpen && (
                            <>
                              <span className="flex-1 text-sm font-medium text-left whitespace-nowrap">
                                {label}
                              </span>
                              {badge && (
                                <span
                                  className={`text-xs text-white font-bold px-1.5 py-0.5 rounded-full ${badgeColor}`}
                                >
                                  {badge}
                                </span>
                              )}
                            </>
                          )}
                        </button>
                      </li>
                    );
                  },
                )}
              </ul>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        {sidebarOpen && (
          <div className="px-4 py-4 border-t border-orange-500/40">
            <div className="bg-white/10 rounded-xl p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Coffee className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white text-xs font-semibold">
                  {user ? user.username : "loading..."}
                </p>
                <p className="text-orange-200 text-xs">{user ? user.email : "loading..."}</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* ── NAVBAR ── */}
        <header className="bg-white border-b border-gray-200 shadow-sm z-20 flex-shrink-0">
          <nav className="px-4 lg:px-6 py-3">
            <div className="flex items-center justify-between">
              {/* Left */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 text-gray-500 rounded-lg hover:text-orange-600 hover:bg-orange-50 transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>

                <div className="hidden lg:flex items-center gap-1 text-sm text-gray-400">
                  <span className="text-orange-600 font-semibold">
                    Canteen Pro
                  </span>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-gray-700 font-medium">
                    {activeItem}
                  </span>
                </div>

                {/* Search */}
                <div className="hidden lg:block ml-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search orders, items, staff…"
                      className="bg-gray-50 border border-gray-200 text-sm rounded-xl pl-9 pr-4 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-1.5">
                {/* Add Order */}
                <button className="hidden sm:inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors shadow-sm">
                  <Plus className="w-4 h-4" />
                  New Order
                </button>

                {/* Bell */}
                <div className="relative">
                  <button className="p-2 text-gray-500 rounded-xl hover:text-orange-600 hover:bg-orange-50 transition-colors">
                    <Bell className="w-5 h-5" />
                  </button>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </div>

                {/* Apps Grid */}
                <div className="relative" data-dropdown>
                  <button
                    onClick={() => {
                      setAppsOpen(!appsOpen);
                      setProfileOpen(false);
                    }}
                    className="p-2 text-gray-500 rounded-xl hover:text-orange-600 hover:bg-orange-50 transition-colors"
                  >
                    <LayoutGrid className="w-5 h-5" />
                  </button>

                  {appsOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                          Quick Access
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-1 p-3">
                        {[
                          {
                            icon: User,
                            label: "Profile",
                            color: "text-blue-500 bg-blue-50",
                          },
                          {
                            icon: CreditCard,
                            label: "Payments",
                            color: "text-emerald-500 bg-emerald-50",
                          },
                          {
                            icon: BarChart2,
                            label: "Analytics",
                            color: "text-violet-500 bg-violet-50",
                          },
                          {
                            icon: MessageSquare,
                            label: "Messages",
                            color: "text-amber-500 bg-amber-50",
                          },
                          {
                            icon: Shield,
                            label: "Security",
                            color: "text-red-500 bg-red-50",
                          },
                          {
                            icon: BookOpen,
                            label: "Docs",
                            color: "text-cyan-500 bg-cyan-50",
                          },
                          {
                            icon: Settings,
                            label: "Settings",
                            color: "text-gray-500 bg-gray-50",
                          },
                          {
                            icon: Zap,
                            label: "Integrations",
                            color: "text-orange-500 bg-orange-50",
                          },
                          {
                            icon: LogOut,
                            label: "Logout",
                            color: "text-rose-500 bg-rose-50",
                          },
                        ].map(({ icon: Icon, label, color }) => (
                          <a
                            key={label}
                            href="#"
                            className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                          >
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900">
                              {label}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile */}
                <div className="relative" data-dropdown>
                  <button
                    onClick={() => {
                      setProfileOpen(!profileOpen);
                      setAppsOpen(false);
                    }}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-orange-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                      <User className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="hidden md:block text-sm font-semibold text-gray-700">
                      {user ? user.username : "loading"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-100 bg-orange-50">
                        <p className="text-sm font-bold text-gray-900">
                          {user ? user.username : "loading..."}
                        </p>
                        <p className="text-xs text-gray-500">
                          {user ? user.email : "loading..."}
                        </p>
                      </div>
                      <ul className="py-1">
                        {[
                          { icon: User, label: "My Profile" },
                          { icon: CreditCard, label: "Payment Methods" },
                          { icon: Settings, label: "Settings" },
                          { icon: HelpCircle, label: "Help & Support" },
                        ].map(({ icon: Icon, label }) => (
                          <li key={label}>
                            <a
                              href="#"
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors"
                            >
                              <Icon className="w-4 h-4 text-gray-400" />
                              {label}
                            </a>
                          </li>
                        ))}
                      </ul>
                      <div className="border-t border-gray-100 py-1">
                        <button
                          onClick={handlelogout}
                          className="flex items-center w-full gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </header>

        {/* ── PAGE CONTENT ── */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Page heading */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {greeting}, {user ? user.username : " "}!
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Here's what's happening at your canteen today.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {stats.map(({ label, value, change, color, icon: Icon }) => (
              <div
                key={label}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 overflow-hidden relative"
              >
                <div
                  className={`absolute -right-4 -top-4 w-20 h-20 rounded-full bg-gradient-to-br ${color} opacity-10`}
                />
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <p className="text-sm text-gray-500 mt-0.5">{label}</p>
                <span
                  className={`text-xs font-semibold mt-2 inline-block px-2 py-0.5 rounded-full
                  ${change.includes("+") ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}
                >
                  {change}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            {/* Recent Orders */}
            <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">Recent Orders</h2>
                <button className="text-orange-500 text-sm font-medium hover:underline">
                  View all
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "Order ID",
                        "Item",
                        "Qty",
                        "Amount",
                        "Status",
                        "Time",
                      ].map((h) => (
                        <th
                          key={h}
                          className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {recentOrders.map((o) => (
                      <tr
                        key={o.id}
                        className="hover:bg-orange-50/40 transition-colors"
                      >
                        <td className="px-6 py-3.5 font-semibold text-orange-600">
                          {o.id}
                        </td>
                        <td className="px-6 py-3.5 text-gray-800 font-medium">
                          {o.item}
                        </td>
                        <td className="px-6 py-3.5 text-gray-500">{o.qty}</td>
                        <td className="px-6 py-3.5 text-gray-800 font-semibold">
                          {o.amount}
                        </td>
                        <td className="px-6 py-3.5">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor[o.status]}`}
                          >
                            {o.status}
                          </span>
                        </td>
                        <td className="px-6 py-3.5 text-gray-400 text-xs">
                          {o.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Popular Items */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">Popular Items</h2>
                <button className="text-orange-500 text-sm font-medium hover:underline">
                  See menu
                </button>
              </div>
              <ul className="divide-y divide-gray-50">
                {popularItems.map((item, i) => (
                  <li
                    key={item.name}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-orange-50/40 transition-colors"
                  >
                    <span className="text-2xl">{item.img}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {item.sold} sold today
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-emerald-600">
                        {item.revenue}
                      </p>
                      <p className="text-xs text-gray-400">#{i + 1} top</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>


    </div>
  );
};

export default Dashboard;