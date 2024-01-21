interface IAccount {
  id?: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updateAt: Date;
}

export default IAccount;
