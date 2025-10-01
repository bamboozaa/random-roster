import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";
import { toast } from "@/hooks/use-toast";

interface Participant {
  id: number;
  name: string;
  gender: string;
  age: number;
}

interface GroupStats {
  total: number;
  ชาย: number;
  หญิง: number;
  "ต่ำกว่า20": number;
  "20-29": number;
  "30-39": number;
  "40+": number;
}

interface ExportButtonProps {
  participants: Participant[];
  groups?: Record<string, Participant[]> | null;
  summary?: Record<string, GroupStats> | null;
}

const ExportButton = ({ participants, groups, summary }: ExportButtonProps) => {
  const handleExport = () => {
    if (participants.length === 0) {
      toast({
        title: "ไม่มีข้อมูล",
        description: "กรุณาเพิ่มผู้เข้าร่วมก่อน",
        variant: "destructive",
      });
      return;
    }

    const workbook = XLSX.utils.book_new();

    // Sheet 1: รายชื่อผู้เข้าร่วมทั้งหมด
    const participantsData = participants.map((p, index) => ({
      ลำดับ: index + 1,
      ชื่อ: p.name,
      เพศ: p.gender,
      อายุ: p.age,
    }));
    const ws1 = XLSX.utils.json_to_sheet(participantsData);
    XLSX.utils.book_append_sheet(workbook, ws1, "รายชื่อทั้งหมด");

    // Sheet 2: ผลการจับสลาก (ถ้ามี)
    if (groups && summary) {
      const groupsData: any[] = [];
      Object.entries(groups).forEach(([groupName, members]) => {
        members.forEach((member, index) => {
          groupsData.push({
            กลุ่ม: groupName,
            ลำดับ: index + 1,
            ชื่อ: member.name,
            เพศ: member.gender,
            อายุ: member.age,
          });
        });
      });
      const ws2 = XLSX.utils.json_to_sheet(groupsData);
      XLSX.utils.book_append_sheet(workbook, ws2, "ผลการจับสลาก");

      // Sheet 3: สรุปความสมดุล
      const summaryData = Object.entries(summary).map(([groupName, stats]) => ({
        กลุ่ม: groupName,
        รวม: stats.total,
        ชาย: stats.ชาย,
        หญิง: stats.หญิง,
        "ต่ำกว่า20": stats["ต่ำกว่า20"],
        "20-29": stats["20-29"],
        "30-39": stats["30-39"],
        "40+": stats["40+"],
      }));
      const ws3 = XLSX.utils.json_to_sheet(summaryData);
      XLSX.utils.book_append_sheet(workbook, ws3, "สรุปความสมดุล");
    }

    // สร้างชื่อไฟล์ด้วยวันที่และเวลา
    const date = new Date();
    const fileName = `จับสลากแบ่งกลุ่ม_${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}_${String(date.getHours()).padStart(2, "0")}-${String(date.getMinutes()).padStart(2, "0")}.xlsx`;

    // Export
    XLSX.writeFile(workbook, fileName);

    toast({
      title: "ส่งออกข้อมูลสำเร็จ! 📊",
      description: `บันทึกไฟล์ ${fileName} แล้ว`,
    });
  };

  return (
    <Button
      onClick={handleExport}
      variant="outline"
      className="gap-2"
      disabled={participants.length === 0}
    >
      <Download className="w-4 h-4" />
      ส่งออก Excel
    </Button>
  );
};

export default ExportButton;
