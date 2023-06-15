export interface AddResourcetoProject {
    role: string;
    resource: string;
    allocatedBudget: number;
    allocatedHours: number;
    burnedHours: number;
    assignmentStartDate: string;
    assignmentEndDate: string;
    projectID: number;
    resourceId: number
  }
  