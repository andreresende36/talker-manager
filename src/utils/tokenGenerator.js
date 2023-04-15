const base62Characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const tokenLength = 16;

const tokenGenerator = () => {
  const token = [];
  for (let i = 0; i < tokenLength; i += 1) {
    const randomNumber = Math.floor(Math.random() * base62Characters.length);
    token.push(base62Characters[randomNumber]);
  }
  return token.join('');
};

console.log(tokenGenerator());

module.exports = tokenGenerator;
