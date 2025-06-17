import BlogPostItem from "./BlogPostItem";

const BlogPosts = ({ blogPosts, editBlogPost, handleDeleteBlogPost }) => {
  return (
    <div className="grid grid-cols-4 gap-10">
      {blogPosts.map((post) => (
        <BlogPostItem
          key={post._id}
          post={post}
          editBlogPost={editBlogPost}
          handleDeleteBlogPost={handleDeleteBlogPost}
        />
      ))}
    </div>
  );
};

export default BlogPosts;
