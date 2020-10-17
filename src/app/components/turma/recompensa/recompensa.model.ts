import { Nivel } from './../nivel/nivel.model';
import { Turma, TurmaList } from './../../turma-home/turma-home.model';
export interface Recompensa {
    id?: number;
    nome: string;
    descricao: string;
    turma: TurmaList;
    imagem?: string;
    nivel: Nivel;
    experiencia: number;
}