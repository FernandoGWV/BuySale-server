import { Request, Response } from "express";
import ListPurchasedUseCase from "./listPurchasedUseCase";

class ListPurchasedController{
    async handle(req: Request, res: Response){
        const {userId} = req.params
        console.log(userId)
        const result = await new ListPurchasedUseCase().execute(Number(userId))

        if(result.status){
            return res.status(200).json({...result})
        }else{
            return res.status(400).json({...result})

        }
    }
}

export default ListPurchasedController