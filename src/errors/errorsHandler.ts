// import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { ErrorRequestHandler } from 'express'
import { ValidationError } from 'yup'

interface ValidationErrors {
	[key: string]: string[]
}

const errorsHandler: ErrorRequestHandler = (error, req, res, next) => {
	console.log('error type', typeof error)
	console.log(error)
	console.log('error message', error.message)

	if (error instanceof ValidationError) {
		const errors: ValidationErrors = {}

		error.inner.forEach((err: any) => {
			errors[err.path] = err.errors
		})

		return res.status(400).json({
			type: 'validation_errors',
			message: 'Request body fields do not match criteria',
			errors
		})
	}

	return res.status(500).json({ type: 'unknown', message: 'Internal server error' })
}

export { errorsHandler }
