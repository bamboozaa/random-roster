import { useState } from "react";
import ParticipantForm from "@/components/ParticipantForm";
import ParticipantList from "@/components/ParticipantList";
import DrawButton from "@/components/DrawButton";
import GroupResults from "@/components/GroupResults";
import SummaryTable from "@/components/SummaryTable";
import { drawGroups } from "@/lib/lotteryUtils";
import { toast } from "@/hooks/use-toast";
import { Dices } from "lucide-react";

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

interface DrawResult {
  groups: Record<string, Participant[]>;
  summary: Record<string, GroupStats>;
}

const Index = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [groups, setGroups] = useState<DrawResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [nextId, setNextId] = useState(1);

  const handleAddParticipant = (participant: Omit<Participant, "id">) => {
    setParticipants([...participants, { ...participant, id: nextId }]);
    setNextId(nextId + 1);
    toast({
      title: "เพิ่มผู้เข้าร่วมสำเร็จ",
      description: `เพิ่ม ${participant.name} แล้ว`,
    });
  };

  const handleDeleteParticipant = (id: number) => {
    setParticipants(participants.filter((p) => p.id !== id));
    setGroups(null);
    toast({
      title: "ลบผู้เข้าร่วมแล้ว",
      variant: "destructive",
    });
  };

  const handleDraw = async () => {
    if (participants.length < 3) {
      toast({
        title: "ไม่สามารถจับสลากได้",
        description: "ต้องมีผู้เข้าร่วมอย่างน้อย 3 คน",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setGroups(null);

    // Simulate loading for better UX
    setTimeout(() => {
      try {
        const result = drawGroups(participants, 3);
        setGroups(result);
        toast({
          title: "จับสลากสำเร็จ! 🎉",
          description: "แบ่งกลุ่มเสร็จสิ้น",
        });
      } catch (error) {
        toast({
          title: "เกิดข้อผิดพลาด",
          description: "ไม่สามารถจับสลากได้",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  const handleReDraw = async () => {
    setLoading(true);
    setGroups(null);

    setTimeout(() => {
      try {
        const result = drawGroups(participants, 3);
        setGroups(result);
        toast({
          title: "จับสลากใหม่สำเร็จ! 🎲",
          description: "ได้กลุ่มใหม่แล้ว",
        });
      } catch (error) {
        toast({
          title: "เกิดข้อผิดพลาด",
          description: "ไม่สามารถจับสลากได้",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Dices className="w-12 h-12 text-primary animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              ระบบจับสลากแบ่งกลุ่ม
            </h1>
            <Dices className="w-12 h-12 text-secondary animate-pulse" />
          </div>
          <p className="text-xl text-muted-foreground">
            จับสลากแบ่งกลุ่มอย่างยุติธรรม รวดเร็ว และสนุกสนาน!
          </p>
        </div>

        {/* Add Participant Form */}
        <ParticipantForm onAdd={handleAddParticipant} />

        {/* Participant List */}
        <ParticipantList participants={participants} onDelete={handleDeleteParticipant} />

        {/* Draw Button */}
        <DrawButton
          hasGroups={!!groups}
          isLoading={loading}
          onDraw={handleDraw}
          onReDraw={handleReDraw}
          disabled={participants.length < 3}
        />

        {/* Results */}
        {groups && !loading && (
          <div className="space-y-8 animate-ticket">
            <GroupResults groups={groups.groups} />
            <SummaryTable summary={groups.summary} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
