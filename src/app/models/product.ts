export interface Product {
  id: string;
  plan: string;
  nombre: string;
  precio: number;
  periodo: string;
  instalacion: string;
  monitoreo24x7: boolean;
  apagadoRemoto: boolean;
  caracteristicas: string[];
}