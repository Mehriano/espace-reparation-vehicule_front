import { User } from "./user";
export class Voiture {
  public _id?: string;
  public immatriculation: string;
  public numChasis: string;
  public marque: string;
  public modele: string;
  public proprietaire: User; // TO DO CLASS USER .
  public kilometrage: Number;
  public dMC: string;
  public sizeMoteur: string;
  public energie: string;
}
