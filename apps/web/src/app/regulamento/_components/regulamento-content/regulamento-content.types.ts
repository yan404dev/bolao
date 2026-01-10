export interface Regra {
  id: number;
  texto: string;
  destaque?: boolean;
}

export interface Secao {
  id: number;
  titulo: string;
  conteudo: string[];
}

export interface Observacao {
  texto: string;
}
