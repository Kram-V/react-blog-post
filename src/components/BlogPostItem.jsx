import React from "react";

const BlogPostItem = ({ post, editBlogPost, handleDeleteBlogPost }) => {
  return (
    <div className="shadow-md p-4 rounded bg-white">
      <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
      <p>{post.description}</p>

      <div className="flex space-x-2 mt-6">
        <button
          onClick={() => editBlogPost(post)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteBlogPost(post._id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlogPostItem;
