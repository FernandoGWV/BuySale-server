import connection from "@config/knex";
import { format } from "date-fns";
import IBuyProduct from "./dto/IBuyProduct";
import IProducts from "../../dto/IProducts";
import IAccount from "../../../account/dto/IAccount";

class BuyProductUseCase {
  async execute(model: Partial<IBuyProduct>) {

    const productResult: IProducts  = await connection('products').select('*').where({id: model.product_id}).first()
    const user: IAccount =  await connection('users').select('*').where({id: model.user_id}).first()
    
     await connection('products').select('*').where({id: model.product_id}).update({
      its_buy: 0,
      updatedAt: format(new Date(), "yyyy-MM-dd HH:mm:ss")
    })

 
    
    

  /*   await connection("buys_products").insert({
      ...model,
      createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      updatedAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    });
 */
    return {
      status: true,
      message: "Produto comprado com sucesso!",
    };
  }
}

export default BuyProductUseCase;
