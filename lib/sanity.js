import { createClient } from '@sanity/client'

export const client = createClient({
    projectId: 'l23a5gbu', // Restored your project ID
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: true,
})