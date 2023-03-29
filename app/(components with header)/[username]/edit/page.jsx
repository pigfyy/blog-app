import EditUser from "@/components/EditUser";
import { getUserData, getUserIdFromUsername } from "@/lib/firestore";

export default async function Edit({ params }) {
  const userId = await getUserIdFromUsername(params.username);
  const userData = await getUserData(userId);

  return (
    <div className="mx-auto my-auto flex w-11/12 max-w-[676px] flex-col gap-3 pb-16">
      <h1 className="text-center text-4xl font-extrabold">Hi!</h1>
      <p className="text-center text-lg">
        Edit your profile and make sure to save your changes!
      </p>
      <EditUser user={userData} />
    </div>
  );
}
