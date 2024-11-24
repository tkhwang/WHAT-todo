"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface AuthLayoutProps {
  children: React.ReactNode
}

function AuthLayout({ children }: AuthLayoutProps) {
  const pathName = usePathname()
  const isSignIn = pathName === "/sign-in"

  return (
    <main className="min-h-screen bg-neutral-100">
      <div className="p-4 mx-auto max-w-screen-2xl">
        <nav className="flex items-center justify-between">
          <Image src="/logo.svg" alt="logo" width={152} height={56} />
          <Button variant="secondary">
            <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
              {isSignIn ? "Sign Up" : "Sign In"}
            </Link>
          </Button>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  )
}

export default AuthLayout
