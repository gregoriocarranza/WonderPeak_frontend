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

type UserData = {
    useruuid: string;
    name: string;
    lastname: string;
    nickname: string;
    profileuserimage: string;
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