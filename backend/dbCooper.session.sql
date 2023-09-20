-- Create Users table
CREATE TABLE Users (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    FullName VARCHAR(255),
    CreatedAt DATETIME,
    UpdatedAt DATETIME
);

-- Create ErrorLogs table
CREATE TABLE ErrorLogs (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Timestamp DATETIME,
    Severity VARCHAR(255),
    Message TEXT,
    Source VARCHAR(255),
    StackTrace TEXT,
    UserID INT,
    FOREIGN KEY (UserID) REFERENCES Users(ID)
);

-- Create UserACL table
CREATE TABLE UserACL (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    Resource VARCHAR(255),
    Permission VARCHAR(255),
    FOREIGN KEY (UserID) REFERENCES Users(ID)
);

-- Create Roles table
CREATE TABLE Roles (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    RoleName VARCHAR(255)
);

-- Create UserSessions table
CREATE TABLE UserSessions (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    SessionToken VARCHAR(255),
    ExpirationTime DATETIME,
    CreatedAt DATETIME,
    UpdatedAt DATETIME,
    FOREIGN KEY (UserID) REFERENCES Users(ID)
);

-- Create AuditLogs table
CREATE TABLE AuditLogs (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Timestamp DATETIME,
    UserID INT,
    Action VARCHAR(255),
    Description TEXT,
    FOREIGN KEY (UserID) REFERENCES Users(ID)
);

-- Create Permissions table
CREATE TABLE Permissions (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255),
    Description TEXT
);

-- Create UserRoles table
CREATE TABLE UserRoles (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    RoleID INT,
    FOREIGN KEY (UserID) REFERENCES Users(ID),
    FOREIGN KEY (RoleID) REFERENCES Roles(ID)
);

-- Create RolePermissions table
CREATE TABLE RolePermissions (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    RoleID INT,
    PermissionID INT,
    FOREIGN KEY (RoleID) REFERENCES Roles(ID),
    FOREIGN KEY (PermissionID) REFERENCES Permissions(ID)
);

--@block
SELECT USER();
SELECT CURRENT_USER();

--@block
SELECT DATABASE();