import Model, { ModelData } from "./Model";

const models = import.meta.glob('./models/*.json');

export function getModelNames() {
    return Object.keys(models).map(key => key.match(/([^/]*)\.json/)[1]);
}

export async function getModel(name: string): Promise<Model> {
    const data = await models[`./models/${name}.json`]() as { default: ModelData };
    return new Model(data.default as ModelData);
}
