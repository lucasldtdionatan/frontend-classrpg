export class Turma {
    titulo: string;
    descricao?: string;
    imagem?: string;
}

export interface TurmaList {
    id: number;
    titulo: string;
    imagem: string;
    professor: {
        id: number;
        nome: string;
        senha?: string;
        email: string;
        nickname: string;
        tipoUsuario: {
            id: number;
            tipo: string;
        }
        imagem: string;
        token?: string;
    }
    codigoAcesso: string;
    quantidade: number;
}