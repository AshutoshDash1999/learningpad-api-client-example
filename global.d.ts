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

interface Profile {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface UpdateProfile {
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: {
    street?: string;
    suite?: string;
    city?: string;
    zipcode?: string;
    geo?: {
      lat?: string;
      lng?: string;
    };
  };
  company?: {
    name?: string;
    catchPhrase?: string;
    bs?: string;
  };
}
