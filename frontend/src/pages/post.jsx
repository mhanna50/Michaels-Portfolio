import React from "react";
import { useParams, Link } from "react-router-dom";
import { getPostBySlug } from "../utils/loadposts";

export default function Post() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) return <p>Sorry, that story isn&apos;t available.</p>;

  return (
    <article className="max-w-3xl mx-auto py-12 px-6">
      <Link to="/blog" className="text-blue-500 hover:underline">← Back to Blog</Link>
      <h1 className="text-4xl font-bold mt-4 mb-2">{post.title}</h1>
      <p className="text-gray-500 mb-8">{post.date}</p>
      <div
        className="prose prose-lg"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
