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
  "Gen Z": number;
  "Gen Y": number;
  "Gen X": number;
  "59+": number;
}

function getAgeGroup(age: number): string {
  if (age <= 27) return "Gen Z";
  if (age <= 42) return "Gen Y";
  if (age <= 58) return "Gen X";
  return "59+";
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function drawGroups(participants: Participant[], groupNames: string[]) {
  if (participants.length === 0) {
    throw new Error("No participants to draw from");
  }

  // Shuffle participants
  const shuffled = shuffleArray(participants);

  // Initialize groups
  const groups: Record<string, Participant[]> = {};
  groupNames.forEach((name) => {
    groups[name] = [];
  });

  // Distribute participants evenly
  shuffled.forEach((participant, index) => {
    const groupIndex = index % groupNames.length;
    groups[groupNames[groupIndex]].push(participant);
  });

  // Calculate summary
  const summary: Record<string, GroupStats> = {};
  
  Object.entries(groups).forEach(([groupName, members]) => {
    const stats: GroupStats = {
      total: members.length,
      ชาย: 0,
      หญิง: 0,
      "Gen Z": 0,
      "Gen Y": 0,
      "Gen X": 0,
      "59+": 0,
    };

    members.forEach((member) => {
      // Count gender
      if (member.gender === "ชาย") {
        stats.ชาย++;
      } else if (member.gender === "หญิง") {
        stats.หญิง++;
      }

      // Count age group
      const ageGroup = getAgeGroup(member.age);
      stats[ageGroup as keyof GroupStats]++;
    });

    summary[groupName] = stats;
  });

  return { groups, summary };
}
