const mysql = require("mysql");

module.exports ={
    createProduct: async (pool, productName, imgesUrl, categoryId, price, stock) => {
        var sql = "INSERT INTO products (product_name, imgesUrl, category_id, price) "
                + "VALUES (?, ?, ?, ?)";
        sql = mysql.format(sql, [productName, imgesUrl, categoryId, price]);

        return await pool.query(sql);
    },

    getByProductId: async (pool, productId) => {
    var sql = "SELECT a.*, b.category_name FROM "
                + "products a "
                + "JOIN category b ON a.category_id = b.category_id "
                + "WHERE product_id = ?";

    sql = mysql.format(sql, [productId]);
    
    return await pool.query(sql);
},

updateProduct: async (pool, productId, productName, imgesUrl, categoryId, price) => {
    var sql = "UPDATE products SET "
            + "product_name=?,"
            + "imgesUrl=?,"
            + "category_id=?,"
            + "price=?,"
            + "WHERE product_id = ?";
    sql = mysql.format(sql, [productName, imgesUrl, categoryId, price, productId]);

    return await pool.query(sql);
},
deleteProduct: async (pool, productId) => {
    var sql = "DELETE FROM products WHERE product_id = ?";
    sql = mysql.format(sql, [productId]);

    return await pool.query(sql);
},
updateImage: async (pool, productId, filename) => {
    var sql = "UPDATE products SET image_url = ? "
                + "WHERE product_id = ?";
        sql = mysql.format(sql, [filename, productId]);

        return await pool.query(sql);
},
getSumProduct: async (pool) => {
    var sql = "SELECT a.category_id,"
                + "b.category_name,"
                + "COUNT(a.product_id) AS product_count "
                + "FROM products a "
                + "JOIN category b ON a.category_id = b.category_id "
                + "GROUP BY a.category_id, b.category_name";

    return await pool.query(sql);
},

getByProductDetail: async (pool, productId) => {
    var sql =  `SELECT * FROM product_variants as pv 
                INNER JOIN product_size as ps on pv.size_id = ps.size_id
                INNER JOIN color as clr on pv.color_id = clr.color_id
                WHERE pv.product_id = ? 
                ORDER BY ps.size_id ASC`
                sql = mysql.format(sql, [productId]);

        
        return await pool.query(sql);
}

}