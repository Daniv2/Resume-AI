This is an AI-powered Resume and Cover Letter Generator application. Here's a breakdown of its main features:

Core Functionality

Generates professional resumes and cover letters using AI (OpenAI's GPT)
Customizes documents based on job descriptions, experience, and skills
Supports both resume and cover letter formats
Key Features

User authentication (via Supabase)
Document generation with AI
Document management (save, view, download as PDF)
Document history tracking
PDF export functionality
Technical Stack

Frontend: React + TypeScript + Vite
Styling: Tailwind CSS
Icons: Lucide React
Database: Supabase
AI: OpenAI API
Authentication: Supabase Auth
PDF Generation: html2pdf.js
Database Structure

profiles table: Stores user profile information
documents table: Stores generated resumes and cover letters
Security

Row Level Security (RLS) enabled
User-specific data access controls
Secure authentication flow
The application helps users create professional job application documents by leveraging AI to generate content based on their input about the job and their experience. Users can manage their documents through a dashboard and export them as PDFs when needed.
