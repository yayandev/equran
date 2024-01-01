import DetailSurat from "@/components/DetailSurat";
import React from "react";

const PageDetailSurat = ({ params }: { params: { nomor: number } }) => {
  return (
    <div className="p-3">
      <DetailSurat nomor={params.nomor} />
    </div>
  );
};

export default PageDetailSurat;
