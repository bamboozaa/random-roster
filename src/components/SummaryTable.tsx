import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

interface GroupStats {
  total: number;
  ชาย: number;
  หญิง: number;
  "Gen Z": number;
  "Gen Y": number;
  "Gen X": number;
  "59+": number;
}

interface SummaryTableProps {
  summary: Record<string, GroupStats>;
}

export default function SummaryTable({ summary }: SummaryTableProps) {
  return (
    <Card className="shadow-card hover:shadow-card-hover transition-all duration-300 border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <BarChart3 className="w-6 h-6 text-primary" />
          สรุปความสมดุล
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-primary/5 border-b-2 border-primary">
                <th className="px-4 py-3 text-left font-bold text-foreground">กลุ่ม</th>
                <th className="px-4 py-3 text-center font-bold text-foreground">รวม</th>
                <th className="px-4 py-3 text-center font-bold text-foreground">ชาย</th>
                <th className="px-4 py-3 text-center font-bold text-foreground">หญิง</th>
                <th className="px-4 py-3 text-center font-bold text-foreground">Gen Z</th>
                <th className="px-4 py-3 text-center font-bold text-foreground">Gen Y</th>
                <th className="px-4 py-3 text-center font-bold text-foreground">Gen X</th>
                <th className="px-4 py-3 text-center font-bold text-foreground">59+</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(summary).map(([groupName, stats], index) => (
                <tr
                  key={groupName}
                  className={`border-b hover:bg-muted/50 transition-colors ${
                    index % 2 === 0 ? "bg-muted/20" : ""
                  }`}
                >
                  <td className="px-4 py-3 font-semibold text-foreground">{groupName}</td>
                  <td className="px-4 py-3 text-center font-bold text-primary">{stats.total}</td>
                  <td className="px-4 py-3 text-center text-foreground">{stats["ชาย"]}</td>
                  <td className="px-4 py-3 text-center text-foreground">{stats["หญิง"]}</td>
                  <td className="px-4 py-3 text-center text-foreground">{stats["Gen Z"]}</td>
                  <td className="px-4 py-3 text-center text-foreground">{stats["Gen Y"]}</td>
                  <td className="px-4 py-3 text-center text-foreground">{stats["Gen X"]}</td>
                  <td className="px-4 py-3 text-center text-foreground">{stats["59+"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
