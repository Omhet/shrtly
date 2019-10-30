const shortUrlEl = document.getElementById('short-url');
const copyButtonEl = document.getElementById('copy-button');

copyButtonEl.addEventListener('click', () => {
    copyDivToClipboard(shortUrlEl);
    copyButtonEl.classList.add('copied');
    setTimeout(() => {
        copyButtonEl.classList.remove('copied');
    }, 500);
});


// https://stackoverflow.com/questions/36639681/how-to-copy-text-from-a-div-to-clipboard/48020189#48020189
function copyDivToClipboard(node) {
    const range = document.createRange();
    range.selectNode(node);
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect
}