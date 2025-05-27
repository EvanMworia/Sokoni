USE Sokoni
GO

CREATE OR ALTER PROCEDURE UpsertCart(
    @CartItemId VARCHAR(255),
    @UserId VARCHAR(255),
    @ProductId VARCHAR(255),
    @Quantity INT
)
AS
BEGIN
IF EXISTS(SELECT 1 FROM CartItems WHERE UserId=@UserId AND ProductId=@ProductId)
    BEGIN
    UPDATE CartItems
    SET Quantity=Quantity+1
    WHERE CartItemId=@CartItemId
    END
ELSE
    BEGIN
    INSERT INTO CartItems(CartItemId, UserId,ProductId,Quantity)
    VALUES(@CartItemId, @UserId, @ProductId, @Quantity)
    END
END