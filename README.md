# EzPraxis

This project was generated with Angular CLI, currently using version 16.2.5 and uses a .NET Core backend with Entity Framework and Duende Identity Server.

# Getting Started

## Prerequisites

- Git: Download and install the latest stable version from `https://git-scm.com/downloads`.
- Node.js: Download and install the latest stable version from `https://nodejs.org/en`.
- Package Manager Console: Comes integrated with Visual Studio.
- Angular CLI: Open a terminal and run `npm install -g @angular/cli` to install Angular CLI globally.
- Visual Studio: Recommended IDE. Download it from `https://visualstudio.microsoft.com/`.
- SQL Server Express: Download and install the latest stable version from `https://www.microsoft.com/en-us/sql-server/sql-server-downloads`.
- NuGet Packages: Make sure to have installed all the necessary NuGet packages for SQL and Entity Framework. You can install them via the NuGet Package Manager Console in Visual Studio.

## Installation

- Make sure you have the credentials to access the AWS CodeCommit repository.
- Clone the repository: `git clone https://git-codecommit.us-east-2.amazonaws.com/v1/repos/EzPraxis`.

## Set Up Database

- Open the project in Visual Studio.
- Open the NuGet Package Manager Console in Visual Studio.
- Run the following commands to update or create the database:
  `Update-Database -context ApplicationDbContext`
  `Update-Database -context ConfigurationDbContext`
  `Update-Database -context PersistedGrantDbContext`
- Or alternatively, you can run:
  `dotnet ef database update --context ApplicationDbContext`
  `dotnet ef database update --context ConfigurationDbContext`
  `dotnet ef database update --context PersistedGrantDbContext`

## Set Up Angular

- Open a terminal and navigate to the `EzPraxis.Core/_ClientApp` folder.
- Run `npm install` to install all the necessary packages.

## Run the Application

- Open the project in Visual Studio.
- Run the application by pressing `F5`.
