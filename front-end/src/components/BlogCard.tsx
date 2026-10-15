import { Link } from "react-router-dom";
import type { BlogPost } from "../types/blog";

interface BlogCardProps {
  post: BlogPost;
}

function BlogCard({ post }: BlogCardProps) {
  const coverImage = post.cover_image_url || post.image;

  const dateValue = post.published_at || post.created_at;
  const parsedDate = new Date(dateValue);

  const formattedDate = Number.isNaN(parsedDate.getTime())
    ? "تاریخ نامشخص"
    : parsedDate.toLocaleDateString("fa-IR");
  return (
    <Link
      to={`/blog/${post.id}`}
      className="group block h-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl"
    >
      <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl">
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <img
            src={coverImage}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <span className="absolute right-4 top-4 rounded-full bg-slate-950/80 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
            {post.category}
          </span>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span>
              {formattedDate}
            </span>
            <span className="h-1 w-1 rounded-full bg-orange-400" />
            <span>{post.read_time} دقیقه مطالعه</span>
          </div>

          <h2 className="mt-4 text-xl font-extrabold leading-relaxed text-slate-900 transition group-hover:text-orange-600">
            {post.title}
          </h2>

          <p className="mt-3 line-clamp-3 text-sm leading-8 text-slate-600">
            {post.excerpt}
          </p>

          <div className="mt-5 flex items-center gap-2 text-sm font-bold text-orange-600">
            <span>ادامه مطلب</span>
            <span aria-hidden="true">←</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default BlogCard;
