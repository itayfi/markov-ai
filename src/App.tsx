import { Component, createResource, createSignal, For } from 'solid-js';
import Button from './Button';
import { getModelNames } from './models';
import getSuggestion from './ModelWrapper';
import TextArea from './TextArea';

const App: Component = () => {
  const modelFromUrl = new URLSearchParams(window.location.search).get('model');
  const [modelName, setModelName] = createSignal(modelFromUrl || 'en');
  const [enteredText, setEnteredText] = createSignal('');
  const [allModels] = createResource<string[], string>(getModelNames);
  const [suggestion, { refetch }] = createResource<string, [string, string]>(
    () => [modelName(), enteredText()],
    async (args) => (await getSuggestion(...args)).text,
    { initialValue: '▂▂▂▂▂▂▂▂\n▂▂▂▂▂▂▂▂' }
  );

  const updateModel = (e: Event) => {
    const newModel = (e.currentTarget as HTMLSelectElement).value;
    setModelName(newModel);
    window.history.pushState({}, '', `?model=${newModel}`);
  }

  return (
    <div class="px-10 py-5">
      <div class="py-10 lg:py-20">
        <p class="text-4xl text-center py-1">
          <img src="/favicon.png" class="h-9 inline-block align-top mr-1.5 mt-0.5" />
          Markov AI
        </p>
        <p class="text-center text-gray-500 dark:text-gray-400 italic">
          Text generator, with 100 year old technology.
        </p>
      </div>
      <div class="flex justify-center">
        <span>Select model:</span>
        <select onChange={updateModel} class="ml-2 border-2 border-gray-300 focus:outline-green-500 rounded-md bg-white dark:bg-gray-800">
          <For each={allModels()}>
            {(model) => <option value={model} selected={modelName() === model}>{model}</option>}
          </For>
        </select>
      </div>
      <div class="flex flex-col items-center py-10 text-center space-y-4">
        <TextArea
          value={enteredText()} onChange={setEnteredText}
          suggestion={suggestion()} loading={suggestion.loading} />
        <div class="flex space-x-4">
          <Button onClick={() => navigator.clipboard.writeText(suggestion())}>Copy</Button>
          <Button onClick={refetch}>Generate Again</Button>
        </div>
      </div>
    </div>
  );
};

export default App;
