import bcrypt from "bcrypt";
export async function hash(password: string) {
  const hashedpassword = await bcrypt.hash(password, 10);
  return hashedpassword;
}
