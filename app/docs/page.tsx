"use client";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const spec = {
  openapi: "3.0.3",
  info: {
    title: "Firebase Auth API",
    description: "Authentication API powered by Firebase Authentication.",
    version: "1.0.0",
  },
  servers: [
    {
      url: "https://login-fire-outh.firebaseapp.com",
      description: "Firebase Hosted App",
    },
  ],
  tags: [{ name: "Authentication", description: "Login, signup, and session management" }],
  paths: {
    "/login": {
      post: {
        tags: ["Authentication"],
        summary: "Sign in with email and password",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/EmailPasswordRequest" },
            },
          },
        },
        responses: {
          200: { description: "Login successful — redirected to /dashboard" },
          401: { description: "Invalid credentials" },
          404: { description: "No user found with this email" },
        },
      },
    },
    "/login/google": {
      post: {
        tags: ["Authentication"],
        summary: "Sign in with Google (OAuth popup)",
        responses: {
          200: { description: "Google login successful — redirected to /dashboard" },
          401: { description: "Google sign-in was cancelled or failed" },
        },
      },
    },
    "/signup": {
      post: {
        tags: ["Authentication"],
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/EmailPasswordRequest" },
            },
          },
        },
        responses: {
          201: { description: "Account created successfully" },
          400: { description: "Weak password or malformed email" },
          409: { description: "Email already in use" },
        },
      },
    },
    "/dashboard": {
      get: {
        tags: ["Authentication"],
        summary: "Access the protected dashboard",
        security: [{ FirebaseAuth: [] }],
        responses: {
          200: { description: "User is authenticated" },
          302: { description: "Not authenticated — redirected to /login" },
        },
      },
    },
    "/logout": {
      post: {
        tags: ["Authentication"],
        summary: "Sign out the current user",
        security: [{ FirebaseAuth: [] }],
        responses: {
          200: { description: "Successfully signed out" },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      FirebaseAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "Firebase ID Token",
      },
    },
    schemas: {
      EmailPasswordRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email", example: "user@example.com" },
          password: { type: "string", format: "password", minLength: 6, example: "mysecurepassword" },
        },
      },
    },
  },
};

export default function DocsPage() {
  return (
    <div>
      <SwaggerUI spec={spec} />
    </div>
  );
}