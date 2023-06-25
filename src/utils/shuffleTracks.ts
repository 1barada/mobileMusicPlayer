import Track from "../types/Track";

export default function shuffleTracks(tracks: Track[]): Track[] {
    const result = [...tracks];
    let currentIndex = result.length;
    let randomIndex: number;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [result[currentIndex], result[randomIndex]] = [result[randomIndex], result[currentIndex]];
    }

    return result;
}