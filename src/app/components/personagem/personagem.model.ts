import { Nivel } from './../turma/nivel/nivel.model';
import { TurmaList } from './../turma-home/turma-home.model';
import { User } from './../../models/user.model';

export class Personagem {
    descricao: string;
    experiencia: number;
    id: number;
    imagemAvatar: string;
    nivel: Nivel;
    turma: TurmaList;
    quantidade: number;
    usuario: User;
}
