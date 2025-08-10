-- Ledger transactions naive listing procedure
-- Usage: CALL sp_get_ledger_transactions_naive(0,20);
-- Note: Requires appropriate database selected (USE your_db;)
-- This script includes DELIMITER directives for MySQL clients like Workbench.
DELIMITER $$
DROP PROCEDURE IF EXISTS `sp_get_ledger_transactions_naive` $$
CREATE PROCEDURE `sp_get_ledger_transactions_naive`(
    IN p_user_id INT,
    IN p_limit   INT
)
BEGIN
    IF p_limit IS NULL OR p_limit <= 0 THEN
        SET p_limit = 20;
    END IF;

    SELECT
        ID,
        TransactionDate,
        ModifiedDate,
        TransactionMethodID,
        IsBadCheckTranaction,
        UserID,
        ACHPaid,
        CashPaid,
        CheckPaid,
        CardPaid,
        CardFee,
        BadCheckFee,
        TotalPaid,
        TotalWithoutFees,
        ReceiptOwnerName,
        ReceiptAddress1,
        ReceiptAddress2,
        ReceiptAddress3,
        ContactEmail,
        ContactPhone,
        TransactionComment
    FROM ledgertransaction
    WHERE (p_user_id = 0 OR UserID = p_user_id)
    ORDER BY TransactionDate DESC, ID DESC
    LIMIT p_limit;
END $$
DELIMITER ;
