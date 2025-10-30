"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const client_1 = require("@prisma/client");
const categorias_1 = __importDefault(require("./routes/categorias"));
const cursos_1 = __importDefault(require("./routes/cursos"));
const usuarios_1 = __importDefault(require("./routes/usuarios"));
const usuariosLogin_1 = __importDefault(require("./routes/usuariosLogin"));
const matriculas_1 = __importDefault(require("./routes/matriculas"));
const avaliacoes_1 = __importDefault(require("./routes/avaliacoes"));
const admins_1 = __importDefault(require("./routes/admins"));
const adminLogin_1 = __importDefault(require("./routes/adminLogin"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
const reset_1 = __importDefault(require("./routes/reset"));
const setup_1 = __importDefault(require("./routes/setup"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
const prisma = new client_1.PrismaClient();
// Startup checks (do not print secrets)
if (!process.env.DATABASE_URL) {
    console.warn('Aviso: DATABASE_URL não definida no ambiente. O acesso ao banco provavelmente falhará.');
}
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/categorias', categorias_1.default);
app.use('/cursos', cursos_1.default);
app.use('/usuarios/login', usuariosLogin_1.default);
app.use('/usuarios', usuarios_1.default);
app.use('/matriculas', matriculas_1.default);
app.use('/avaliacoes', avaliacoes_1.default);
app.use('/admins/login', adminLogin_1.default);
app.use('/admins', admins_1.default);
app.use('/dashboard', dashboard_1.default);
app.use('/reset', reset_1.default);
app.use('/setup', setup_1.default);
app.get('/', (req, res) => res.send('API: Cursos Academy'));
// Health endpoint to check DB connectivity
app.get('/health/db', async (req, res) => {
    try {
        // simple query to verify DB connectivity
        // use raw query to avoid depending on model state
        await prisma.$queryRaw `SELECT 1`;
        res.status(200).json({ ok: true });
    }
    catch (err) {
        console.error('Health DB check failed:', err);
        res.status(500).json({ ok: false, error: 'DB connection failed' });
    }
});
app.listen(port, () => console.log(`Servidor Cursos API rodando na porta ${port}`));
