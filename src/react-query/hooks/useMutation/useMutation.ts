import { MutationKey, UseMutationOptions, useMutation as useRQMutation } from '@tanstack/react-query';

import { AxiosMutationsType, mutations } from '@/services/actions';
import { ExtendedQueryMeta, StandardizedApiError } from '@/services/client/types';

import { useApiClient } from '../useApiClient';
import { DataForMutation, GetMutationParams } from './useMutation.types';

/**
 * Mutating data using this hook doesn't require specifying mutation function like it is required in react-query
 * @see https://react-query.tanstack.com/guides/mutations
 * This hook uses proper mutating strategy provided via ApiClientContext
 * @see ApiClientContextController.ts
 * */

export const useMutation = <Key extends keyof AxiosMutationsType, TError = StandardizedApiError>(
  mutation: Key,
  options?: Omit<
    UseMutationOptions<DataForMutation<Key>, TError, GetMutationParams<Key>>,
    'mutationKey' | 'mutationFn'
  > & {
    meta?: Partial<ExtendedQueryMeta>;
  },
) => {
  const { client } = useApiClient();
  const mutationFn = mutations[mutation](client);

  const mutationKey: MutationKey = [mutation];

  return useRQMutation({
    mutationKey,

    mutationFn: async (args) => (await mutationFn(args)) as DataForMutation<Key>,
    ...options,
  });
};
