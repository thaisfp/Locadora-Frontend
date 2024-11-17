FROM node:latest

# Define o diretório de trabalho dentro do contêiner
WORKDIR /tmp/react

# Copia os arquivos da aplicação para o contêiner
COPY . .

# Remove qualquer dependência existente
RUN rm -rf node_modules

# Instala as dependências
RUN npm install

# Gera a build de produção
RUN npm run build

# Cria o diretório onde os arquivos serão movidos
RUN mkdir -p /var/www/html

# Move os arquivos de build do Next.js para o destino
RUN mv .next /var/www/html

# Limpa o diretório de trabalho temporário
WORKDIR /

RUN rm -rf /tmp/react

