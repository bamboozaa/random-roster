import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import * as XLSX from "xlsx";
import { toast } from "@/hooks/use-toast";
import { useRef } from "react";

interface Participant {
  name: string;
  gender: string;
  age: number;
}

interface ImportExcelButtonProps {
  onImport: (participants: Participant[]) => void;
}

const ImportExcelButton = ({ onImport }: ImportExcelButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

        const participants: Participant[] = jsonData
          .map((row) => {
            const name = row["ชื่อ"] || row["name"];
            const gender = row["เพศ"] || row["gender"];
            const age = row["อายุ"] || row["age"];

            if (!name || !gender || !age) {
              return null;
            }

            // ตรวจสอบเพศ
            if (gender !== "ชาย" && gender !== "หญิง") {
              toast({
                title: "ข้อมูลไม่ถูกต้อง",
                description: `เพศต้องเป็น "ชาย" หรือ "หญิง" เท่านั้น (พบ: ${gender})`,
                variant: "destructive",
              });
              return null;
            }

            return {
              name: String(name),
              gender: String(gender),
              age: Number(age),
            };
          })
          .filter((p): p is Participant => p !== null);

        if (participants.length === 0) {
          toast({
            title: "ไม่พบข้อมูล",
            description: "กรุณาตรวจสอบไฟล์ Excel ของคุณ",
            variant: "destructive",
          });
          return;
        }

        onImport(participants);

        toast({
          title: "Import ข้อมูลสำเร็จ! ✅",
          description: `เพิ่มผู้เข้าร่วม ${participants.length} คน`,
        });

        // Reset input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        toast({
          title: "เกิดข้อผิดพลาด",
          description: "ไม่สามารถอ่านไฟล์ Excel ได้",
          variant: "destructive",
        });
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
        className="hidden"
      />

      <Button
        onClick={handleImportClick}
        variant="secondary"
        className="gap-2"
      >
        <Upload className="w-4 h-4" />
        Import Excel
      </Button>
    </div>
  );
};

export default ImportExcelButton;
