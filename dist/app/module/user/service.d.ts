export declare const create: (fullName: string, email: string, password: string) => Promise<{
    data: {
        id: number;
        fullName: string;
        email: string;
    };
    message: string;
}>;
export declare const login: (email: string, password: string) => Promise<{
    status: boolean;
    message: string;
    data: {
        id: number;
        fullName: string;
        email: string;
        token: string;
    };
}>;
