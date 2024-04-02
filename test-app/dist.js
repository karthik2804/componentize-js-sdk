import * as __WEBPACK_EXTERNAL_MODULE_wasi_http_types_0_2_0_12fd8b15__ from "wasi:http/types@0.2.0";
import * as __WEBPACK_EXTERNAL_MODULE_fermyon_spin_llm_2_0_0_292570d5__ from "fermyon:spin/llm@2.0.0";
/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  H: () => (/* binding */ incomingHandler)
});

;// CONCATENATED MODULE: external "wasi:http/types@0.2.0"
var x = (y) => {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = (x) => (() => (x))
const types_0_2_0_namespaceObject = x({ ["Fields"]: () => (__WEBPACK_EXTERNAL_MODULE_wasi_http_types_0_2_0_12fd8b15__.Fields), ["OutgoingResponse"]: () => (__WEBPACK_EXTERNAL_MODULE_wasi_http_types_0_2_0_12fd8b15__.OutgoingResponse), ["ResponseOutparam"]: () => (__WEBPACK_EXTERNAL_MODULE_wasi_http_types_0_2_0_12fd8b15__.ResponseOutparam) });
;// CONCATENATED MODULE: ../spin-sdk/dist/http.js
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};

var decoder = new TextDecoder();
var SimpleHTTP = /** @class */ (function () {
    function SimpleHTTP() {
        this.handle = this.handle.bind(this);
        this.handleRequest = this.handleRequest.bind(this);
    }
    SimpleHTTP.prototype.handleRequest = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw "not implemented";
            });
        });
    };
    SimpleHTTP.prototype.handle = function (request, response_out) {
        return __awaiter(this, void 0, void 0, function () {
            var method, request_body, request_stream, body, _a, _b, e_1, request_uri, url, response, response_body, response_stream, simple_body, MAX_BLOCKING_WRITE_SIZE, offset, count;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        method = request.method();
                        request_body = request.consume();
                        request_stream = request_body.stream();
                        body = new Uint8Array();
                        _d.label = 1;
                    case 1:
                        if (false) {}
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 4, , 5]);
                        _a = Uint8Array.bind;
                        _b = [__spreadArray([], body, true)];
                        return [4 /*yield*/, request_stream.blockingRead(16 * 1024)];
                    case 3:
                        body = new (_a.apply(Uint8Array, [void 0, __spreadArray.apply(void 0, _b.concat([_d.sent(), true]))]))();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _d.sent();
                        if (((_c = e_1.payload) === null || _c === void 0 ? void 0 : _c.tag) === "closed") {
                            return [3 /*break*/, 6];
                        }
                        throw (e_1);
                    case 5: return [3 /*break*/, 1];
                    case 6:
                        request_uri = request.pathWithQuery();
                        url = request_uri ? request_uri : "/";
                        response = new types_0_2_0_namespaceObject.OutgoingResponse(new types_0_2_0_namespaceObject.Fields());
                        response_body = response.body();
                        response.setStatusCode(200);
                        types_0_2_0_namespaceObject.ResponseOutparam.set(response_out, { tag: "ok", val: response });
                        response_stream = response_body.write();
                        return [4 /*yield*/, this.handleRequest()];
                    case 7:
                        simple_body = _d.sent();
                        if (simple_body) {
                            MAX_BLOCKING_WRITE_SIZE = 4096;
                            offset = 0;
                            while (offset < simple_body.length) {
                                count = Math.min(simple_body.length - offset, MAX_BLOCKING_WRITE_SIZE);
                                response_stream.blockingWriteAndFlush(simple_body.slice(offset, offset + count));
                                offset += count;
                            }
                        }
                        response_stream.drop();
                        OutgoingBody.finish(response_body, { tag: "none" });
                        return [2 /*return*/];
                }
            });
        });
    };
    return SimpleHTTP;
}());


;// CONCATENATED MODULE: external "fermyon:spin/llm@2.0.0"
var llm_2_0_0_x = (y) => {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var llm_2_0_0_y = (x) => (() => (x))
const llm_2_0_0_namespaceObject = llm_2_0_0_x({ ["infer"]: () => (__WEBPACK_EXTERNAL_MODULE_fermyon_spin_llm_2_0_0_292570d5__.infer), ["llm_generateEmbeddings"]: () => (__WEBPACK_EXTERNAL_MODULE_fermyon_spin_llm_2_0_0_292570d5__.llm_generateEmbeddings) });
;// CONCATENATED MODULE: ../spin-sdk/dist/llm.js
//@ts-ignore

var InferencingModels;
(function (InferencingModels) {
    InferencingModels["Llama2Chat"] = "llama2-chat";
    InferencingModels["CodellamaInstruct"] = "codellama-instruct";
})(InferencingModels || (InferencingModels = {}));
var EmbeddingModels;
(function (EmbeddingModels) {
    EmbeddingModels["AllMiniLmL6V2"] = "all-minilm-l6-v2";
})(EmbeddingModels || (EmbeddingModels = {}));
var infer = function (model, prompt, options) {
    var inference_options = {
        max_tokens: (options === null || options === void 0 ? void 0 : options.maxTokens) || 100,
        repeat_penalty: (options === null || options === void 0 ? void 0 : options.repeatPenalty) || 1.1,
        repeat_penalty_last_n_token_count: (options === null || options === void 0 ? void 0 : options.repeatPenaltyLastNTokenCount) || 64,
        temperature: (options === null || options === void 0 ? void 0 : options.temperature) || 0.8,
        top_k: (options === null || options === void 0 ? void 0 : options.topK) || 40,
        top_p: (options === null || options === void 0 ? void 0 : options.topP) || 0.9
    };
    return (0,llm_2_0_0_namespaceObject.infer)(model, prompt, inference_options);
};
var generateEmbeddings = function (model, text) {
    return (0,llm_2_0_0_namespaceObject.llm_generateEmbeddings)(model, text);
};

;// CONCATENATED MODULE: ../spin-sdk/dist/index.js




;// CONCATENATED MODULE: ./src/index.js



class HttpHandler extends SimpleHTTP {
    constructor() {
        super();
    }
    async handleRequest() {
        console.log("hello")
        let res = infer(InferencingModels.Llama2Chat, "tell me a joke")
        console.log(res)
        return new TextEncoder().encode("hello world")
    }
}

const incomingHandler = new HttpHandler()


// import * as redis from "fermyon:spin/redis@2.0.0"
// const decoder = new TextDecoder()

// export const inboundRedis = {
//     handleMessage(msg) {
//         console.log(redis)
//         let test = redis.Connection.open("redis://localhost:6379")
//         console.log(decoder.decode(test.get("test")))
//         // let kv = store.open("default")
//         // console.log(kv.exists("test"))
//         console.log(decoder.decode(msg))

//     }
// }
var __webpack_exports__incomingHandler = __webpack_exports__.H;
export { __webpack_exports__incomingHandler as incomingHandler };
