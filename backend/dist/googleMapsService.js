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
exports.calcularDistancia = calcularDistancia;
const axios_1 = __importDefault(require("axios"));
function calcularDistancia(origem, destino) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiKey = process.env.GOOGLE_API_KEY;
        if (!apiKey) {
            throw new Error("GOOGLE_API_KEY não está definida no arquivo .env");
        }
        // URL para chamar a API Distance Matrix
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origem}&destinations=${destino}&key=${apiKey}`;
        try {
            // Realiza a requisição GET
            const resposta = yield axios_1.default.get(url);
            // Extrair dados de distância e duração
            const distancia = resposta.data.rows[0].elements[0].distance.text; // Exemplo: '10 km'
            const duracao = resposta.data.rows[0].elements[0].duration.text; // Exemplo: '1h 30min'
            return { distance: distancia, duration: duracao };
        }
        catch (error) {
            console.error('Erro ao calcular a distância:', error);
            throw new Error('Não foi possível calcular a distância.');
        }
    });
}
