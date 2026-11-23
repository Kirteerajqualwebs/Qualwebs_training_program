import { Suspense } from "react";

async function User() {
  const response = await fetch("https://randomuser.me/api/?results=10");

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  const users = await response.json();

  return (
    <div>
      {users.results.map((user) => {
       return <div key={user.login.uuid}>
          <p>
            {user.name.first} {user.name.last}
          </p>
          <p>{user.email}</p>
        </div>;
      })}
    </div>
  );
}
export default function Home() {
  return (
    <>
      <h1>Welcome to Next.js</h1>
      <Suspense fallback={<p>Loading....</p>}>
      <User/>
      </Suspense>
    </>
  );
}
