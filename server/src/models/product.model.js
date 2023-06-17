const { DataTypes } = require("sequelize");
const SequelizeSlugify = require("sequelize-slugify");
const sequelize = require("../db/init.mysql");

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
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unit_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "category_id",
      },
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 4.5,
      set: (val) => Math.round(val * 10) / 10,
    },
  },
  {
    tableName: "products",
    timestamps: false,
  }
);
SequelizeSlugify.slugifyModel(Product, {
  source: ["name"],
  slugOptions: { lower: true },
  overwrite: false,
  column: "product_slug",
});

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
    quantity: {
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

module.exports = {
  Category,
  Product,
  ProductImg,
  ProductVariant,
};
