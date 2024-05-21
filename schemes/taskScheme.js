const z = require('zod')

const taskScheme = z.object({
  description: z.string({
    invalid_type_error: 'Task description must be a string',
    required_error: 'Task description is required'
  }),
  project: z.string().default('General'),
  complete: z.boolean({
    invalid_type_error: 'isActive must be a boolean'
  }).default(false)
})

const validateTask = (object) => taskScheme.safeParse(object)
// returns a safeParse with description as optional
const validatePartialTask = (object) => {
  const partialTaskScheme = taskScheme.partial({
    description: true
  })
  return partialTaskScheme.safeParse(object)
}

module.exports = {
  validateTask,
  validatePartialTask
}
