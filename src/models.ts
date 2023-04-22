import Model, { ModelData } from "./Model";
import models from "./models/index.json";

export function getModelNames() {
    return models;
}

export async function getModel(name: string): Promise<Model> {
    const respose = await fetch(await models[`./models/${name}.json`]() as string);
    const data = await respose.json() as ModelData;
    return new Model(data);
}
