export interface Route {
  label: string;
  url?: string;
  pages?: Route[];
}
