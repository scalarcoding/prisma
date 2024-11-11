"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { ProductCategories } from "@/constants/categories/categories";
import { SkeletonImage } from "../../skeletons/SkeletonImage";

export function HomePageNavbar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <Link to="/">
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Home
          </NavigationMenuLink>
        </Link>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {ProductCategories.map((component) => (
                <ListItem
                  key={component.label}
                  title={component.label}
                  href={component.href}
                  to={component.href}
                  image={component.image!}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Orders</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              <ListItem
                key="orders"
                title="Outstanding WR"
                href="/outstandingwr"
                to="/outstandingwr"
                image="/assets/icons/list-search.svg"
              >
                View outstanding Warehouse Requisitions
              </ListItem>
              <ListItem
                key="create"
                title="Create WR"
                href="/createwr"
                to="/createwr"
                image="/assets/icons/square-plus.svg"
              >
                Create Warehouse Requisition from scratch
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  image: string;
  title: string;
  children: React.ReactNode;
  to: string; // `to` prop for react-router Link
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, title, image, to, children, ...props }, ref) => {
    const [isLoading, setIsLoading] = React.useState(true);

    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            to={to}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="category__panel flex flex-row gap-2">
              <div className="category__image bg-slate-300 h-12 w-12 flex-shrink-0 rounded-md p-2">
                {isLoading && <SkeletonImage />}{" "}
                {/* Display SkeletonImage while loading */}
                <img
                  src={image}
                  alt={title}
                  className={`object-cover rounded-md h-full w-full ${
                    isLoading ? "hidden" : ""
                  }`}
                  onLoad={() => setIsLoading(false)} // Hide SkeletonImage after loading
                />
              </div>
              <div className="product__desc">
                <div className="text-sm font-medium leading-none">{title}</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  {children}
                </p>
              </div>
            </div>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);

ListItem.displayName = "ListItem";
