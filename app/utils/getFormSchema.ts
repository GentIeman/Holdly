const forms = import.meta.glob('~~/layers/*/schemas/*.json', {
    eager: true,
    import: 'default'
})

export type FormSchema = {
    legend: string
    fields: {
        name: string
        label?: string
        placeholder?: string
        size?: "xs" | "sm" | "md" | "lg" | "xl"
        autocomplete?: boolean
        required?: boolean
    }[]
    button: {
        label?: string
        block?: boolean
        size?: "xs" | "sm" | "md" | "lg" | "xl"
        type?: "submit" | "reset" | "button"
    }
}

export default function(layer: string, formName: string) {
    const path = `../layers/${layer}/schemas/${formName}.json`
    const schema = forms[path]
    if (!schema) {
        throw new Error(`Schema "${formName}" not found in layer "${layer}"`)
    }
    return schema as FormSchema
}