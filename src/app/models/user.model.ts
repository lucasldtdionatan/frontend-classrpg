export class User{
    id: number;
    nome: string;
    email: string;
    password: string;
    nickname: string;
    image?: string;
    token?: string;
}

export class loginUser{
    email: string;
    senha: string;
}