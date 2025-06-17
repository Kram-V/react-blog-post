import axios from "axios";
import { useEffect, useState } from "react";
import BlogPosts from "./components/BlogPosts";

function App() {
  const [blogPosts, setBlogPosts] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  const [searchInput, setSearchInput] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchBlogPosts(searchInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isEdit) {
      axios
        .post("http://localhost:8000/api/blog-posts", { title, description })
        .then((res) => {
          alert("Blog Post Created Successfully");
          fetchBlogPosts();
          setTitle("");
          setDescription("");
        })
        .catch((e) => console.log(e));
    } else {
      axios
        .put("http://localhost:8000/api/blog-posts/" + editData._id, {
          title,
          description,
        })
        .then((res) => {
          alert("Blog Post Updated Successfully");
          fetchBlogPosts();
          handleReset();
        })
        .catch((e) => console.log(e));
    }
  };

  const fetchBlogPosts = (search = "") => {
    axios
      .get("http://localhost:8000/api/blog-posts", { params: { search } })
      .then((res) => {
        setBlogPosts(res.data);
      })
      .catch((e) => console.log(e));
  };

  const editBlogPost = (data) => {
    setIsEdit(true);

    const newData = {
      _id: data._id,
      title: data.title,
      description: data.desription,
    };

    setEditData(newData);

    setTitle(data.title);
    setDescription(data.description);
  };

  const handleDeleteBlogPost = (id) => {
    axios
      .delete("http://localhost:8000/api/blog-posts/" + id)
      .then((res) => {
        alert("Blog Post Successfully Deleted");
        fetchBlogPosts();
      })
      .catch((e) => console.log(e));
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setEditData(null);
    setIsEdit(false);
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  return (
    <div className="p-24">
      <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto mb-6">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search blog post..."
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>

      <form
        className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto my-10"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Title:
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name="name"
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Desription:
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="email"
            required
            rows="4"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          ></textarea>
        </div>

        {!isEdit ? (
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        ) : (
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mb-3"
            >
              Submit
            </button>

            <button
              onClick={handleReset}
              className="w-full bg-gray-600 text-white py-2 rounded  transition"
            >
              Cancel
            </button>
          </div>
        )}
      </form>

      <BlogPosts
        blogPosts={blogPosts}
        editBlogPost={editBlogPost}
        handleDeleteBlogPost={handleDeleteBlogPost}
      />
    </div>
  );
}

export default App;
