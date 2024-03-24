interface IProducts {
  id: number;
  userId?: number;
  like: number;
  price: number;
  title: string;
  image: any;
  descripte: string;
  createdAt: Date;
  updatedAt: Date;
}

export default IProducts;
