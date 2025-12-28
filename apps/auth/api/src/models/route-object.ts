import { Request, Response } from "express";

export interface RouteObject {
  del: (req: Request, res: Response) => { res: Response };
  getAll: (req: Request, res: Response) => { res: Response };
  getOne: (req: Request, res: Response) => { res: Response };
  save: (req: Request, res: Response) => { res: Response };
}
