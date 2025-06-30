
export interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  imagePrompt: string;
}

export interface GeneratedPost {
    title: string;
    content: string;
    imagePrompt: string;
}
