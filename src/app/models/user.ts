import { Voiture } from "./voiture";

export class User {
  public _id?: string;
  public nom: string;
  public prenom: string;
  public userName: string;
  public cin: string;
  public phone: string; // TO DO CLASS USER .
  public fax: Number;
  public email: string;
  public password: string;
  public role: string;
  public adresse: any;
  public voitures?: Voiture[];
}
