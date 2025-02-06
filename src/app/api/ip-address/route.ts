import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest) => {
    try {
        let ipAddress = request.headers.get('x-forwarded-for')
        const userAgent = request.headers.get('user-agent')

        // IF MULTIPLE IP ADDRESS
        if (ipAddress?.includes(",")) {
            ipAddress = ipAddress?.split(",")[0].trim();
        }

        // HANDLE IPV6 LOOPBACK
        if (ipAddress === "::1" || ipAddress === "127.0.0.1") {
            ipAddress = "localhost";
        }

        const data = {
            ip: ipAddress,
            userAgent,
            appVersion: 'v.2.0.0'
        }
        const responseData = { status: true, message: 'Get IP address success', data }
        return NextResponse.json(responseData, { status: 200 })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const responseData = { status: false, message: 'Get IP address failed', data: null }
        return NextResponse.json(responseData, { status: error.response.status })
    }
}