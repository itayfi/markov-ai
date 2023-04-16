import { Component } from "solid-js";

export type TextAreaProps = {
    suggestion?: string;
    value: string;
    loading: boolean;
    onChange: (value: string) => void;
}

const TextArea: Component<TextAreaProps> = (props) => {
    let inputField: HTMLSpanElement;

    const onKeyPress = (e: KeyboardEvent) => {
        if (e.key !== 'ArrowRight' || !isCaretAtEnd(inputField)) return;

        const fullSuggestion = props.suggestion?.substring(props.value.length);
        const nextWord = fullSuggestion?.match(/^\s*\S*/)[0];
        if (!nextWord) return;

        e.preventDefault();

        inputField.innerText += nextWord;
        props.onChange(inputField.innerText);

        setCaretToEnd(inputField);
    };

    return (
        <div class="border-2 border-gray-300 rounded-md px-4 py-2 max-w-2xl text-4xl focus-within:border-green-500 whitespace-pre-line"
            onClick={() => inputField.focus()}
            dir="auto">
            <span contentEditable
                onInput={(e) => props.onChange(e.currentTarget.innerText)}
                ref={inputField}
                onKeyUp={onKeyPress}
                class="outline-none" />
            <span class={`text-gray-400 ${props.loading ? ' animate-pulse' : ''}`}>
                {props.suggestion?.substring(props.value.length)}
            </span>
        </div>
    );
}

function setCaretToEnd(inputField: HTMLSpanElement) {
    const range = document.createRange();
    range.setStart(inputField.lastChild, inputField.lastChild?.textContent.length);
    range.setEnd(inputField.lastChild, inputField.lastChild?.textContent.length);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
}

function isCaretAtEnd(inputField: HTMLSpanElement) {
    const sRange = window.getSelection().getRangeAt(0);

    return (
        inputField.innerText.length == 0 || (
            inputField.lastChild === sRange.endContainer &&
            sRange.endOffset === sRange.endContainer.textContent.length
        )
    );
}

export default TextArea;

