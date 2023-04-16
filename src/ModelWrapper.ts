import type { PredictionResponse } from './ModelWorker';
import ModelWorker from './ModelWorker?worker';

const worker = new ModelWorker();

export default function getSuggestion(model: string, text: string, length: number = 100): Promise<PredictionResponse> {
    return new Promise((resolve, reject) => {
        worker.postMessage({ model, text, length });
        worker.onmessage = (event: MessageEvent<PredictionResponse>) => {
            if (event.data.model !== model || !event.data.text.startsWith(text))
                return;
            resolve(event.data);
        };
        worker.onerror = (event) => {
            reject(event);
        };
    });
}
