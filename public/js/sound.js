  const sound = {
      audio:[],
      index:0,
      init:()=>{
          for(let i=0;i<8;i++){
              sound.audio.push(new Audio(sound.data));
          }
      },
      play:()=>{
          sound.audio[sound.index%sound.audio.length].play();
          sound.index += 1;
      },
      data:"../audio/type_sound.mp4",
  };