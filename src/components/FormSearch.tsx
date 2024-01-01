"use client";
import { FloatingLabel } from "flowbite-react";
import React from "react";

const FormSearch = () => {
  return (
    <div className="w-full p-6 sm:p-20">
      <form action="" className="w-full">
        <FloatingLabel
          variant="filled"
          label="Cari surat..."
          helperText="Cari surat dengan judul, no surat, dan lain-lain."
        />
      </form>
    </div>
  );
};

export default FormSearch;
