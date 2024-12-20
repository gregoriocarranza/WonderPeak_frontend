export type UserInfo = {
    userUuid: string;
    name: string;
    lastname: string;
    nickname: string;
    email: string;
    profileImage: string;
    coverImage: string;
    description: string;
    gender: string;
    gamificationLevel: string;
    active: string;
    imFollower?: boolean;
    isFavorite?: boolean;
};

type Location = {
    latitude: number;
    longitude: number;
    mapsUrl: string;
    placeHolder:string;
};

export type UserData = {
    userUuid: string;
    name: string;
    lastName?: string;  
    lastname?: string;
    nickname: string;
    profileImage?: string;
    profileUserImage?: string;
    level: string;
}

export type Post = {
    postUuid: string;
    userUuid: string;
    title: string;
    text: string;
    user: UserData;
    location: Location;
    multimediaUrl: string;
    commentsCount: number | null;
    likesCount: number | null;
    createdAt: string;
    updatedAt: string | null;
    favorite: boolean,
    liked: boolean
};

export type PostData = {
    data: Post[];
};

export type Advertising = {
    id: string;
    multimediaUrl: string;
    commerceImage: string;
    commerceName: string;
    commerceUrl: string;
    title: string | null;
    text: string | null;
};

export type MediaItem = {
  id: string;
  type: string | "image" | "video";
  source: any;
};

export type FormState = {
    name: string;
    lastname: string;
    nickname: string;
    email: string;
    gender: string;
    description: string;
    profileImage: string;
    coverImage: string;
  };

  export type SendFormState = {
    name: string;
    lastname: string;
    nickname: string;
    email: string;
    gender: string;
    bio: string;
    profileImage: string;
    coverImage: string;
  };