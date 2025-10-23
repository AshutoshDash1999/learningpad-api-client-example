interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface CreatePost {
  title: string;
  body: string;
  userId: number;
}

interface CreateComment {
  postId: number;
  name: string;
  email: string;
  body: string;
}
