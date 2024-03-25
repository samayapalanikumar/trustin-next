import { cookies } from "next/headers";
import { SERVER_API_URL } from "../constant";
import DashboardLayout from "./dashboard-layout";
import { redirect } from "next/navigation";

async function getData() {
  const cookieStore = cookies();
  const access_token = cookieStore.get("access_token");

  const res = await fetch(`${SERVER_API_URL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token?.value}`,
    },
  });
  const res1 = await fetch(`${SERVER_API_URL}/users/menus`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token?.value}`,
    },
  });

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // console.log(res)
    // throw new Error("Failed to fetch data");
    console.log("error");
  }

  if (res.status === 401) redirect("/signin");
  if (res1.status === 401) redirect("/signin");

  const user = await res.json();
  const menusRes = await res1.json();

  const menus = menusRes.map((menu: { id: number; name: string }) => menu.name);

  return { user, menus };
}

export type UserType = {
  first_name: string;
  id: number;
  phone: string;
  updated_at: string;
  is_active: boolean;
  is_superuser: boolean;
  last_name: string;
  email: string;
  date_joined: string;
  is_staff: false;
  role: string;
};
export type MenuType = string[];

type Data = {
  user: UserType;
  menus: MenuType;
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, menus }: Data = await getData();

  return (
    <DashboardLayout user={user} menus={menus}>
      {children}
    </DashboardLayout>
  );
}
