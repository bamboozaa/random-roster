import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus } from "lucide-react";

interface Participant {
  id: number;
  name: string;
  gender: string;
  age: number;
}

interface ParticipantFormProps {
  onAdd: (participant: Omit<Participant, "id">) => void;
}

export default function ParticipantForm({ onAdd }: ParticipantFormProps) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("ชาย");
  const [age, setAge] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !age) return;

    onAdd({
      name,
      gender,
      age: parseInt(age),
    });

    setName("");
    setAge("");
  };

  return (
    <Card className="shadow-card hover:shadow-card-hover transition-all duration-300 border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <UserPlus className="w-6 h-6 text-primary" />
          เพิ่มผู้เข้าร่วม
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-3">
          <Input
            type="text"
            placeholder="ชื่อ"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 min-w-[200px] border-2 focus:border-primary transition-colors"
            required
          />
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger className="w-[120px] border-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ชาย">ชาย</SelectItem>
              <SelectItem value="หญิง">หญิง</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="อายุ"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-24 border-2 focus:border-primary transition-colors"
            required
            min="1"
            max="120"
          />
          <Button type="submit" size="lg" className="font-bold">
            เพิ่ม
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
