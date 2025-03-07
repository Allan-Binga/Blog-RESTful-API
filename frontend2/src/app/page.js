import Link from "next/link";
import Topbar from "@/components/Topbar";

export default function Home() {
  return (
    <div>
      <Topbar />
      <h1>HomePage of the blog API.</h1>
      <Link href="/login">
        <button>Login</button>
      </Link>
    </div>
  );
}
