import React, { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import Pagination from "../components/Pagination";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "../helpers/axios";

export default function Home() {
  let [notes, setNotes] = useState([]);
  let [links, setLinks] = useState(null);
  let location = useLocation();
  let navigate = useNavigate();
  let searchQuery = new URLSearchParams(location.search);
  let page = searchQuery.get("page");
  page = parseInt(page) ? parseInt(page) : 1;

  useEffect(() => {
    let fetchNotes = async () => {
      let res = await axios("/api/notes?page=" + page);
      if (res.status === 200) {
        let data = res.data;

        setLinks(data.links);
        setNotes(data.data);

        window.scroll({ top: 0, left: 0, behavior: "smooth" });
      }
    };
    fetchNotes();
  }, [page]);

  let onDeleted = (_id) => {
    if (notes.length === 1 && page > 1) {
      navigate("/?page=" + (page - 1));
    } else {
      setNotes((prev) => prev.filter((n) => n._id !== _id));
    }
  };
  return (
    <>
      <div className="grid grid-cols-2  md:grid-cols-4 gap-3 my-7 max-w-8xl mx-auto p-4">
        {!!notes.length &&
          notes.map((note) => (
            <NoteCard note={note} key={note._id} onDeleted={onDeleted} />
          ))}
      </div>
      <div className="w-1/2 mx-auto flex justify-center">
        {!!links && <Pagination links={links} page={page || 1} />}
      </div>
    </>
  );
}
