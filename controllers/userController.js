// // controllers/userController.js
// const userModel = require('../models/userModel');

// // const renderIndex = (req, res) => {
// //   const products = userModel.getProducts();
// //   res.render('index', { products });
// // };

// // const renderProducts = (req, res) => {
// //     const products = userModel.getProducts();
// //     res.render('products', { products });
// //   };

//   // const renderProducts = (req, res) => {
//   //   const id = req.params.id;
//   //   const products = userModel.getProducts();
//   //   const product = products[id - 1];
//   //   res.render('products', { product });
//   // }

//   const renderIndex = async (req, res) => {
//     const data = await userModel.getUserData();
//     res.render('index', { data });
//   };
  
//   const renderProducts = async (req, res) => {
//     const { skip = 0, limit = 30 } = req.query;
  
//     try {
//       const productsData = await userModel.getProducts(parseInt(skip), parseInt(limit));
//       res.json(productsData);
//     } catch (error) {
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   };
  
//   module.exports = {
//     renderIndex,
//     renderProducts,
//   };

// controllers/userController.js
const userModel = require('../models/userModel');

const renderIndex = async (req, res) => {
  const { skip = 0, limit = 30 } = req.query;

  try {
    const productsData = await userModel.getProducts(parseInt(skip), parseInt(limit));
    res.render('index', { productsData });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const renderProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await userModel.getProductById(productId);

    if (product) {
      res.render('products', { product });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  renderIndex,
  //renderProduct,
  renderProductById,
};
