"use client";
import axios from "axios";
import { Spinner } from "flowbite-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const DetailSurat = ({ nomor }: any) => {
  const [loading, setLoading] = useState(true);
  const [surat, setSurat]: any = useState([]);

  useEffect(() => {
    const getDetailSurat = async () => {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/surat/${nomor}`
      );
      const data = await response.data;

      if (data.code === 200) {
        setSurat(data.data);
      }

      setLoading(false);
    };

    getDetailSurat();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center p-10">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-3">
      <div className="flex justify-center w-full py-10">
        <div className="text-center space-y-2">
          <h1 className="font-bold text-xl  sm:text-4xl flex items-center gap-3 justify-center">
            <span>{surat?.namaLatin}</span> <span>-</span>{" "}
            <span> {surat?.nama}</span>
          </h1>
          <div className="flex justify-center">
            <ul className="text-sm list-disc text-start">
              <li>Arti : {surat?.arti}</li>
              <li>Tempat turun : {surat?.tempatTurun}</li>
              <li>Jumlah ayat : {surat?.jumlahAyat}</li>
            </ul>
          </div>
          <audio src={`${surat?.audioFull["05"]}`} controls />
        </div>
      </div>
      <div className="w-full my-10 flex justify-between">
        {surat?.suratSebelumnya && (
          <Link
            href={`/surat/${surat?.suratSebelumnya?.nomor}`}
            className="p-3 bg-slate-800 text-white rounded-md disabled:cursor-not-allowed disabled:opacity-85"
          >
            Surat Sebelumnya
          </Link>
        )}
        {surat?.suratSelanjutnya && (
          <Link
            href={`/surat/${surat?.suratSelanjutnya?.nomor}`}
            className="p-3 bg-slate-800 text-white rounded-md disabled:cursor-not-allowed disabled:opacity-85"
          >
            Surat Selanjutnya
          </Link>
        )}
      </div>
      <div className="w-full grid grid-cols-1 gap-3">
        {surat?.ayat?.map((ayat: any, index: number) => (
          <div
            key={index}
            className="w-full p-3 rounded-md bg-slate-800 text-white flex justify-between gap-3 flex-col sm:flex-row"
          >
            <div className="flex-1 flex gap-3 sm:flex-row flex-col">
              <div className="w-10 h-10 rounded-full bg-white text-slate-800 flex justify-center items-center font-bold">
                {ayat?.nomorAyat}
              </div>
              <div className="flex-1 space-y-2">
                <p className="text-sm text-slate-500">{ayat?.teksIndonesia}</p>
              </div>
            </div>
            <div className="flex-1 space-y-2 text-end">
              <h1 className="text-2xl font-semibold">{ayat?.teksArab}</h1>
              <h1 className="text-sm text-slate-500">{ayat?.teksLatin}</h1>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full my-10 flex justify-between">
        <Link href={"/"} className="p-3 bg-slate-800 text-white rounded-md">
          Back to Home
        </Link>
        <Link href={"#"} className="p-3 bg-slate-800 text-white rounded-md">
          Back to Top
        </Link>
      </div>
    </div>
  );
};

export default DetailSurat;
