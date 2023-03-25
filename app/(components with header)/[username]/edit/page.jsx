import EditUser from "@/components/EditUser";
import { getUserData, getUserIdFromUsername } from "@/lib/firestore";

export default async function Edit({ params }) {
  const userId = await getUserIdFromUsername(params.username);
  const userData = await getUserData(userId);

  return (
    <div className="mx-auto my-auto flex flex-col gap-3 pb-16">
      <h1 className="text-center text-4xl font-extrabold">Welcome!</h1>
      <p className="text-center text-lg">
        We need some information about you to get you started
      </p>
      <EditUser user={userData} />
    </div>
  );
}
