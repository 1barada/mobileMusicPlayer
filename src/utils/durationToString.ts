export default function durationToString(miliseconds: number): string {
    const minutes = Math.floor(miliseconds / 60000);
    const seconds = parseInt(((miliseconds % 60000) / 1000).toFixed(0));
    return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
}