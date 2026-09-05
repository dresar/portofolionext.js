import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // Protect admin routes
    if (pathname.startsWith("/admin") && !token) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    // Redirect logged in users away from login page
    if (pathname === "/login" && token) {
      return NextResponse.redirect(new URL("/admin", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        // Allow access to login page without token
        if (pathname === "/login") {
          return true
        }
        // Require token for admin routes
        if (pathname.startsWith("/admin")) {
          return !!token
        }
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
