import { TurmaList } from './../../turma-home/turma-home.model';
export interface Atividade {
    id?: string;
    titulo: string;
    descricao: string;
    experiencia: number;
    turma?: TurmaList;
    inicioAtividade: string;
    fimAtividade: string;
}