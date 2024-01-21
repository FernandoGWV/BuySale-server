const bcrypt = require("bcryptjs");
export const EncryptPassword = async (password: string) => {
  const salt = await bcrypt.genSaltSync(Number(13));
  const result = await bcrypt.hashSync(password, salt);
  return result;
};

export const ComparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  const result = await bcrypt.compareSync(password, hash);
  return result;
};
