import connection from "@config/knex"
import IProducts from "../../../dto/IProducts";

class ListPurchasedUseCase {
    async execute(userId: number){
       const productsPurchased:any[] = [];
        const result = await connection('buys_products').select('*').where({user_id: userId})
        for (const element of result) {
        const pathImages = await connection("images_product")
        .select("*")
        .where({ product_id: element.product_id });
        const products: any = await connection('products').select('*').where({ id: element.product_id });
        productsPurchased.push({
            ...products, 
            images: pathImages
        });
    }
      
        return{
            status: true,
            data: productsPurchased
        }
    }
}

export default ListPurchasedUseCase