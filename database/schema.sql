CREATE DATABASE IF NOT EXISTS glowstock_ai;
USE glowstock_ai;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin','staff') DEFAULT 'staff',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE suppliers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  phone VARCHAR(30),
  email VARCHAR(150),
  address VARCHAR(255)
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sku VARCHAR(40) UNIQUE NOT NULL,
  name VARCHAR(150) NOT NULL,
  brand VARCHAR(100),
  category_id INT,
  price DECIMAL(10,2) DEFAULT 0,
  stock INT DEFAULT 0,
  minimum_stock INT DEFAULT 0,
  supplier_id INT,
  batch_no VARCHAR(80),
  manufacture_date DATE,
  expiry_date DATE,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);

CREATE TABLE inventory_transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  transaction_type ENUM('IN','OUT','ADJUSTMENT') NOT NULL,
  quantity INT NOT NULL,
  reference_note VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE sales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  invoice_no VARCHAR(50) UNIQUE NOT NULL,
  total_amount DECIMAL(10,2) DEFAULT 0,
  sold_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sale_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sale_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (sale_id) REFERENCES sales(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE ai_insights (
  id INT AUTO_INCREMENT PRIMARY KEY,
  insight_type VARCHAR(80),
  message TEXT NOT NULL,
  confidence DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO categories(name) VALUES
('Makeup'),('Skincare'),('Haircare'),('Fragrance'),('Body Care');
