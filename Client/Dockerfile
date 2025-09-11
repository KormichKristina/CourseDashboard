
FROM node:lts AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["sh", "-c", "cd /usr/share/nginx/html && python3 -m http.server 80"]
#CMD ["nginx", "-g", "daemon off;"]