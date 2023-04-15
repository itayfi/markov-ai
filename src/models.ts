import Model, { ModelData } from "./Model";

const models = import.meta.glob('./models/*.json', {as: 'url'});

export function getModelNames() {
    return Object.keys(models).map(key => key.match(/([^/]*)\.json/)[1]);
}

export async function getModel(name: string): Promise<Model> {
    const respose = await fetch(await models[`./models/${name}.json`]() as string);
    const data = await respose.json() as ModelData;
    return new Model(data);
}
