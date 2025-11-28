import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home, ChevronRight } from "lucide-react";
import { breadcrumbConfig } from "@/configs/breadcrumbConfig";

/**
 * VA_Breadcrumb — Dynamic breadcrumb generator
 * Uses JSON config for readable route labels.
 */
export default function VA_Breadcrumb() {
  const location = useLocation();
  const pathname = location.pathname;

  // Split and rebuild path hierarchy
  const pathSegments = pathname.split("/").filter(Boolean);
  const paths = pathSegments.map(
    (_, idx) => "/" + pathSegments.slice(0, idx + 1).join("/")
  );

  // Generate breadcrumbs using config
  const crumbs = paths
    .filter((path) => breadcrumbConfig[path]) // Only include configured paths
    .map((path) => ({
      path,
      label: breadcrumbConfig[path].label,
    }));

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex items-center gap-1 text-sm text-muted-foreground">
        {/* 🏠 Always start with Home */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              to="/"
              className="flex items-center gap-1 hover:text-foreground"
            >
              <Home className="h-4 w-4" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* ➡️ Config-based segments */}
        {crumbs.map((crumb, index) => (
          <React.Fragment key={crumb.path}>
            <BreadcrumbSeparator>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              {index === crumbs.length - 1 ? (
                <BreadcrumbPage className="font-medium text-foreground truncate">
                  {crumb.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link
                    to={crumb.path}
                    className="hover:text-foreground truncate"
                  >
                    {crumb.label}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
