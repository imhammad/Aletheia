export type Roadmap = {
  id: string;
  title: string;
  field: string;
  description: string | null;
  created_by: string | null;
  created_at: string;
};

export type RoadmapResource = {
  id: string;
  roadmap_id: string;
  title: string;
  url: string;
  resource_type: "book" | "video" | "article" | "course" | "other";
  sort_order: number;
  created_at: string;
};

export type RoadmapRating = {
  id: string;
  roadmap_id: string;
  user_id: string;
  rating: number;
  review: string | null;
  created_at: string;
};