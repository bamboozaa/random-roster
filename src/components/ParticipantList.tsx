import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Participant {
  id: number;
  name: string;
  gender: string;
  age: number;
}

interface ParticipantListProps {
  participants: Participant[];
  onDelete?: (id: number) => void;
}

export default function ParticipantList({ participants, onDelete }: ParticipantListProps) {
  if (participants.length === 0) {
    return (
      <Card className="shadow-card border-2">
        <CardContent className="py-12">
          <p className="text-center text-muted-foreground text-lg">
            ยังไม่มีผู้เข้าร่วม กรุณาเพิ่มผู้เข้าร่วมก่อน
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-card hover:shadow-card-hover transition-all duration-300 border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Users className="w-6 h-6 text-primary" />
          รายชื่อผู้เข้าร่วม ({participants.length} คน)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2">
          {participants.map((p, index) => (
            <div
              key={p.id}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors border border-border"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                  {index + 1}
                </span>
                <div>
                  <p className="font-semibold text-foreground">{p.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {p.gender} • {p.age} ปี
                  </p>
                </div>
              </div>
              {onDelete && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(p.id)}
                  className="hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
