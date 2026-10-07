# Technologic

Aplicativo Expo/React Native com catálogo público, pesquisa, cadastro e login, área administrativa para gerenciar conteúdos e imagens, e API REST Express com MongoDB.

## Requisitos

- Node.js 20 ou superior
- Expo Go para executar o aplicativo em um dispositivo, ou um emulador

## Iniciar a API

No terminal:

```powershell
cd server
npm install
Copy-Item .env.example .env
```

Edite `server/.env` e defina `MONGODB_URI` e um `JWT_SECRET` privado. Em seguida:

```powershell
npm run dev
```

A API inicia na porta `3000` e cria/usa o banco `technologic`. O endpoint `GET /api/health` verifica se o servidor está ativo.

## Iniciar o aplicativo

Em outro terminal, na pasta raiz:

```powershell
npm install
Copy-Item .env.example .env
```

Configure `EXPO_PUBLIC_API_URL` em `.env` para o endereço acessível pelo dispositivo:

- Web ou simulador iOS: `http://localhost:3000`
- Emulador Android: `http://10.0.2.2:3000`
- Dispositivo físico: `http://IP-DO-COMPUTADOR:3000` (ambos na mesma rede)

Depois execute:

```powershell
npm start
```

O servidor salva imagens em `server/uploads/`, que não deve ser apagada enquanto houver conteúdos que as referenciem.

## Uso

1. Crie a primeira conta pelo ícone de usuário e opção de cadastro. A senha deve ter ao menos oito caracteres.
2. Pessoas sem login podem visualizar e pesquisar o catálogo.
3. Com login, a tela inicial permite criar, editar e excluir conteúdos; a imagem pode ser escolhida, substituída ou removida pela galeria.
4. O servidor exige um token JWT para todas as operações administrativas; o token fica no armazenamento seguro do dispositivo.

## Endpoints principais

- `POST /api/auth/register` e `POST /api/auth/login`
- `GET /api/content?q=termo`
- `POST /api/content`, `PUT /api/content/:id`, `DELETE /api/content/:id`
- `POST /api/content/:id/image` e `DELETE /api/content/:id/image`

Cadastro, alteração, exclusão e gerenciamento de imagem exigem `Authorization: Bearer <token>`.
