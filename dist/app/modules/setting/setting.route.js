"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const setting_controller_1 = require("./setting.controller");
const adminVerify_1 = __importDefault(require("../../../middleware/adminVerify"));
const SettingsRouter = express_1.default.Router();
SettingsRouter.post("/create-category", adminVerify_1.default, setting_controller_1.createCategory);
SettingsRouter.post("/create-subcategory", adminVerify_1.default, setting_controller_1.createSubCategory);
SettingsRouter.get("/category", setting_controller_1.getCategory);
// SettingsRouter.get("/single-category/:id", getSingleCategory);
// SettingsRouter.get("/sub-categroy", getSubCategory);
// SettingsRouter.get("/search-sub-categroy", getSearchBrand);
// SettingsRouter.get("/search-categroy", getSearchCategory);
// SettingsRouter.get("/sub-category/:id", gateDynamicSubCategory);
// SettingsRouter.get("/sub-category-id/:id", gateDynamicSubCategoryId);
// SettingsRouter.put("/category-image", adminVerify, updateCategoryImage); 
// SettingsRouter.put("/brand-image", adminVerify, updateBrandImage); 
// SettingsRouter.put("/update-category-info", adminVerify, updateCategoryInfo);
// SettingsRouter.put("/update-subcategory-info", adminVerify, updatesubCategoryInfo);
// SettingsRouter.delete("/delete-category", adminVerify, deleteCategory);
// SettingsRouter.delete("/delete-subcategory", adminVerify, deletesubCategory);
// all Routes
exports.default = SettingsRouter;
