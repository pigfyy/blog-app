import { getUserIdFromUsername, getUserData } from "@/lib/firestore";

export default async function Head({ params }) {
  const uid = await getUserIdFromUsername(params.username);
  const userData = await getUserData(uid);

  console.log(userData);

  return (
    <>
      <title>{`${userData.name} | Blog`}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content={userData.bio} />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
