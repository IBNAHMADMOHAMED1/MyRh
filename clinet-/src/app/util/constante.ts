// export list of localisations morroco
import { Localisation } from "../interfaces/interfaces";
// export list of education levels
import { EDUCAION_LEVEL } from "../interfaces/interfaces";

// constante
export const LOCALISATIONS: Localisation[] = [
    { id: 1, name: "Casablanca" },
    { id: 2, name: "Rabat" },
    { id: 3, name: "Fes" },
    { id: 4, name: "Marrakech" },
    { id: 5, name: "Tanger" },
    { id: 6, name: "Agadir" },
    { id: 7, name: "Oujda" },
    { id: 8, name: "Kenitra" },
    { id: 9, name: "Meknes" },
    { id: 10, name: "Tetouan" },
    { id: 11, name: "Safi" },
    { id: 12, name: "Mohammedia" },
    { id: 13, name: "Khouribga" },
    { id: 14, name: "Beni Mellal" },
    { id: 15, name: "Taza" },
    { id: 16, name: "Temara" },
    { id: 17, name: "Settat" },
];



export const EDUCATION_LEVELS: EDUCAION_LEVEL[] = [
    { id: 0, name: "Sans diplome"},
    { id: 1, name: "Bac "},
    { id: 2, name: "Bac + 1" },
    { id: 3, name: "Bac + 2" },
    { id: 4, name: "licence" },
    { id: 5, name: "Master" },
    { id: 6, name: "Doctorat" },
];
