export function isStale(date: Date): boolean{
    let now = Date.now();
    let diff = now - date.getTime();
    diff = diff/(1000*60);
    return diff > 5;
}