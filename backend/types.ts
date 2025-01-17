// DB의 타입 정의
export interface Profile {
  calimeroAddress: string;
  name: string;
  image: string;
  description: string;
}

export interface Post {
  id: string;
  uploaderAddress: string;
  title: string;
  contents: string;
  createdAt: string;
}

export interface RequestEntity {
  sender: string;
  receiver: string;
  postId: string;
  purpose: string;
  requestStatus: string;
  createdAt: string;
}

export interface Database {
  profiles: Profile[];
  posts: Post[];
  requests: RequestEntity[];
}