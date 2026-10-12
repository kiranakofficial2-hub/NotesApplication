import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2, FileText } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";

function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteNote, setDeleteNote] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchNotes = async () => {
    try {
      setLoading(true);

      const response = await api.get("/notes");

      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
      toast.error("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDeleteClick = (note) => {
    setDeleteNote(note);
  };

  const handleDelete = async () => {
    if (!deleteNote) {
      return;
    }

    try {
      setDeleting(true);

      await api.delete(`/notes/${deleteNote._id}`);

      toast.success("Note deleted successfully");

      setDeleteNote(null);

      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-10">

        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Your Notes
          </h1>

         <p className="text-black mt-2 text-lg">
            Keep your thoughts organized
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">

            <span className="loading loading-spinner loading-lg text-indigo-500"></span>

            <p className="text-gray-500 mt-4">
              Loading notes...
            </p>

          </div>
        ) : notes.length === 0 ? (

          /* No Notes */
          <div className="flex flex-col items-center justify-center py-20 text-center">

            <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center mb-5">
              <FileText
                size={40}
                className="text-indigo-500"
              />
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              No notes found
            </h2>

            <p className="text-gray-500 mt-2">
              Create your first note to get started.
            </p>

            <Link
              to="/create"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Create Your First Note
            </Link>

          </div>

        ) : (

          /* Notes Grid */
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

            {notes.map((note) => (
              <div
                key={note._id}
                className="rounded-2xl bg-zinc-50 px-6 shadow-md border border-black/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-800 line-clamp-2">
                  {note.title}
                </h2>

                {/* Content */}
                <p className="mt-3 min-h-20 text-gray-600 leading-relaxed line-clamp-4">
                  {note.content}
                </p>

                {/* Date */}
                <div className="mt-5 border-t border-black-100 pt-4">
                  <p className="text-sm text-gray-400">
                    Created:{" "}
                    {new Date(note.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Buttons */}
                <div className="mt-5 flex justify-end gap-3">

                  {/* Edit */}
                  <Link
                    to={`/edit/${note._id}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <Edit size={16} />
                    Edit
                  </Link>

                  {/* Delete */}
                  <button
                    onClick={() => handleDeleteClick(note)}
                    className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-red-600 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

          <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl">

            <h3 className="text-2xl font-bold text-gray-800">
              Delete Note?
            </h3>

            <p className="py-4 text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-800">
                "{deleteNote.title}"
              </span>
              ?
            </p>

            <p className="text-sm text-gray-500">
              This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">

              {/* Cancel */}
              <button
                className="rounded-xl bg-gray-100 px-5 py-2.5 font-semibold text-gray-700 transition hover:bg-gray-200"
                onClick={() => setDeleteNote(null)}
                disabled={deleting}
              >
                Cancel
              </button>

              {/* Delete */}
              <button
                className="rounded-xl bg-red-500 px-5 py-2.5 font-semibold text-white transition hover:bg-red-600 disabled:opacity-60"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;