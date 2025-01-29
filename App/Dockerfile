# Используем официальный образ ASP.NET Core Runtime в качестве базового
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 5000
EXPOSE 5001

# Используем официальный образ .NET SDK для сборки приложения
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

# Устанавливаем Node.js для сборки фронтенда
RUN apt-get update && apt-get install -y curl \
    && curl -sL https://deb.nodesource.com/setup_lts.x | bash - \
    && apt-get install -y nodejs

# Копируем файл проекта и восстанавливаем зависимости
COPY ["App/App.csproj", "App/"]
RUN dotnet restore "App/App.csproj"

# Копируем остальные файлы и собираем приложение
COPY . .
WORKDIR "/src/App"
RUN dotnet build "App.csproj" -c Release -o /app/build

# Публикуем приложение
FROM build AS publish
RUN dotnet publish "App.csproj" -c Release -o /app/publish

# Финальный этап: создаем образ на основе ASP.NET Core Runtime
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "App.dll"]
