export interface Project {
    projectName: string;
    type: string;
    startDate: Date;
    endDate: Date;
    projectManager: string;
    engagementLeader: string;
    status: string;
    health: string;
    description: string;
    totalBudget: number;
    burnedBudget: number;
    remainingBudget: number;
    totalBurnedHours: number;
  }