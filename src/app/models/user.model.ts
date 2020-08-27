export class User{
    id: number;
    nome: string;
    email: string;
    nickname: string;
    tipoUsuario: {
        id: number;
        tipo: string;
    }
    imagem?: string;
    token?: string;
}

export class loginUser{
    email: string;
    senha: string;
}

export class registerUser{
    nome: string;
    senha: string;
    email: string;
    nickname: string;
    tipoUsuario: {
        id: number;
    }
}