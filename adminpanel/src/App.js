import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [content, setContent] = useState([]);
  const [form, setForm] = useState({ section: '', title: '', description: '', image: '' });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios.get('https://dynamic-content-page.onrender.com/api/content').then(res => setContent(res.data));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { section: form.section, title: form.title, description: form.description, image: form.image };

    if (editId) {
      axios
        .post(`http://localhost:5000/api/content`, { ...payload, _id: editId })
        .then(() => {
          setContent(content.map(item => (item._id === editId ? { ...item, ...payload } : item)));
          alert('Content updated!');
          resetForm();
        })
        .catch(err => console.error(err));
    } else {
      axios
        .post(`http://localhost:5000/api/content`, payload)
        .then(res => {
          setContent([...content, { ...res.data, ...payload }]);
          alert('Content added!');
          resetForm();
        })
        .catch(err => console.error(err));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      axios.delete(`https://dynamic-content-page.onrender.com/api/content/${id}`)
        .then(() => {
          setContent(content.filter(item => item._id !== id));
          alert('Content deleted successfully!');
        })
        .catch(err => console.error(err));
    }
  };

  const startEdit = (item) => {
    setForm({ section: item.section, title: item.title, description: item.description, image: item.image });
    setEditId(item._id);
    setEditing(true);
  };

  const resetForm = () => {
    setForm({ section: '', title: '', description: '', image: '' });
    setEditId(null);
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Admin Panel</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <div className="mb-4">
          <label htmlFor="section" className="block text-gray-700 font-medium mb-2">Section</label>
          <input
            id="section"
            name="section"
            type="text"
            value={form.section}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Section"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Title"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Description"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-medium mb-2">Image URL</label>
          <input
            id="image"
            name="image"
            type="text"
            value={form.image}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Image URL"
          />
        </div>

        <div className="flex items-center space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {editing ? 'Update' : 'Save'}
          </button>
          {editing && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="text-2xl font-bold mt-8 text-gray-800">Existing Content</h2>
      <ul className="w-full max-w-4xl mt-4 space-y-4">
        {content.map(item => (
          <li key={item._id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
              {item.image && (
                <img src={item.image} alt={item.title} className="mt-2 max-w-xs rounded" />
              )}
            </div>
            <div className="space-y-2">
              <button
                onClick={() => startEdit(item)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
