export default class SoundManager {
  #soundList: Map<string, HTMLAudioElement> = new Map();
  public install(soundName: string, audioEl: HTMLAudioElement) {
    if (this.#soundList.has(soundName)) {
      throw new Error("sound already exists");
    }
    this.#soundList.set(soundName, audioEl);
  }

  public play(soundName: string): void;
  public play(soundName: string, audioEl: HTMLAudioElement): void;
  public play(soundName: string, audioEl?: HTMLAudioElement) {
    const sound = this.find(soundName);
    if (sound) {
      sound.play();
    } else {
      if (!audioEl) throw new Error("sound not found");
      this.install(soundName, audioEl);
      audioEl.play();
    }
  }

  public find(soundName: string) {
    return this.#soundList.get(soundName);
  }

  public pause(soundName: string) {
    const sound = this.#soundList.get(soundName);

    if (!sound) {
      throw new Error("sound not found");
    }

    sound.pause();
  }
  public stop(soundName: string) {
    const sound = this.#soundList.get(soundName);

    if (!sound) {
      throw new Error("sound not found");
    }

    sound.pause();
    sound.currentTime = 0;
  }
}
