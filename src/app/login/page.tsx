import { redirect } from "next/navigation";

export const metadata = { title: "Login · Lara Dam" };

export default function LoginRedirect() {
  redirect("/admin");
}
