export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
};

export type QuizAnswer = {
  questionId: string;
  answer: string;
};

export type QuizRecommendation = {
  recommendedField: string;
  reasoning: string;
  suggestedRoadmapField: string; // matches a "field" value in your roadmaps table
};