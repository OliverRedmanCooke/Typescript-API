export enum Priority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  priority: Priority;
}
