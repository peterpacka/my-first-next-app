import { getUserFromSessionCookie } from "@/utils/getUserFromSessionCookie";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    const session = await getUserFromSessionCookie();

    if (session) {
        return redirect("/");
    }

    return children;
}