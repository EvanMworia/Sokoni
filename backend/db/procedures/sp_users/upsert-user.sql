USE Sokoni
GO
CREATE OR ALTER PROCEDURE UpsertUser(
    @UserId VARCHAR(255),
    @Email VARCHAR (255),
    @PasswordHash VARCHAR(255),
    @Role VARCHAR(20) = 'User'
)
AS
BEGIN
IF EXISTS( SELECT 1 FROM Users WHERE UserId=@UserId)
    BEGIN
        UPDATE Users
        SET Role=@Role
        WHERE UserId=@UserId
    END
ELSE
    BEGIN
    INSERT INTO Users(UserId, Email, PasswordHash)
    VALUES (@UserId, @Email, @PasswordHash)
    END
END