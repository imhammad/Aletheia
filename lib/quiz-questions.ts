import type { QuizQuestion } from "@/types/quiz";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "When you solve a problem, what part do you enjoy most?",
    options: [
      "Figuring out the most efficient way to do something",
      "Making something visual or interactive that people use directly",
      "Understanding how data flows through a whole system",
      "Finding patterns in large amounts of information",
    ],
  },
  {
    id: "q2",
    question: "Which sounds most satisfying to work on?",
    options: [
      "A UI that feels smooth and intuitive to use",
      "A system that handles thousands of requests reliably",
      "A model that gets better the more data it sees",
      "Infrastructure that keeps everything running without anyone noticing",
    ],
  },
  {
    id: "q3",
    question: "What's your relationship with math and theory?",
    options: [
      "I enjoy it but prefer applying it to visible, tangible results",
      "I like it in service of building robust, scalable systems",
      "I actively enjoy statistics, linear algebra, and probability",
      "I prefer practical problem-solving over heavy theory",
    ],
  },
  {
    id: "q4",
    question: "Pick a project you'd rather spend a weekend on:",
    options: [
      "A polished personal portfolio site with animations",
      "A backend API that manages real user data securely",
      "A small model that predicts something from a dataset",
      "A script that automates a repetitive task end-to-end",
    ],
  },
  {
    id: "q5",
    question: "What frustrates you most in software?",
    options: [
      "Clunky, confusing interfaces",
      "Systems that fall over under real load",
      "Predictions or tools that are technically correct but not useful",
      "Manual processes that should obviously be automated",
    ],
  },
];