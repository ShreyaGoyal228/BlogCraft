import Link from "next/link";
type IBlog={
  id:string;
  blogTitle:string;
  blogDescription:string;
}
const PostCard = ({blog}:{blog:IBlog}) => {
  return (
    <>
      <div className="card bg-base-100 shadow-xl border">
        <div className="card-body">
          <h2 className="card-title">{blog.blogTitle}</h2>
          <p className="line-clamp-2">{blog.blogDescription}</p>
          <div className="card-actions justify-end">
            <Link href={`/blog/${blog.id}`} className="hover:underlined.t">Read More...</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
