import { SignOutButton } from "@clerk/nextjs";

export default function TestPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Hola Mundo</h1>
      <SignOutButton>
        sds
      </SignOutButton>
      <p className="text-gray-700">Esta es una página de ejemplo.</p>
    </div>
  );
}
