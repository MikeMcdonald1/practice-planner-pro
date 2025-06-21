# Practice Planner Pro

A web app for musicians to log, plan, and track their practice routines.
Organize your practice goals, keep your practice history, and celebrate your progress!

## Table of Contents

- [Practice Planner Pro](#practice-planner-pro)
  - [Table of Contents](#table-of-contents)
  - [Project Description](#project-description)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)

## Project Description

Practice Planner Pro lets musicians log, plan, and track their practice sessions and goals.
Easily add, edit, and complete practice goals. Data is securely stored in Airtable to keep a record of past practice sessions.

## Features

- Add, edit, and complete practice snippets
- See active goals that are due on the app dashboard
- User-friendly UI with loading, error, and success messages
- Clean, accessible layout
- Real-time updates
- Tracks and saves all data via Airtable API

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/MikeMcdonald1/practice-planner-pro.git
   cd practice-planner-pro
   ```

2. Install Dependencies:

   ```
   npm install
   ```

3. Set up environment variables:

   - Copy .env.local.example to .env.local
   - Fill in your Airtable credentials (You will need an Airtable account and base for this project)

   ```
   VITE_PAT=your_airtable_pat_here
   VITE_BASE_ID=your_airtable_base_id_here
   VITE_TABLE_NAME=your_airtable_table_name_here
   ```

4. Run the app:

   ```
   npm run dev
   ```

## Usage

1. Navigate to "Practice Form" from the Home page.
2. Add a practice snippet by filling out all required fields and hitting the submit button.
3. Goals will display below the add practice snippet form.
4. Create as many goals as you would like for your practice session.
5. Goals can be edited by clicking the edit button.
6. Mark goals as complete as you finish them. Completed goals are hidden from the dashboard.
7. Your data persists between practice sessions via Airtable for easy access to past practice snippets.
