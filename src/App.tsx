import { Component, createResource, createSignal, For } from 'solid-js';
import Button from './Button';
import { getModelNames } from './models';
import getSuggestion from './ModelWrapper';

const App: Component = () => {
  const modelFromUrl = new URLSearchParams(window.location.search).get('model');
  const [modelName, setModelName] = createSignal(modelFromUrl || 'en');
  const [enteredText, setEnteredText] = createSignal('');
  const [allModels] = createResource<string[], string>(getModelNames);
  const [suggestion, {refetch}] = createResource<string, [string, string]>(
    () => [modelName(), enteredText()],
    async (args) => (await getSuggestion(...args)).text,
    {initialValue: '▂▂▂▂▂▂▂▂\n▂▂▂▂▂▂▂▂'}
  );
  let inputField: HTMLElement;

  const onKeyPress = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowRight') return;
    const sRange = window.getSelection().getRangeAt(0);
    if (inputField.innerText.length > 0 && inputField.lastChild !== sRange.endContainer || sRange.endOffset !== sRange.endContainer.textContent.length) return;
    e.preventDefault();
    const fullSuggestion = suggestion()?.substring(enteredText().length);
    const nextWord = fullSuggestion?.match(/^\s*\S*/)[0];
    if (!nextWord) return;
    inputField.innerText += nextWord;
    setEnteredText(inputField.innerText);
    const range = document.createRange();
    range.setStart(inputField.lastChild, inputField.lastChild?.textContent.length);
    range.setEnd(inputField.lastChild, inputField.lastChild?.textContent.length);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
  };

  const updateModel = (e: Event) => {
    const newModel = (e.currentTarget as HTMLSelectElement).value;
    setModelName(newModel);
    window.history.pushState({}, '', `?model=${newModel}`);
  }

  return (
    <div class="p-10">
      <p class="text-4xl text-center py-20">Markov AI</p>
      <div class="flex justify-center">
        <span>Select model:</span>
        <select onChange={updateModel} class="ml-2 border-2 border-gray-300 focus:border-green-500 rounded-md bg-white dark:bg-gray-800">
          <For each={allModels()}>
            {(model) => <option value={model} selected={modelName() === model}>{model}</option>}
          </For>
        </select>
      </div>
      <div class="flex flex-col items-center py-10 text-center space-y-4">
        <div class="border-2 border-gray-300 rounded-md px-4 py-2 max-w-2xl text-4xl focus-within:border-green-500 whitespace-pre-line" onClick={(e) => inputField.focus()} tabIndex={0} dir="auto">
          <span contentEditable onInput={(e) => setEnteredText(e.currentTarget.innerText)} ref={inputField} onKeyUp={onKeyPress} class="outline-none"></span>
          <span class={`text-gray-400 ${suggestion.loading ? ' animate-pulse' : ''}`}>{suggestion()?.substring(enteredText().length)}</span>
        </div>
        <div class="flex space-x-4">
          <Button onClick={() => navigator.clipboard.writeText(suggestion())}>Copy</Button>
          <Button onClick={refetch}>Generate Again</Button>
        </div>
      </div>
    </div>
  );
};

export default App;
