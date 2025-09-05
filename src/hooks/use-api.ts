import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Generic API hook for GET requests
export function useApiQuery<T>(
  key: string[],
  fetcher: () => Promise<T>,
  options?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchOnMount?: boolean | "always"
    refetchOnWindowFocus?: boolean
  }
) {
  return useQuery({
    queryKey: key,
    queryFn: fetcher,
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime,
    gcTime: options?.gcTime,
    refetchOnMount: options?.refetchOnMount,
    refetchOnWindowFocus: options?.refetchOnWindowFocus,
  })
}

// Generic API hook for mutations (POST, PUT, DELETE)
export function useApiMutation<T, V>(
  mutationFn: (variables: V) => Promise<T>,
  options?: {
    onSuccess?: (data: T, variables: V) => void
    onError?: (error: Error, variables: V) => void
    invalidateQueries?: string[][]
  }
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn,
    onSuccess: (data, variables) => {
      // Invalidate and refetch queries
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey })
        })
      }
      
      options?.onSuccess?.(data, variables)
    },
    onError: (error, variables) => {
      options?.onError?.(error, variables)
    },
  })
}

// Hook for optimistic updates
export function useOptimisticMutation<T, V>(
  mutationFn: (variables: V) => Promise<T>,
  options: {
    queryKey: string[]
    updateFn: (oldData: T | undefined, variables: V) => T
    onSuccess?: (data: T, variables: V) => void
    onError?: (error: Error, variables: V) => void
  }
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn,
    onMutate: async (variables) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: options.queryKey })

      // Snapshot the previous value
      const previousData = queryClient.getQueryData<T>(options.queryKey)

      // Optimistically update to the new value
      queryClient.setQueryData<T>(options.queryKey, (old) =>
        options.updateFn(old, variables)
      )

      // Return a context object with the snapshotted value
      return { previousData }
    },
    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousData) {
        queryClient.setQueryData(options.queryKey, context.previousData)
      }
      options.onError?.(err, variables)
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: options.queryKey })
    },
    onSuccess: options.onSuccess,
  })
}

