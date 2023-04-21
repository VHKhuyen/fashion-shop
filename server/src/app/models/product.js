const { DataTypes } = require("sequelize");
const SequelizeSlugify = require("sequelize-slugify");
const sequelize = require("../../config/db");

const Category = sequelize.define(
  "Category",
  {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    tableName: "categories",
    timestamps: false,
  }
);
SequelizeSlugify.slugifyModel(Category, {
  source: ["name"],
  slugOptions: { lower: true },
  overwrite: false,
  column: "slug",
});

const Product = sequelize.define(
  "Product",
  {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantity_in_stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "category",
        key: "category_id",
      },
    },
  },
  {
    tableName: "products",
    timestamps: false,
  }
);

const ProductVariant = sequelize.define(
  "ProductVariant",
  {
    product_variants_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "product_id",
      },
    },
    color: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    quantity_in_stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "product_variants",
    timestamps: false,
  }
);

const ProductImg = sequelize.define(
  "ProductImg",
  {
    img_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    imgUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "product_id",
      },
    },
  },
  {
    tableName: "product_imgs",
    timestamps: false,
  }
);

Product.hasMany(ProductImg, { foreignKey: "product_id", as: "images" });

Product.hasMany(ProductVariant, {
  foreignKey: "product_id",
  as: "variants",
});

Product.belongsTo(Category, {
  foreignKey: "category_id",
  as: "category",
});
module.exports = { Category, Product, ProductImg, ProductVariant };
