import swaggerAutogen from 'swagger-autogen'

const doc = {
  info: {
    version: 'v1.0.0',
    title: 'Voithy Patient resources',
    description: 'Implementation of HL7 FHIR Patient resource'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: ''
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer'
      }
    }
  }
}

const outputFile = './swagger_output.json'
const endpointsFiles = ['./*.ts', './api/*.ts']

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc)
