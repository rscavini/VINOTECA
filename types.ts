
export interface WineData {
    nombre_vino: string;
    anada: string;
    uva: string;
    region: string;
}

export interface Wine extends WineData {
    id: string;
    imageDataUrl: string;
}
