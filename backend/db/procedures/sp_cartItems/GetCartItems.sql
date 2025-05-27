USE Sokoni
GO
CREATE OR ALTER PROCEDURE GetCartItems
    @UserId VARCHAR(255)
AS
BEGIN
    SELECT 
    CartItems.CartItemId,
    CartItems.ProductId,
    CartItems.Quantity,
    CartItems.DateAdded,
    Products.Name,
    Products.Price
FROM CartItems
INNER JOIN Products ON CartItems.ProductId = Products.ProductId
WHERE CartItems.UserId = @UserId
ORDER BY CartItems.DateAdded DESC;

END;
