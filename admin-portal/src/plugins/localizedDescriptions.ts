import type { Block, Config, Field, Tab } from 'payload'

const DESCRIPTION_COMPONENT = '@/components/LocalizedFieldDescription'

function processField(field: Field): Field {
  // Recurse into container types first
  let processed: Field = field

  if (field.type === 'array' && 'fields' in field) {
    processed = { ...field, fields: field.fields.map(processField) }
  } else if (field.type === 'group' && 'fields' in field) {
    processed = { ...field, fields: field.fields.map(processField) }
  } else if (field.type === 'collapsible' && 'fields' in field) {
    processed = { ...field, fields: (field as { fields: Field[] }).fields.map(processField) }
  } else if (field.type === 'row' && 'fields' in field) {
    processed = { ...field, fields: (field as { fields: Field[] }).fields.map(processField) }
  } else if (field.type === 'blocks' && 'blocks' in field) {
    processed = {
      ...field,
      blocks: (field.blocks as Block[]).map((block) => ({
        ...block,
        fields: block.fields.map(processField),
      })),
    }
  } else if (field.type === 'tabs' && 'tabs' in field) {
    processed = {
      ...field,
      tabs: (field.tabs as Tab[]).map((tab) => ({
        ...tab,
        fields: tab.fields.map(processField),
      })),
    }
  }

  // Add Description component to localized fields that don't already have one
  if (
    'localized' in processed &&
    processed.localized === true &&
    !processed.admin?.components?.Description
  ) {
    return {
      ...processed,
      admin: {
        ...processed.admin,
        components: {
          ...(processed.admin?.components ?? {}),
          Description: DESCRIPTION_COMPONENT,
        },
      },
    } as Field
  }

  return processed
}

export const localizedDescriptionsPlugin = (config: Config): Config => {
  return {
    ...config,
    collections: config.collections?.map((collection) => ({
      ...collection,
      fields: collection.fields.map(processField),
    })),
    globals: config.globals?.map((global) => ({
      ...global,
      fields: global.fields.map(processField),
    })),
  }
}
