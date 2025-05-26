import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function FarsiPdfApp() {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("farsi-pdf");

  const generatePDF = async () => {
    const element = document.getElementById("pdf-content");
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save(`${fileName}.pdf`);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-bold text-right">ایجاد سند PDF فارسی</h2>
          <Input
            dir="rtl"
            className="text-right"
            placeholder="نام فایل PDF..."
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
          <Textarea
            dir="rtl"
            rows={10}
            className="text-right"
            placeholder="متن فارسی خود را اینجا بنویسید..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div
            id="pdf-content"
            className="bg-white p-6 text-right leading-loose font-bold text-lg"
          >
            {text.split("\n").map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </div>
          <Button className="w-full" onClick={generatePDF}>
            تولید PDF
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
