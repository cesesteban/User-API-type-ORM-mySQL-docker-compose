export interface IUserSession {
    id: number;
    userId: number;
    sessionToken: string;
    createdAt: Date;
    expiresAt: Date;
}
