import { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "../../data/siteConfig.js";
import "./Navbar.css";

export function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const navRef = useRef(null);
  const location = useLocation();

  const [prevPath, setPrevPath] = useState(location.pathname);

  // Close menus on route change without cascading effect
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setOpenMenu(null);
  }

  // Outside click and Escape key handler
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleDropdown = (label) => {
    setOpenMenu((prev) => (prev === label ? null : label));
  };

  return (
    <nav ref={navRef} className="navbar" aria-label="Main Navigation">
      <ul className="navbar__list">
        {siteConfig.nav.map((item) => {
          const hasChildren = item.children && item.children.length > 0;
          const isDropdownOpen = openMenu === item.label;

          if (hasChildren) {
            return (
              <li
                key={item.label}
                className={`navbar__item navbar__item--has-dropdown ${isDropdownOpen ? "navbar__item--open" : ""}`}
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <div className="navbar__dropdown-trigger-group">
                  {item.to ? (
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `navbar__link ${isActive ? "navbar__link--active" : ""}`
                      }
                    >
                      <span>{item.label}</span>
                    </NavLink>
                  ) : (
                    <span className="navbar__link navbar__link--text">
                      {item.label}
                    </span>
                  )}
                  <button
                    type="button"
                    className="navbar__arrow-btn"
                    aria-expanded={isDropdownOpen}
                    aria-label={`Toggle ${item.label} submenu`}
                    onClick={() => toggleDropdown(item.label)}
                  >
                    <ChevronDown size={14} aria-hidden="true" />
                  </button>
                </div>

                <ul
                  className={`navbar__dropdown ${isDropdownOpen ? "navbar__dropdown--visible" : ""}`}
                  role="menu"
                  aria-label={`${item.label} submenu`}
                >
                  {item.children.map((child) => (
                    <li key={child.label} role="none" className="navbar__dropdown-item">
                      <NavLink
                        to={child.to}
                        role="menuitem"
                        className={({ isActive }) =>
                          `navbar__dropdown-link ${isActive ? "navbar__dropdown-link--active" : ""}`
                        }
                        onClick={() => setOpenMenu(null)}
                      >
                        {child.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            );
          }

          return (
            <li key={item.label} className="navbar__item">
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? "navbar__link--active" : ""}`
                }
              >
                <span>{item.label}</span>
                <span className="navbar__indicator" aria-hidden="true" />
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;
