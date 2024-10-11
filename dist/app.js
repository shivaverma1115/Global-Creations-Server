"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = __importDefault(require("./app/modules/user/user.route"));
const setting_route_1 = __importDefault(require("./app/modules/setting/setting.route"));
const product_route_1 = __importDefault(require("./app/modules/product/product.route"));
const user_input_route_1 = __importDefault(require("./app/modules/user-input/user-input.route"));
const payment_route_1 = __importDefault(require("./app/modules/payment/payment.route"));
const orderSuccess_route_1 = __importDefault(require("./app/modules/OrderProduct/orderSuccess.route"));
const blog_route_1 = __importDefault(require("./app/modules/blog/blog.route"));
const team_route_1 = __importDefault(require("./app/modules/team/team.route"));
const upload_route_1 = __importDefault(require("./app/modules/upload/upload.route"));
const app = (0, express_1.default)();
// cors
app.use((0, cors_1.default)());
// parse data
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// routes
app.use("/api/user", user_route_1.default);
app.use("/api/upload", upload_route_1.default);
app.use("/api/setting", setting_route_1.default);
app.use("/api/product", product_route_1.default);
app.use("/api/user-input", user_input_route_1.default);
app.use("/api/payment", payment_route_1.default);
app.use("/api/success", orderSuccess_route_1.default);
app.use("/api/blog", blog_route_1.default);
app.use("/api/team", team_route_1.default);
exports.default = app;
