import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>HomePage of the blog API.</h1>
      <Link href="/login">
        <button>Login</button>
      </Link>
    </div>
  );
}
