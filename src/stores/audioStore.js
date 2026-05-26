import { defineStore } from "pinia";

export const useAudioStore = defineStore("audio", {
  state: () => ({
    audio: null, // 音频对象
    isPlaying: false,
  }),
  actions: {
    initAudio(src) {
      if (!this.audio) {
        this.audio = new Audio(src);
        this.audio.loop = true; // 设置循环播放
      }
    },
    playMusic() {
      if (this.audio && !this.isPlaying) {
        this.audio.play();
        this.isPlaying = true;
      }
    },
    stopMusic() {
      if (this.audio) {
        this.audio.pause();
        this.audio.currentTime = 0; // 重置播放进度
        this.isPlaying = false;
      }
    },
  },
});