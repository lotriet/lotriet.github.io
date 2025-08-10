-- Naive procedure: gets recent orders for a customer with item + product detail via multiple round-trips
DELIMITER $$
CREATE PROCEDURE sp_get_orders_naive(IN p_customer_id BIGINT, IN p_limit INT)
BEGIN
  -- Intentionally naive: N+1 pattern
  SELECT o.order_id, o.order_total_cents, o.status, o.created_utc
  FROM orders o
  WHERE o.customer_id = p_customer_id
  ORDER BY o.created_utc DESC
  LIMIT p_limit;

  -- Caller then would loop per order to get items (not here to keep naive simple)
END $$
DELIMITER ;
