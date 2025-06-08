FROM node:20-alpine
LABEL maintainer="Juan Jose Mena Costa"
LABEL description="AI Product Sentiment API for analyzing product reviews."
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g npm@latest #
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev:docker"]