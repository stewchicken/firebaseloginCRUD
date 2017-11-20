export interface Accident {
    $key?: string;
    lat: Number;
    lng: Number;
    imageUrl?: string;
    imagename: string;
    category:string
    handynumber:string
    status:string;
    details: string;
}