//@ts-ignore
import { infer as llm_infer, llm_generateEmbeddings } from "fermyon:spin/llm@2.0.0";
export var InferencingModels;
(function (InferencingModels) {
    InferencingModels["Llama2Chat"] = "llama2-chat";
    InferencingModels["CodellamaInstruct"] = "codellama-instruct";
})(InferencingModels || (InferencingModels = {}));
export var EmbeddingModels;
(function (EmbeddingModels) {
    EmbeddingModels["AllMiniLmL6V2"] = "all-minilm-l6-v2";
})(EmbeddingModels || (EmbeddingModels = {}));
export var infer = function (model, prompt, options) {
    var inference_options = {
        max_tokens: (options === null || options === void 0 ? void 0 : options.maxTokens) || 100,
        repeat_penalty: (options === null || options === void 0 ? void 0 : options.repeatPenalty) || 1.1,
        repeat_penalty_last_n_token_count: (options === null || options === void 0 ? void 0 : options.repeatPenaltyLastNTokenCount) || 64,
        temperature: (options === null || options === void 0 ? void 0 : options.temperature) || 0.8,
        top_k: (options === null || options === void 0 ? void 0 : options.topK) || 40,
        top_p: (options === null || options === void 0 ? void 0 : options.topP) || 0.9
    };
    return llm_infer(model, prompt, inference_options);
};
export var generateEmbeddings = function (model, text) {
    return llm_generateEmbeddings(model, text);
};
