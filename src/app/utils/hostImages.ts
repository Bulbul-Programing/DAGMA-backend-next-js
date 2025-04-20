import { Request, Response } from "express";

export const hostImages = (req: Request, res: Response) => {
    console.log('req', req.body);
}