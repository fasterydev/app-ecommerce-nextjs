import {
  HeartIcon,
  LifeBuoy,
  LoaderCircleIcon,
  LogOut,
  ShoppingBagIcon,
  User,
  UserCircleIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function DropdownMenuHome() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  if (!isLoaded) {
    return (
      <Button disabled className="text-sm items-center">
        <LoaderCircleIcon className="size-4 animate-spin" />
      </Button>
    );
  }
  if (!user) {
    return (
      <Link href="/auth/sign-in">
        <Button className="text-sm items-center text-center my-auto relative">
          <UserCircleIcon />
          <div>Inicia sesión</div>
        </Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isLoaded ? (
          <Button className="text-sm items-center text-center my-auto relative">
            <UserCircleIcon />
            <div>{user.firstName}</div>
          </Button>
        ) : (
          <Button disabled className="text-sm items-center">
            <LoaderCircleIcon className="size-4 animate-spin" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="xl:w-56 w-48" align="end">
        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/profile")}>
            <User />
            <span>Perfil</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/sales")}>
            <ShoppingBagIcon />
            <span>Mis Pedidos</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/favorites")}>
            <HeartIcon />
            <span>Favoritos</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/support")}>
          <LifeBuoy />
          <span>Soporte</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
