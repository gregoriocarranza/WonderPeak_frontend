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
    lastname: string;
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
};

export type PostData = {
    data: Post[];
};

export type Advertising = {
    id: string,
    multimediaUrl: string,
    commerceImage: string, 
    commerceName: string,
    commerceUrl: string,
    title: string | null;
    text: string | null;
}
