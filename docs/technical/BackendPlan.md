# Backend Plan

Create solution:

```bash
dotnet new sln -n LifeOS
dotnet new webapi -n LifeOS.Api
dotnet new classlib -n LifeOS.Domain
dotnet new classlib -n LifeOS.Application
dotnet new classlib -n LifeOS.Infrastructure
dotnet new xunit -n LifeOS.Tests
```

Add references according to Clean Architecture.
