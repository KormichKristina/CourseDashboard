FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 7126
EXPOSE 5252

ENV ASPNETCORE_ENVIRONMENT=Development

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY ["CourseService.csproj", "."]
RUN dotnet restore "CourseService.csproj"

COPY . .

RUN dotnet build "CourseService.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CourseService.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app

COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "CourseService.dll"]