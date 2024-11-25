export interface FeedItem {
    id: string;
    content: string;
    createdAt: string;
    imageUrls: string[];
    user: User;
    likes: Like[];
    comments: string[];
    likeCount: number;
    commentCount: number;
}

interface User {
    id: string;
    fullName: string;
    email: string;
    profilePicture: string | null;
    bio: string | null;
    role: string | null;
    location: string | null;
    createdAt: string;
    password: string;
    roles: string[];
    isActive: boolean;
}

interface Like {
    id: string;
    createdAt: string;
}

