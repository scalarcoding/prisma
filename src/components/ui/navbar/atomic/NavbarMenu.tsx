import React from "react";
import { Link, useLocation } from "react-router-dom";

interface NavbarMenuProps {
  items: { label: string; path: string }[];
  vertical?: boolean; // Optional prop to determine layout
  onClose?: () => void; // Prop to handle closing
  type?: string;
}

const NavbarMenu: React.FC<NavbarMenuProps> = ({ items, vertical, onClose, type }) => {
  const location = useLocation();

  return (
    <ul className={`list-none ${vertical ? 'flex-col gap-6' : 'inline-flex'} flex`}>
      {items.map(({ label, path }) => (
        <li key={label}>
          <Link
            type={type}
            to={path}
            onClick={onClose} // Close the sheet on click
            className={`relative px-4 py-2 text-sm rounded transition-all duration-300 ease-in-out 
              ${location.pathname === path ? 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-50 ' : 'dark:text-white hover:bg-slate-700 dark:hover:bg-slate-200 dark:hover:text-slate-700 hover:text-white'}`}
          >
            <span className="absolute inset-0 rounded opacity-0 transition-opacity duration-300 hover:opacity-90 " />
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavbarMenu;
