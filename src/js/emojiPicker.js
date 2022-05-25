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
    addPosY: -380,
    emojiDim: {
      hideCategory: true,
      emojiSize: 33,
      emojiPerRow: 4,
      emojiButtonHeight: 60
    }
});
