# Usa uma imagem base com Node.js
FROM node:18-alpine AS builder

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência para o container
COPY package.json package-lock.json ./ 

# Instala as dependências
RUN npm install

# Copia todo o projeto para o container
COPY . .

# Constrói o projeto Next.js
RUN npm run build

# Usa uma imagem mínima para servir a aplicação
FROM node:18-alpine AS runner

WORKDIR /app

# Copia o build do estágio anterior
COPY --from=builder /app/ .

# Expõe a porta da aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start"]
