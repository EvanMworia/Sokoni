USE Sokoni
GO
CREATE OR ALTER PROCEDURE DeleteCartItem
    @CartItemId VARCHAR(255)
AS
BEGIN
    DELETE FROM CartItems
    WHERE CartItemId = @CartItemId;
END;
