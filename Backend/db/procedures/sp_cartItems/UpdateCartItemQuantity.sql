USE Sokoni
GO
CREATE OR ALTER PROCEDURE UpdateCartItemQuantity
    @UserId VARCHAR(255),
    @ProductId VARCHAR(255),
    @Quantity INT -- This can be the amount to add or the new quantity based on your app logic
AS
BEGIN
    -- Validate Quantity
    IF @Quantity <= 0
    BEGIN
        RAISERROR('Quantity must be greater than zero.', 16, 1);
        RETURN;
    END

    -- Check if item exists
    IF NOT EXISTS (SELECT 1 FROM CartItems WHERE UserId = @UserId AND ProductId = @ProductId)
    BEGIN
        RAISERROR('Cart item does not exist. Use InsertCartItem instead.', 16, 1);
        RETURN;
    END

    -- Update quantity: here we add the quantity, but you can change to SET Quantity = @Quantity if needed
    UPDATE CartItems
    SET Quantity = Quantity + @Quantity
    WHERE UserId = @UserId AND ProductId = @ProductId;
END;
