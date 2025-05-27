USE Sokoni
GO
CREATE OR ALTER PROCEDURE InsertCartItem
    @CartItemId VARCHAR(255),
    @UserId VARCHAR(255),
    @ProductId VARCHAR(255),
    @Quantity INT
AS
BEGIN
    -- Validate Quantity
    IF @Quantity <= 0
    BEGIN
        RAISERROR('Quantity must be greater than zero.', 16, 1);
        RETURN;
    END

    -- Ensure the item doesn't already exist
    IF EXISTS (SELECT 1 FROM CartItems WHERE UserId = @UserId AND ProductId = @ProductId)
    BEGIN
        RAISERROR('Cart item already exists. Use UpdateCartItemQuantity instead.', 16, 1);
        RETURN;
    END

    -- Insert new cart item
    INSERT INTO CartItems (CartItemId, UserId, ProductId, Quantity, DateAdded)
    VALUES (@CartItemId, @UserId, @ProductId, @Quantity, GETDATE());
END;
