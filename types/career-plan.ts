export type CareerPlanInput = {
  targetRole: string;
  currentField: string;
  timelineMonths: number;
};

export type TimelinePhase = {
  phase: string;
  duration: string;
  focus: string;
  skills: string[];
};

export type CareerPlan = {
  overview: string;
  timeline: TimelinePhase[];
  certificates: string[];
  interviewPrepTips: string[];
};