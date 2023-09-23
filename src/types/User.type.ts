export interface Register {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmpassword: string;
}

export interface Login {
    email: string
    password: string
}

export interface LoginResult {
    message: string;
    token: string;
}