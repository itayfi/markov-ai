import Model from "./Model";
import { getModel } from "./models";

export type PredictionRequest = {
    model: string,
    text: string,
    length: number
};
export type PredictionResponse = {
    model: string,
    text: string
};

let MODELS = new Map<string, Model>();

onmessage = async (event: MessageEvent<PredictionRequest>) => {
    if (!MODELS.has(event.data.model)) {
        MODELS.set(event.data.model, await getModel(event.data.model));
    }
    const model = MODELS.get(event.data.model);
    const text = model.getSuggestion(event.data.text, event.data.length);
    postMessage({
        model: event.data.model,
        text
    });
}