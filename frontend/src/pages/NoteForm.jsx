import React, { useEffect, useState } from "react";
import axios from "../helpers/axios";
import { useNavigate, useParams } from "react-router-dom";

export default function NoteForm() {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [errors, setErrors] = useState([]);

  let { id } = useParams();
  let navigate = useNavigate();

  let submit = async (e) => {
    e.preventDefault();
    let note = {
      title,
      description,
    };

    try {
      let res;
      if (id) {
        res = await axios.patch("/api/notes/" + id, note);
      } else {
        res = await axios.post("/api/notes", note);
      }
      if (res.status === 200) {
        navigate("/");
      }
    } catch (e) {
      setErrors(Object.keys(e.response.data.errors));
    }
  };

  useEffect(() => {
    let fetchNote = async () => {
      if (id) {
        let res = await axios.get("/api/notes/" + id);
        if (res.status === 200) {
          setTitle(res.data.title);
          setDescription(res.data.description);
        }
      }
    };
    fetchNote();
  }, []);

  return (
    <div className="mx-auto max-w-md border-2 border-teal-300 p-4 shadow-lg">
      <h1 className="text-xl text-teal-500 font-bold text-center mb-6">
        Note {id ? "Edit" : "Create"} Form
      </h1>
      <form className="space-y-5" onSubmit={submit}>
        <ul className="list-disc pl-3">
          {!!errors.length &&
            errors.map((error, i) => (
              <li className="text-red-500 text-sm" key={i}>
                {error} is invalid !
              </li>
            ))}
        </ul>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Note Title"
          className="w-full p-2"
        />
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder="Write Note here..."
          className="w-full p-2"
          rows={5}
        />
        <button
          type="submit"
          className="w-full px-3 py-2 rounded-full text-white bg-teal-500"
        >
          {id ? "Edit" : "Create"} Note
        </button>
      </form>
    </div>
  );
}
