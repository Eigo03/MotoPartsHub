# MotoPartsHub

MotoPartsHub is a motorcycle parts inventory and catalog system created for Web Frameworks.

## Technologies Used
- ASP.NET MVC
- AngularJS
- Entity Framework
- Chart.js
- MariaDB / MySQL via XAMPP and phpMyAdmin

## Main Features
- Admin dashboard
- Parts management
- Categories management
- Shops management
- Stock logs
- Users management
- Inquiries
- Reports
- Dynamic charts

## Dynamic Charts
1. Bar Chart - Parts per Category
2. Doughnut Chart - Parts per Shop
3. Pie Chart - Stock Status
4. Line Chart - Stock Changes Over Time

## GitHub Workflow
- main branch: final stable version
- dev branch: development branch
- qa branch: testing branch

## Database Setup
1. Open XAMPP and start Apache and MySQL.
2. Go to `http://localhost/phpmyadmin`.
3. Create a database named `motopartshub`.
4. Import `database/motopartshub.sql`.
5. Check the database connection string in `Web.config`.
6. Run the project in Visual Studio.

## System Flow
The admin can manage parts, categories, shops, users, inquiries, stock logs, and reports. The dashboard charts are dynamic because the labels and values come from the database through C# JsonResult methods and are rendered using AngularJS and Chart.js.
