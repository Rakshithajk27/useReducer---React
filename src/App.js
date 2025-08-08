import { useReducer, useState } from "react";

const initialState = [
  { id: 1, name: "Alice", email: "alice@gmail.com" },
  { id: 2, name: "Bob", email: "bob@gmail.com" },
];

function reducer(state, action) {
  switch (action.type) {
    case "ADD_USER":
      return [...state, action.payload];
    case "EDIT_USER":
      return state.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
    case "DELETE_USER":
      return state.filter((user) => user.id !== action.payload);
    default:
      return state;
  }
}

export default function App() {
  const [users, dispatch] = useReducer(reducer, initialState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    if (editId) {
      dispatch({
        type: "EDIT_USER",
        payload: { id: editId, name, email },
      });
      setEditId(null);
    } else {
      dispatch({
        type: "ADD_USER",
        payload: { id: Date.now(), name, email },
      });
    }

    setName("");
    setEmail("");
  };

  const handleEdit = (user) => {
    setEditId(user.id);
    setName(user.name);
    setEmail(user.email);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this user?")) {
      dispatch({ type: "DELETE_USER", payload: id });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-xl p-8 bg-white rounded-xl shadow-md border border-gray-200">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          UseReducer CRUD Example
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex gap-3 justify-center mb-6"
        >
          <input
            type="text"
            placeholder="Name"
            className="p-2 border rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            {editId ? "Update" : "Add User"}
          </button>
        </form>

        {/* User List */}
        <h2 className="text-xl font-semibold mb-3">User List</h2>
        <ul className="space-y-3">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between p-3 border rounded-md"
            >
              <span className="font-medium">
                {user.name} <span className="text-gray-500">({user.email})</span>
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
