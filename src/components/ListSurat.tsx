"use client";
import axios from "axios";
import { FloatingLabel, Spinner } from "flowbite-react";
import Link from "next/link";
import React, { SyntheticEvent, useEffect, useState } from "react";
import Skeleton from "./Skeleton";

const ListSurat = () => {
  const [surah, setSurah] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/surat`
    );

    const data = await response.data;

    const dataFilter = data.data.filter((item: any) => {
      return item.namaLatin
        .split("-")
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());
    });

    setSurah(dataFilter);

    setLoading(false);
  };

  useEffect(() => {
    const getAllSurat = async () => {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/surat`
      );

      const data = await response.data;

      if (response.status === 200) {
        setSurah(data.data);
      }

      setLoading(false);
    };

    getAllSurat();
  }, []);

  if (loading) return <Skeleton />;

  return (
    <div className="w-full">
      <div className="w-full p-6 sm:p-20 space-y-3">
        <div className="flex justify-center">
          <h1 className="text-xl sm:text-3xl font-bold font-sans text-center">
            بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
          </h1>
        </div>

        <form
          onSubmit={handleSearch}
          className="w-full flex gap-2 justify-between items-center"
        >
          <div className="flex-1">
            <FloatingLabel
              className="w-full"
              variant="standard"
              label="Cari surat..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="p-2 text-sm bg-slate-800 text-white rounded-md"
          >
            Cari
          </button>
        </form>
      </div>
      <div className="w-full grid-cols-1 sm:grid-cols-3 gap-3 grid mt-3">
        {surah?.map((surah: any, index: number) => (
          <Link
            href={`/surat/${surah.nomor}`}
            key={index}
            className="p-3 bg-slate-800 text-white flex justify-between items-center hover:opacity-85 rounded-md"
          >
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-white text-black flex justify-center items-center">
                <h1>{surah.nomor}</h1>
              </div>
              <div>
                <h1 className="font-bold text-xl">{surah.nama}</h1>
                <p className="text-sm">{surah.tempatTurun}</p>
              </div>
            </div>
            <div>
              <h1 className="font-bold text-lg">{surah.namaLatin}</h1>
              <p className="text-sm">{surah.jumlahAyat} Ayat</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListSurat;
