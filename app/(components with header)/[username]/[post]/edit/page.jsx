import EditPost from "@/components/EditPost";
import { getPost } from "@/lib/firestore";

export default async function EditPostPage({ params }) {
  const { username, post } = params;
  const postDoc = await getPost(username, post);

  const defaultValues = {
    title: postDoc.postTitle,
    description: postDoc.postDescription,
    coverImg: postDoc.postCover,
    postContent: postDoc.postContent,
  };

  return <EditPost defaultValues={defaultValues} />;
}
