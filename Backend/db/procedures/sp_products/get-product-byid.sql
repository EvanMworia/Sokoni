USE Sokoni
GO
CREATE OR ALTER PROCEDURE GetProductById(@ProductId VARCHAR(255))
AS
BEGIN
    SELECT * FROM Products WHERE ProductId = @ProductId
END