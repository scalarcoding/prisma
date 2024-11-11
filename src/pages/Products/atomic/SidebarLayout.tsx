import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ProductsSidebar } from "./ProductsSidebar"

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ProductsSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
