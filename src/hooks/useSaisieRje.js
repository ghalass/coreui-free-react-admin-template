// hooks/useSaisieRje.js
import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { createSaisieHrm, deleteSaisiePanne, fecthSaisieRjeQuery, getSaisieHrmDay, updateSaisiePanne } from '../api/saisieRjeApi';
import { toast } from 'react-toastify';

export default function fecthSaisieRjeQueryOptions(du, enginId) {
    return queryOptions({
        queryKey: ["saisieRjeList", du, enginId],
        queryFn: () => fecthSaisieRjeQuery(du, enginId), // ✅ Fix 1: Pass function reference
        enabled: !!(du !== "" && enginId !== "") // ✅ Fix 2: Ensure boolean
    })
}

export const useCreateSaisieHrm = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createSaisieHrm,
        onSuccess: () => {
            queryClient.invalidateQueries(['saisieRjeList']);
        }
    });
};

export const useDeleteSaisiePanne = () => {
    const queryClient = useQueryClient();
    return queryOptions({
        mutationFn: deleteSaisiePanne,
        onSuccess: () => {
            toast.success("Supprimé avec succès.");
            queryClient.invalidateQueries(['saisieRjeList']);
        },
    })
}

export const useUpdateSaisiePanne = (handleCloseEditPanneModal) => {
    const queryClient = useQueryClient();
    return queryOptions({
        mutationFn: updateSaisiePanne,
        onSuccess: () => {
            handleCloseEditPanneModal();
            toast.success("Modifié avec succès.");
            queryClient.invalidateQueries(['saisieRjeList']);
        }
    });
}

export const useGetSaisieHrmDay = (du) => {
    return queryOptions({
        queryKey: ["donneesSaisieRjeList"],
        queryFn: () => getSaisieHrmDay(du),
        enabled: false, // 🔥 Désactive la requête automatique
    })

}
