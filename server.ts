import app from "./src/app";

const PORTA = 3030;

app.listen(PORTA, () => {
  console.log(`Servidor executando em http://localhost:${PORTA}`);
});
