"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

export function buildBeaconHref(pathname: string | null | undefined): string {
  const base = (pathname ?? "/").replace(/\/+$/, "")
  return `${base}/gather`
}

export function BeaconLink({
  className,
  onClick,
  children,
}: {
  className?: string
  onClick?: () => void
  children: ReactNode
}) {
  const pathname = usePathname()
  const href = buildBeaconHref(pathname)
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}
