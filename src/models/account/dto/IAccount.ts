interface IAccount {
  id?: number;
  name: string;
  email: string;
  password: string;
  wallet: number;
  createdAt: Date;
  updateAt: Date;
}

export default IAccount;
