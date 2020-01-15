import { PieceRechange } from "./pieceRechange";
import { Voiture } from "./voiture";

export class EventRep {
  public _id?: string;
  public vehicule: any;
  public prix?: number;
  public etat: {
    description: string;
    order: number;
    seen?: Date;
  };
  public pieces?: PieceRechange;
  public obesrvation?: string;
  public travailDemande: string;
  public delaiLiv?: Date;
  public dateRep: Date;
  public seenClient?: boolean;
  public seenResp?: boolean;
  public issuedAt?: Date;
}
