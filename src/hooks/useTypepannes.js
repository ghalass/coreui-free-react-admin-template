// hooks/useTypeparcs.js
import { useQuery, useMutation, useQueryClient, queryOptions } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { createTypepanne, deleteTypepanne, fetchTypepannes, updateTypepanne } from '../api/typepanneApi';

export const useTypepannes = () => {
    return queryOptions({
        queryKey: ['typepannes'], // Clé de requête
        queryFn: fetchTypepannes, // Fonction pour récupérer les typeparcs
    });
};

export const useCreateTypepanne = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createTypepanne,
        onSuccess: () => {
            queryClient.invalidateQueries(['typepannes']); // Rafraîchir la liste des typeparcs
            // toast.success('Typeparc ajouté avec succès !'); // Notification de succès
        },
        onError: () => {
            toast.error('Erreur lors de l\'ajout du Typepanne.'); // Notification d'erreur
        },
    });
};

export const useUpdateTypepanne = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateTypepanne,
        onSuccess: () => {
            queryClient.invalidateQueries(['typepannes']);
            // toast.success('Typeparc modifié avec succès !'); // Notification de succès
        },
        onError: () => {
            toast.error('Erreur lors de la modification du Typepanne.'); // Notification d'erreur
        },
    });
}

export const useDeleteTypepanne = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteTypepanne,
        onSuccess: () => {
            queryClient.invalidateQueries(['typepannes']);
            // toast.success('Typeparc supprimé avec succès !'); // Notification de succès
        },
        onError: () => {
            toast.error('Erreur lors de la suppression du Typepanne.'); // Notification d'erreur
        },
    });
};