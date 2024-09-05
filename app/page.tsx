import { redirect } from "next/navigation";

export default function HomePage() {
  // Redirect to the explorer page
  redirect("/explorer");
}
