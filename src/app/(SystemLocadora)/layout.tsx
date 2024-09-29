import { NavigationMenuHome } from "./components/navigation-menu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col h-screen">
          <div className="flex shadow-md p-5 items-center justify-center">
            <NavigationMenuHome />
          </div>

          {children}
        </div>
      </body>
    </html>
  );
}
