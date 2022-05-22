let picker = new EmojiPicker({
    trigger: [
        {
          selector: '#emoji-btn',
          insertInto: '#msg' // '.selector' can be used without array
        },
    ],
    closeButton: false,
    dragButton: false,
    addPosX: -150,
    addPosY: -380
});
