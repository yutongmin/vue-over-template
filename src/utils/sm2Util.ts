import { sm2 } from 'sm-crypto';

// 从环境变量或配置文件中获取公钥和私钥
const publicKey = '0495f30a0752abe637302c243c91d854ae1c5acce7c03698024c60288c3b4a071cd32f67386c948c671f399c7db0c6875c16b603ed24df2ce08ea5ad50a3246e46';
const privateKey = 'process.env.PRIVATE_KEY';

/**
 * 使用 SM2 算法进行加密
 * @param plaintext 明文
 */
async function encrypt(plaintext: string): Promise<string> {
  const keyPair = await sm2.generateKeyPairHex(); // 生成临时密钥对
  const ciphertext = sm2.doEncrypt(publicKey, plaintext); // 使用公钥加密
  return ciphertext;
}

/**
 * 使用 SM2 算法进行解密
 * @param ciphertext 密文
 */
async function decrypt(ciphertext: string): Promise<string> {
  const decryptedText = sm2.doDecrypt(privateKey, ciphertext); // 使用私钥解密
  return decryptedText.toString();
}

export {
  encrypt,
  decrypt,
};
