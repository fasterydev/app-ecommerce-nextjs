// PUBLIC (sin autenticación)
export * from "./public/products";
export * from "./public/brands";
export * from "./public/categories";

// CUSTOMER (requiere autenticación)
export * from "./customer/products";
export * from "./customer/categories";
export * from "./customer/brands";
export * from "./customer/shopping-carts";
export * from "./customer/sales";
export * from "./customer/favorites";
export * from "./customer/profile";

// FILES
export * from "./files/upload-file";

// ADMIN
export * from "./admin/users";
// Exportar funciones de admin con nombres específicos para evitar conflictos
export {
  createProduct as createProductAdmin,
  updateProduct as updateProductAdmin,
  deleteProduct as deleteProductAdmin,
  getProducts as getProductsAdmin,
  getProduct as getProductAdmin,
} from "./admin/products";
export {
  createBrand as createBrandAdmin,
  updateBrand as updateBrandAdmin,
  deleteBrand as deleteBrandAdmin,
  getBrands as getBrandsAdmin,
  getBrand as getBrandAdmin,
} from "./admin/brands";
export {
  createCategory as createCategoryAdmin,
  updateCategory as updateCategoryAdmin,
  deleteCategory as deleteCategoryAdmin,
  getCategories as getCategoriesAdmin,
  getCategory as getCategoryAdmin,
} from "./admin/categories";