// // models/userModel.js
// const userData = require('../data.json');
// const mysql = require('mysql2/promise');
// const config = require('../config');

// const pool = mysql.createPool(config);

// // module.exports = {
// //   getUserData: () => userData,
// //   getProducts: () => userData.products,

// // };

// module.exports = {
//   getUserData: async () => {
//     // Assuming you have some user data logic using MySQL queries
//     // Example: const [rows, fields] = await pool.query('SELECT * FROM users');
//     // Modify this based on your actual MySQL queries
//     // Return the fetched data
//   },
//   getProducts: async (skip, limit) => {
//     try {
//       const [rows, fields] = await pool.query(
//         'SELECT * FROM products LIMIT ?, ?',
//         [skip, limit]
//       );

//       const totalProducts = await pool.query('SELECT COUNT(*) as total FROM products');

//       return {
//         products: rows,
//         total: totalProducts[0][0].total,
//         skip,
//         limit,
//       };
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       throw error;
//     }
//   },
// };

// models/userModel.js
const mysql = require('mysql2/promise');
const config = require('../config');

const pool = mysql.createPool(config);

module.exports = {
  getProducts: async (skip, limit) => {
    try {
      const [rows, fields] = await pool.query(
        'SELECT * FROM products LIMIT ?, ?',
        [skip, limit]
      );

      const totalProducts = await pool.query('SELECT COUNT(*) as total FROM products');

      return {
        products: rows,
        total: totalProducts[0][0].total,
        skip,
        limit,
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  getProductById: async (productId) => {
    try {
      const [rows, fields] = await pool.query('SELECT * FROM products WHERE ProductID = ?', [productId]);

      if (rows.length > 0) {
        return rows[0];
      } else {
        return null; // Product not found
      }
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      throw error;
    }
  },
};

