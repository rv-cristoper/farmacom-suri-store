import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  LayoutListIcon,
  MenuIcon,
} from "../../lib/icons";
import { IMenuOption } from "../../models/menu-option";
import { useRenderStore } from "../../store/render";

const menuItems: IMenuOption[] = [
  {
    icon: HomeIcon,
    title: "Inicio",
    href: "/",
  },
  {
    icon: LayoutListIcon,
    title: "Productos",
    href: "/products",
  },
];

export default function Sidebar() {
  const location = useLocation();
  const [
    sidebarIsOpen,
    toggleSidebarIsOpen
  ] = useRenderStore(state => [
    state.sidebarIsOpen,
    state.toggleSidebarIsOpen
  ]);

  return (
    <aside className={`bg-background border-r border-border pt-7 absolute h-screen inset-y-0 left-0 transform overflow-hidden ${sidebarIsOpen ?
      "translate-x-0 w-full md:w-64" :
      "-translate-x-full w-0"} md:relative transition-all duration-200 ease-in-out z-10`}
    >
      <div className="flex justify-between items-start px-4">
        <div className="w-[190px]">
          {/* <img src="/farmacomsuri.png" alt="Logo" />
          <p className="bg-[#386890] text-white text-center font-bold spacin" style={{ letterSpacing: "2px" }}>SURI</p> */}
        </div>
        <button
          onClick={toggleSidebarIsOpen}
          className="focus:outline-none block md:hidden"
        >
          <MenuIcon />
        </button>
      </div>
      <nav className="p-4">
        {menuItems.map((item) => {
          const itemIsSelected = location.pathname === item.href;
          return (
            <div
              key={item.title}
              className="mb-2"
            >
              <Link
                to={item.href}
                className={` text-sm w-full flex items-center justify-between py-2 px-4 transition-all duration-200 focus:outline-none rounded-lg outline-none font-bold ${itemIsSelected ?
                  "bg-background-secondary text-primary" :
                  ""}`}
              >
                <span className="flex items-center gap-2">
                  <item.icon />
                  {item.title}
                </span>
              </Link>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}