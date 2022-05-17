let picker = new EmojiPicker({
    trigger: [
        {
          selector: '#emoji-btn',
          insertInto: '#msg' // '.selector' can be used without array
        },
    ],
    closeButton: false,
    dragButton: false,
    addX: -160,
    addY: -410
});
