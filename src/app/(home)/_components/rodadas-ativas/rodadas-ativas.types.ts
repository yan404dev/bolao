export type AnimationType = "soccer" | "trophy" | "money";

export interface ActionCard {
  id: number;
  title: string;
  subtitle: string;
  href?: string;
  onClick?: () => void;
  animation: AnimationType;
  bgColor: string;
}
