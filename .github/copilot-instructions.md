# Timelapse Service Backend Coding Instructions

## Project Overview
This is a NestJS backend service for storing and managing timelapse images uploaded from the camera frontend, providing API endpoints for the timelapse viewer.

## Technology Stack
- NestJS framework with TypeScript
- Express.js underneath
- File system operations for image storage
- REST API architecture

## Coding Standards
- Follow NestJS architecture patterns (Controllers, Services, Modules)
- Use TypeScript with proper type definitions
- Use dependency injection for services
- Follow SOLID principles
- Use async/await for asynchronous operations
- Implement proper error handling with NestJS exceptions
- Document all API endpoints with comments

## API Design Guidelines
- Follow RESTful API design principles
- Use proper HTTP status codes for responses
- Implement CORS for frontend access
- Use DTO (Data Transfer Object) classes for request/response validation
- Provide consistent error response formats
- Version API endpoints when making breaking changes

## File Handling Guidelines
- Store images in the uploads directory
- Generate filenames based on timestamps
- Implement proper error handling for file operations
- Use async file operations
- Validate incoming file content

## Error Handling
- Use NestJS HttpException for API errors
- Implement global exception filters when needed
- Log all errors with appropriate context
- Return user-friendly error messages to clients

## Performance Considerations
- Implement rate limiting for upload endpoints
- Use streams for large file operations
- Consider caching for frequently accessed images
- Implement proper cleanup mechanisms for temporary files
- Configure proper timeout handling for long-running operations
