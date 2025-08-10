-- Schema: core tables
CREATE DATABASE IF NOT EXISTS perf_lab;
USE perf_lab;

CREATE TABLE IF NOT EXISTS customers (
  customer_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  region_code CHAR(2) NOT NULL,
  created_utc DATETIME NOT NULL,
  INDEX ix_customers_region_created (region_code, created_utc)
);

CREATE TABLE IF NOT EXISTS products (
  product_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  sku VARCHAR(64) NOT NULL UNIQUE,
  name VARCHAR(200) NOT NULL,
  unit_price_cents INT NOT NULL,
  active TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS orders (
  order_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  customer_id BIGINT NOT NULL,
  order_total_cents INT NOT NULL,
  status ENUM('PENDING','PAID','CANCELLED','SHIPPED') NOT NULL,
  created_utc DATETIME NOT NULL,
  INDEX ix_orders_customer_created (customer_id, created_utc),
  INDEX ix_orders_status_created (status, created_utc),
  CONSTRAINT fk_orders_customer FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE IF NOT EXISTS order_items (
  order_item_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  order_id BIGINT NOT NULL,
  product_id BIGINT NOT NULL,
  quantity INT NOT NULL,
  line_total_cents INT NOT NULL,
  CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(order_id),
  CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES products(product_id),
  INDEX ix_order_items_order (order_id)
);
