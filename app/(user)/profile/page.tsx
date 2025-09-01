"use client";

import { UpdateProfileForm } from "@/components/shared/update-profile-form";

export default function ProfilePage() {
  return (
    <main className="flex-1 pb-12 pt-6 ">
      <div className="container mx-auto">
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold sm:text-3xl">Mi Perfil</h1>
          <p>
            Aquí puedes ver y gestionar tu perfil. Actualiza tu información
            personal, preferencias de notificación y más.
          </p>
        </div>
        <UpdateProfileForm />
      </div>
    </main>
  );
}
