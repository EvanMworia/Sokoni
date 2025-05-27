USE Sokoni
GO
CREATE OR ALTER PROCEDURE UpsertProducts(
    @ProductId VARCHAR(255),
    @Name VARCHAR(255),
    @ImageUrl VARCHAR(MAX),
    @Price DECIMAL(18, 2),
    @Description VARCHAR(MAX),
    @Stock INT)

    AS
    BEGIN
    IF EXISTS (SELECT 1 FROM Products WHERE ProductId=@ProductId)
    BEGIN
        UPDATE Products
        SET Name=@Name, ImageUrl=@ImageUrl, Price=@Price, Description=@Description, Stock=@Stock
        WHERE ProductId=@ProductId
    END
    ELSE
    BEGIN
        INSERT INTO Products (ProductId, Name, ImageUrl, Price, Description, Stock)
        VALUES (@ProductId, @Name, @ImageUrl, @Price, @Description, @Stock)
    END
    END


