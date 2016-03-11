# "Fun" Fighters!

####This is a web project for "Fun" Fighters - an RPG fighting game
####By: Will Johnson, Neil Larion, Manny Cutler and Sean Peerenboom

## Description

###This project is allows the user to create fighters and then pit them against eachother in battle. It also meets the following criteria:
* User can create, show and fight characters.
* User can create standard character images to be used in fighter creation.

This project was developed during "Team Week" at Epicodus lasting 4 working days.

## Setup/Installation Requirements
- Clone this repository.
- Use the scripts.sql in the root directory to make the databases. Or follow these commands in SQLCMD/SQL Server to create the Fun_Fighters database:
  * CREATE DATABASE [Fun_Fighters];
  - GO
  - USE [Fun_Fighters];
  - GO
  - CREATE TABLE [dbo].[fighter_images]([id] [int] IDENTITY(1,1) NOT NULL, [name] [varchar](255) NULL, [image_path] [varchar](255) NULL) ON [PRIMARY];
  - GO
  - CREATE TABLE [dbo].[fighters]( [id] [int] IDENTITY(1,1) NOT NULL, [name] [varchar](255) NULL, [wins] [int] NULL, [losses] [int] NULL, [imageid] [int] NULL, [hp] [int] NULL, [mp] [int] NULL, [attack] [int] NULL, [speed] [int] NULL, [accuracy] [int] NULL, [luck] [int] NULL) ON [PRIMARY];
  - GO
- Install Nancy the web viewer
- Build the project using "dnu restore".
- Run the project by calling "dnx kestrel"
- I suggest chrome or chromium to run the site.

## Technologies Used
* SQL
* CSS
* HTML
* C#
* Bootstrap
* Nancy
* Razor web engine

### License

This work is licensed under a [Creative Commons Attribution 4.0 International License.](http://creativecommons.org/licenses/by/4.0/) 2016