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
} from "@/components/ui/navigation-menu";

export function NavigationMenuHome() {
  return (
    <>
      <NavigationMenu >
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger >Acervo</NavigationMenuTrigger>
            <NavigationMenuContent >
              <ul className=" flex flex-col justify-between p-6 w-[100px]  lg:h-[150px]  items-center ">
                <li className="hover:bg-accent w-full h-[30px] flex items-center justify-center rounded-sm">
                  <a
                    className="flex text-sm leading-tight text-muted-foreground"
                    href="/ator"
                  >
                    {" "}
                    Ator{" "}
                  </a>
                </li>

                <li className="hover:bg-accent w-full h-[30px] flex items-center justify-center rounded-sm">
                  <a
                    className="flex text-sm leading-tight text-muted-foreground"
                    href="/diretor"
                  >
                    {" "}
                    Diretor{" "}
                  </a>
                </li>

                <li className="hover:bg-accent w-full h-[30px] flex items-center justify-center rounded-sm">
                  <a
                    className="flex text-sm leading-tight text-muted-foreground"
                    href="/classe"
                  >
                    {" "}
                    Classe{" "}
                  </a>
                </li>

                <li className="hover:bg-accent w-full h-[30px] flex items-center justify-center rounded-sm">
                  <a
                    className="flex text-sm leading-tight text-muted-foreground"
                    href="/titulo"
                  >
                    {" "}
                    Título{" "}
                  </a>
                </li>

                <li className="hover:bg-accent w-full h-[30px] flex items-center justify-center rounded-sm">
                  <a
                    className="flex text-sm leading-tight text-muted-foreground"
                    href="/item"
                  >
                    {" "}
                    Item{" "}
                  </a>
                </li>

              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger >Atendimento a Cliente</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className=" flex flex-col justify-between p-6 lg:w-[190px]  lg:h-[150px]  items-center ">
                
                <li className="hover:bg-accent w-full h-[30px] flex items-center justify-center rounded-sm">
                  <a
                    className="flex text-sm leading-tight text-muted-foreground"
                    href="/cliente"
                  >
                    {" "}
                    Cadastrar Cliente{" "}
                  </a>
                </li>

                <li className="hover:bg-accent w-full h-[30px] flex items-center justify-center rounded-sm">
                  <a
                    className="flex text-sm leading-tight text-muted-foreground"
                    href="/locacao"
                  >
                    {" "}
                    Efetuar Locação{" "}
                  </a>
                </li>
              </ul>

            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            " select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none ">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
