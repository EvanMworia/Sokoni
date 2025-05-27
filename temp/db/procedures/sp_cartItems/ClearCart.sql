USE Sokoni
GO
CREATE OR ALTER PROCEDURE DeleteAllCartItemsForUser
    @UserId VARCHAR(255)
AS
BEGIN
    DELETE FROM CartItems
    WHERE UserId = @UserId;
END;
