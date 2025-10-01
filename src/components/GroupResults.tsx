import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Users } from "lucide-react";

interface Participant {
  id: number;
  name: string;
  gender: string;
  age: number;
}

interface GroupResultsProps {
  groups: Record<string, Participant[]>;
}

export default function GroupResults({ groups }: GroupResultsProps) {
  const groupColors = [
    "from-purple-500 to-pink-500",
    "from-blue-500 to-cyan-500",
    "from-green-500 to-emerald-500",
    "from-orange-500 to-red-500",
    "from-indigo-500 to-purple-500",
    "from-yellow-500 to-orange-500",
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-3 text-foreground">
          <Trophy className="w-8 h-8 text-primary" />
          ผลการจับสลาก
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(groups).map(([groupName, members], index) => (
          <Card
            key={groupName}
            className="shadow-card hover:shadow-card-hover transition-all duration-300 border-2 animate-ticket overflow-hidden"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className={`bg-gradient-to-br ${groupColors[index % groupColors.length]} text-white`}>
              <CardTitle className="flex items-center justify-between text-xl">
                <span className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  กลุ่ม {groupName}
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">
                  {members.length} คน
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {members.map((member, idx) => (
                  <li
                    key={member.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-xs">
                      {idx + 1}
                    </span>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{member.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {member.gender} • {member.age} ปี
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
