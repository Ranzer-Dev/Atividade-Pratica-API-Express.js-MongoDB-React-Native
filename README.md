# Technologic

Aplicativo Expo/React Native com catálogo público, pesquisa, cadastro e login, área administrativa para gerenciar conteúdos e imagens, e API REST Express com MongoDB.

## Organização do projeto

```text
assets/                 Imagens e ícones do aplicativo
src/
  components/           Componentes reutilizáveis e formulários
  context/              Estado e sessão de autenticação
  screens/              Telas e navegação de cada página
  services/             Comunicação com a API
  styles/               Estilos compartilhados
  theme/                Tema do React Native Paper
server/
  src/
    middleware/         Autorização das rotas
    models/             Modelos do MongoDB
    index.js            Rotas Express e inicialização da API
```

`index.js`, na raiz, é o ponto de entrada Expo e carrega o aplicativo de `src/App.js`. Os arquivos de configuração e os manifests npm permanecem na raiz para que Expo e npm os encontrem sem configuração adicional.

## Requisitos

- Node.js 20 ou superior
- Expo Go no celular Android (não é necessário instalar emulador)
- MongoDB local ou uma instância MongoDB acessível pela API

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

## Executar em um celular Android (sem emulador)

O celular e o computador precisam estar conectados à mesma rede Wi-Fi. Instale o **Expo Go** no Android pela Play Store. No computador, descubra o endereço IPv4 da rede local executando `ipconfig` no PowerShell; use o endereço da placa Wi-Fi, por exemplo `192.168.0.15`.

No terminal do computador, na pasta raiz do projeto:

```powershell
npm install
Copy-Item .env.example .env
```

Edite o `.env` da raiz e substitua `localhost` pelo IPv4 do computador:

```env
EXPO_PUBLIC_API_URL=http://192.168.0.15:3000
```

Use o seu próprio endereço IP, não o exemplo acima. A URL também não deve conter `localhost`: no celular, isso apontaria para o próprio aparelho.

Antes de abrir o app, inicie a API em um terminal, conforme a seção anterior. Depois, em outro terminal na pasta raiz, inicie o Expo pela rede local:

```powershell
npx expo start --lan
```

Abra o **Expo Go** no celular e leia o QR code exibido no terminal (ou na página que abrir no computador). Se o Windows perguntar, permita o acesso do Node.js às redes privadas no Firewall. Também confirme que o celular não está em uma rede Wi-Fi de convidados com isolamento de dispositivos.

Para confirmar a conexão antes de abrir o Expo Go, acesse no navegador do celular `http://192.168.0.15:3000/api/health`; deve aparecer `{"status":"ok"}`. Se não abrir, confira se o MongoDB e a API estão ativos, se o IP está correto e se o Firewall permite conexões privadas na porta `3000`.

O computador continua precisando executar o MongoDB (localmente ou em uma instância remota), a API e o servidor Expo enquanto o app estiver em desenvolvimento. O servidor salva imagens em `server/uploads/`, que não deve ser apagada enquanto houver conteúdos que as referenciem.

### Outros ambientes

- Web ou simulador iOS: `EXPO_PUBLIC_API_URL=http://localhost:3000`
- Emulador Android: `EXPO_PUBLIC_API_URL=http://10.0.2.2:3000`
- Celular físico: `EXPO_PUBLIC_API_URL=http://IP-DO-COMPUTADOR:3000`

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
