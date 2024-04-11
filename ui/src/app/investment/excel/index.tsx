"use client";
import * as XLSX from "xlsx";
import Button from "@/components/std/Button";

type props = {
  download_data: {
    amount: number;
    status: string;
    id: number;
  }[];
};

export default function ExcelExport(props: props) {
  const download = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(
      props.download_data.map((investment) => {
        return {
          id: investment.id,
          amount: investment.amount,
          currency: "usd",
          status: investment.status,
        };
      })
    );
    XLSX.utils.book_append_sheet(wb, ws, "investments");
    XLSX.writeFile(wb, "investments.xlsx");
  };

  return (
    <Button outline onClick={download}>
      Export to excel
    </Button>
  );
}
