import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Marharyta Anisko — UX/UI Designer portfolio.',
  images: [
    {
      url: `${getServerSideURL()}/og-image.jpg`,
      width: 1200,
      height: 630,
      alt: 'Marharyta Anisko — Product & UX/UI Designer',
    },
  ],
  siteName: 'Marharyta Anisko',
  title: 'Marharyta Anisko — Design Portfolio',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
