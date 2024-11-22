"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const googleMapsService_1 = require("./googleMapsService");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Rota para calcular a distância
app.post('/calcular-distancia', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { origem, destino } = req.body;
    if (!origem || !destino) {
        return res.status(400).json({ error: 'Origem e destino são obrigatórios.' });
    }
    try {
        const { distance, duration } = yield (0, googleMapsService_1.calcularDistancia)(origem, destino);
        return res.json({ distance, duration });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}));
// Definir a porta do servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Backend rodando na porta ${PORT}`);
});
