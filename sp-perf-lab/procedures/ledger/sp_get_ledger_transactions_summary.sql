-- Ledger transactions summary procedure
-- Usage: CALL sp_get_ledger_transactions_summary(0, UTC_TIMESTAMP() - INTERVAL 7 DAY, UTC_TIMESTAMP());
DELIMITER $$
DROP PROCEDURE IF EXISTS `sp_get_ledger_transactions_summary` $$
CREATE PROCEDURE `sp_get_ledger_transactions_summary`(
    IN p_user_id INT,
    IN p_start   DATETIME,
    IN p_end     DATETIME
)
BEGIN
    IF p_start IS NULL THEN SET p_start = '1970-01-01 00:00:00'; END IF;
    IF p_end   IS NULL THEN SET p_end   = UTC_TIMESTAMP(); END IF;

    SELECT
        COUNT(*)                              AS row_count,
        COALESCE(SUM(TotalPaid),0)            AS total_paid_sum,
        COALESCE(SUM(TotalWithoutFees),0)     AS total_without_fees_sum,
        COALESCE(SUM(CardFee),0)              AS card_fee_sum,
        COALESCE(SUM(ACHPaid),0)              AS ach_paid_sum,
        COALESCE(SUM(CashPaid),0)             AS cash_paid_sum,
        COALESCE(SUM(CheckPaid),0)            AS check_paid_sum,
        COALESCE(SUM(CardPaid),0)             AS card_paid_sum,
        COALESCE(SUM(BadCheckFee),0)          AS bad_check_fee_sum,
        MIN(TransactionDate)                  AS first_txn,
        MAX(TransactionDate)                  AS last_txn
    FROM ledgertransaction
    WHERE TransactionDate BETWEEN p_start AND p_end
      AND (p_user_id = 0 OR UserID = p_user_id);
END $$
DELIMITER ;
