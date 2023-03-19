import EditPost from "@/components/EditPost";
import { getPost } from "@/lib/firestore";

export default async function EditPostPage({ params }) {
  const { username, post } = params;
  const postDoc = await getPost(username, post);

  return <EditPost defaultValues={postDoc} />;
}
