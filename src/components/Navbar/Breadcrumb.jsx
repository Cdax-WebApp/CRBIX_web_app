import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../Profile/ThemeContext";

export default function Breadcrumb() {
  const { pathname } = useLocation();
  const { getAppliedTheme } = useTheme();

  // Hide breadcrumb on home page or dashboard
  if (pathname === "/" || pathname === "/dashboard") {
    return null;
  }

  const appliedTheme = getAppliedTheme();
  const isDark = appliedTheme === "dark";

  const routeHierarchy = {
    "/profile": ["Home", "Profile"],
    "/settings": ["Home", "Profile", "Setting"],
    "/certifications": ["Home", "Profile", "Certifications"],
    "/placement": ["Home", "Profile", "Placement"],
    "/my-courses": ["Home", "Profile", "My Courses"],
    "/settings/display-theme": ["Home", "Profile", "Setting", "Display Theme"],
  };

  const path = pathname.toLowerCase();
  const crumbs = routeHierarchy[path] ||
    ["Home"].concat(
      pathname
        .split("/")
        .filter(Boolean)
        .map((p) => p.replace(/-/g, " "))
    );

  return (
    <>
      <style>{`
        .breadcrumb-wrapper {
          position: relative;
          z-index: 10;
          padding: 12px 20px;
          font-size: 14px;
          background: ${isDark ? "#111827" : "#eaf9ff"};
          border-bottom: 1px solid ${isDark ? "#374151" : "#e5e7eb"};
          border-top: 4px solid ${isDark ? "rgba(255,255,255,0.15)" : "#ffffff"};
        }

        .breadcrumb a {
          color: ${isDark ? "#60a5fa" : "#2563eb"};
          text-decoration: none;
          margin-right: 6px;
        }

        .breadcrumb a:hover {
          text-decoration: underline;
        }

        .breadcrumb span {
          color: ${isDark ? "#9ca3af" : "#6b7280"};
          margin-right: 6px;
        }

        .breadcrumb .active {
          font-weight: 500;
          color: ${isDark ? "#f9fafb" : "#111827"};
        }
      `}</style>

      <div className="breadcrumb-wrapper">
        <nav className="breadcrumb">
          {crumbs.map((label, index) => {
            const isLast = index === crumbs.length - 1;
            const to = index === 0 ? "/" : "/" +
              crumbs
                .slice(1, index + 1)
                .map((c) => c.toLowerCase().replace(/\s+/g, "-"))
                .join("/");

            return isLast ? (
              <span key={to} className="active">
                {index !== 0 && " / "}
                {label}
              </span>
            ) : (
              <span key={to}>
                {index !== 0 && " / "}
                <Link to={to}>{label}</Link>
              </span>
            );
          })}
        </nav>
      </div>
    </>
  );
}