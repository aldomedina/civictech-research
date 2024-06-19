# Civic Tech Field Notebook App

Welcome to the Civic Tech Field Notebook App! This application is designed to facilitate the benchmarking phase of a civic tech research project for the Government of Scotland. Built with Next.js and PostgreSQL, this app serves as a digital field notebook, providing a structured environment for collecting and organizing research data, including an inquiry matrix.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [License](#license)
- [To Dos](#to-dos)

## Introduction

The Civic Tech Field Notebook App is a specialized tool developed to support researchers in the benchmarking phase of civic technology projects. It provides an intuitive interface for documenting observations, insights, and data in a systematic manner. This app includes an inquiry matrix to help structure the research process, ensuring comprehensive and consistent data collection.

## Features

- **User Authentication:** Secure login and registration for researchers.
- **Inquiry Matrix:** A structured matrix to guide and organize research questions and data.
- **Data Entry:** Easy-to-use forms for documenting observations and insights.
- **Data Management:** Tools for viewing, editing, and deleting entries.
- **Responsive Design:** Optimized for use on both desktop and mobile devices.
- **Export Functionality:** Export collected data to various formats for further analysis.

## Installation

To install and run the Civic Tech Field Notebook App locally, follow these steps:

### Prerequisites

- Node.js (v18.17.x)
- npm (v9.6.x)
- PostgreSQL (v14.5+)
- Git

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/civic-tech-field-notebook.git
   cd civic-tech-field-notebook
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up PostgreSQL:**

   - Ensure PostgreSQL is installed and running.
   - Create a new database for the app.
   - Update the `.env` file with your database credentials.

4. **Run database migrations:**

   ```bash
   npm run migrate
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

The app should now be running on `http://localhost:3000`.

## This project is a work in progress — To Dos

### Back end

- auth
- postgres integration
