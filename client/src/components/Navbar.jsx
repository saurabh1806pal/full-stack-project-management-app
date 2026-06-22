import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/authCreateContext";

// ─── Notion SVG Logo ──────────────────────────────────────────────────────────
const NotionIcon = () => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 shrink-0"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M6.017 4.313l55.333-4.087c6.797-.583 8.543-.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277-1.553 6.807-6.99 7.193L24.467 99.967c-4.08.193-6.023-.39-8.16-3.113L3.3 79.94c-2.333-3.113-3.3-5.443-3.3-8.167V11.113c0-3.497 1.553-6.413 6.017-6.8z" />
    <path
      fill="white"
      d="M61.35.227L6.017 4.313C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257-3.89c5.433-.387 6.99-2.917 6.99-7.193V18.64c0-2.21-.847-2.847-3.267-4.733L74.167 3.143C69.893.037 68.147-.357 61.35.227zM25.92 19.523c-5.247.353-6.437.433-9.417-1.99L8.927 11.507c-.77-.78-.383-1.753.967-1.947l53.8-3.887c4.467-.383 6.793 1.167 8.54 2.527l9.123 6.61c.39.197 1.36 1.36.193 1.36l-54.83 3.353zM19.973 88.943V30.883c0-2.53.777-3.697 3.103-3.893L86 23.163c2.14-.193 3.107 1.167 3.107 3.69v57.667c0 2.53-.97 4.277-3.883 4.473l-60.66 3.5c-2.917.193-4.59-.97-4.59-3.55zm59.3-54.253c.387 1.75 0 3.5-1.75 3.7l-2.91.577v42.773c-2.527 1.36-4.853 2.137-6.797 2.137-3.107 0-3.883-.97-6.21-3.887l-19.03-29.94v28.967l6.02 1.363s0 3.5-4.857 3.5l-13.39.777c-.39-.777 0-2.72 1.357-3.11l3.497-.97V40.667L29.48 40.1c-.39-1.75.58-4.277 3.3-4.473l14.367-.967 19.8 30.327v-26.83l-5.047-.58c-.39-2.143 1.163-3.7 3.103-3.89l13.27-.793z"
    />
  </svg>
);

// ─── Nav link config ──────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Workspaces", to: "/workspaces" },
  { label: "Tasks",      to: "/tasks"      },
  { label: "Members",    to: "/members"    },
];

// ─── Active-aware class builder for <NavLink> ─────────────────────────────────
const navLinkClass = ({ isActive }) =>
  [
    "relative text-sm font-medium tracking-wide transition-colors duration-200",
    "after:absolute after:left-0 after:-bottom-0.5 after:h-px after:transition-all after:duration-300",
    isActive
      ? "text-neutral-950 after:w-full after:bg-neutral-950"
      : "text-neutral-500 hover:text-neutral-950 after:w-0 after:bg-neutral-900 hover:after:w-full",
  ].join(" ");

// ─── Navbar ───────────────────────────────────────────────────────────────────
export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-14 flex items-center justify-between gap-8">

        {/* Left — Logo (Link prevents full page reload) */}
        <Link
          to="/"
          className="flex items-center gap-2 text-neutral-950 select-none shrink-0"
          aria-label="Notion home"
        >
          <NotionIcon />
          <span className="font-bold text-[15px] tracking-tight leading-none">NOTION</span>
        </Link>

        {/* Center — Nav links (NavLink tracks active route, no re-render on click) */}
        <div className="flex items-center gap-7">
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink key={to} to={to} className={navLinkClass}>
              {label}
            </NavLink>
          ))}
        </div>

        {/* Right — Auth (conditional on user from context) */}
        <div className="flex items-center gap-2 shrink-0">
          {user ? (
            <>
              {/* Online indicator + display name */}
              <span className="flex items-center gap-1.5 text-sm text-neutral-500 mr-1 select-none">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
                {user.name ?? user.email ?? "Account"}
              </span>

              {/* Log out — plain button, calls your auth handler */}
              <button
                onClick={logout}
                className="px-3 py-1.5 text-sm font-semibold rounded-lg text-red-600
                           hover:bg-red-50 border border-transparent hover:border-red-200
                           transition-all duration-200 cursor-pointer"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              {/* Log in — Link so router handles navigation, no reload */}
              <Link
                to="/login"
                className="px-3 py-1.5 text-sm font-semibold rounded-lg text-neutral-600
                           hover:text-neutral-950 hover:bg-neutral-100 border border-transparent
                           hover:border-neutral-200 transition-all duration-200"
              >
                Log in
              </Link>

              {/* Sign up — Link so router handles navigation, no reload */}
              <Link
                to="/register"
                className="px-3 py-1.5 text-sm font-semibold rounded-lg bg-neutral-950
                           text-white hover:bg-neutral-700 shadow-sm hover:shadow-md
                           transition-all duration-200"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}