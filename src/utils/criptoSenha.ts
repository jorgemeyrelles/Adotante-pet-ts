import crypto from "crypto";

export const criptografarSenha = (pass: string) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.createHmac("sha256", salt);

  hash.update(pass);
  return hash.digest("hex");
};
