import { formatDistanceToNow } from "date-fns/formatDistanceToNow"
import { fr } from "date-fns/locale";

export function formatDateAgo(theDate) {
    return formatDistanceToNow(new Date(theDate), {
        addSuffix: true,
        locale: fr,
    })
}

export const getUserRole = (user) => {
    let re = "";
    switch (user?.role) {
        case "ADMIN":
            re = `Administrateur`;
            break;

        case "SUPER_ADMIN":
            re = `Super Administrateur`;
            break;

        case "USER":
            re = `Utilisateur`;
            break;

        default:
            re = `NON ATTRIBUÉ`;
            break;
    }
    return re;
};

// CETTE FONCTION SERT POUR CREER UNE LISTE POUR PAGINATION
export function getMultiplesOf(num, mult = 10) {
    let multiples = [];

    // Si le nombre est inférieur à mult, retourner [mult]
    if (num < mult) {
        return [mult];
    }

    // Trouver les multiples de mult jusqu'à num
    const pagesNumber = Math.ceil(num / mult)

    for (let i = 1; i <= pagesNumber; i++) {
        multiples.push(mult * i);
    }

    return multiples;
}


// EXCEL EXPORT
import * as XLSX from "xlsx";
import { format } from 'date-fns';
export const exportExcel = (tableId, title = "exportedData") => {
    const dateNow = new Date()
    const formattedDate = format(dateNow, 'dd_MM_yyyy_HH_mm_ss');
    const table = document.getElementById(tableId);
    const workbook = XLSX.utils.table_to_book(table);
    XLSX.writeFile(workbook, `${title + "_" + formattedDate}.xlsx`);
};
