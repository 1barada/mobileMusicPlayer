export default function durationToString(miliseconds: number): string {
    const minutes = Math.floor(miliseconds / 60000);
    const seconds = parseInt(((miliseconds % 60000) / 1000).toFixed(0));
    const result = (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    //console.log(result + ': ' + miliseconds)
    return result;
}