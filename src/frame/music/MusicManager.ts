export class MusicManager {

    // 资源根目录
    public static MusicBasePath: string = "resources/audio/";
    
    /**播放音效 */
    public static onPlaySound(name: string, base: string = this.MusicBasePath) {
        Laya.SoundManager.playSound(base + name + ".mp3", 1);
    }

    /**播放音效 */
    public static onPlaySoundByNameAndBasePath(name: string, base: string = this.MusicBasePath) {
        Laya.SoundManager.playSound(base + name + ".mp3", 1);
    }

    /**播放背景音乐 */
    public static onPlayMusic(path: string, base: string = this.MusicBasePath) {
        Laya.SoundManager.playMusic(base + path + ".mp3", 0);
    }

    /**停止播放背景音乐 */
    public static onStopMusic() {
        Laya.SoundManager.stopMusic();
    }

    /**调节音效音量 */
    public static set SoundVolume(volume: number) {
        Laya.SoundManager.setSoundVolume(volume);
    }

    public static get SoundVolume(): number {
        return Laya.SoundManager.soundVolume;
    }

    /**调节背景音量 */
    public static set MusicVolume(volume: number) {
        Laya.SoundManager.setMusicVolume(volume);
    }

    public static get MusicVolume(): number {
        return Laya.SoundManager.musicVolume;
    }

    /**设置是否为静音 */
    public static set IsMusicState(boo: boolean) {
        Laya.SoundManager.musicMuted = boo;
    }

    public static get IsMusicState(): boolean {
        return Laya.SoundManager.musicMuted;
    }

    /**设置音效是否为静音 */
    public static set IsSoundState(boo: boolean) {
        Laya.SoundManager.soundMuted = boo;
    }

    public static get IsSoundState(): boolean {
        return Laya.SoundManager.soundMuted;
    }

}

