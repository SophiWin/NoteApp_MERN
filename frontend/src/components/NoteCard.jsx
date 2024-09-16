import React from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import axios from "../helpers/axios";
import { Link } from "react-router-dom";

export default function NoteCard({ note, onDeleted }) {
  let deleteNote = async () => {
    let res = await axios.delete("/api/notes/" + note._id);
    if (res.status === 200) {
      onDeleted(note._id);
    }
  };
  return (
    <div className="bg-white rounded-lg p-5 space-y-3  border-t-2 border-teal-300 ">
      <div className=" mb-6">
        <h3 className="text-2xl text-teal-500 font-bold mb-3 text-center">
          {note.title}
        </h3>
        <p>Your note here ...</p>
        <p>{note.description}</p>
      </div>

      <div className="flex items-center justify-between gap-2 border-t-2 border-gray-300 ">
        <p className="text-gray-500">Posted at - {note.createdAt}</p>
        <div className="flex items-center gap-2 cursor-pointer">
          <TrashIcon
            width={20}
            className="text-red-500  hover:scale-105"
            onClick={deleteNote}
          />
          <Link to={`/notes/edit/${note._id}`}>
            <PencilSquareIcon
              width={20}
              className="text-teal-500  hover:scale-105"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
