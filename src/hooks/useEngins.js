// hooks/useEngins.js
import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { createEngin, deleteEngin, fetchEngins, updateEngin } from '../api/enginApi';

export const fecthEnginsQuery = () => {
    return queryOptions({
        queryKey: ["enginsList"], // Clé de requête
        queryFn: fetchEngins
    });
};

export const useCreateEngin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createEngin,
        onSuccess: () => {
            queryClient.invalidateQueries(['enginsList']); // Rafraîchir la liste des engins
        }
    });
};

export const useUpdateEngin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateEngin,
        onSuccess: () => {
            queryClient.invalidateQueries(['enginsList']);
        }
    });
}

export const useDeleteEngin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteEngin,
        onSuccess: () => {
            queryClient.invalidateQueries(['enginsList']);
        }
    });
};