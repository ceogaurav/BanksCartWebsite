import { createClient } from 'next-sanity'

export const client = createClient({
    projectId: 'import.meta.env.VITE_SANITY_PROJECT_ID', // <--- Paste your ID here!
    dataset: 'production',
    apiVersion: '2026-02-07', // Today's date
    useCdn: false, // False means you see updates instantly
})