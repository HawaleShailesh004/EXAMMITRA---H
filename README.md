# EXAMMITRA

A smart AI-powered companion to help students ace their exams by providing intelligent question extraction, AI-generated answers in multiple formats, and comprehensive progress tracking — all in one seamless platform.

---

## Table of Contents

- [About](#about)  
- [Features](#features)  
- [Tech Stack & Architecture](#tech-stack--architecture)  
- [Installation & Setup](#installation--setup)  
- [Usage](#usage)  
- [Agentic AI Components](#agentic-ai-components)  
- [Sponsor Technologies](#sponsor-technologies)  
- [Limitations](#limitations)  
- [Future Roadmap](#future-roadmap)  
- [License](#license)  

---

## About

EXAMMITRA leverages AI to transform how students prepare for exams. By combining OCR, LLM-powered question answering, and progress tracking, it empowers learners to efficiently study previous year question papers and improve their understanding through customized answer formats.

This project was built as a submission for the **100 Agents Hackathon 2025**, pushing the boundaries of agentic AI frameworks in education technology.

---

## Features

- Upload or scrape previous year question papers (PDFs) with OCR text extraction.  
- Automatic question identification and frequency analysis.  
- Generate AI-driven answers in multiple styles (summary, step-by-step, examples, etc.).  
- Save and track answer progress (done, revision needed).  
- User authentication with Appwrite (email/password and Google OAuth).  
- Dashboard showing preparation stats, subjects, and revision needs.  
- Clean, modern UI with smooth animations and accessibility considerations.  
- Backend powered by Express.js and Appwrite functions for OCR and scraping.  

---

## Tech Stack & Architecture

- **Frontend:** React.js, React Router, React Markdown, CSS modules  
- **Backend:** Node.js with Express.js  
- **Database & Auth:** Appwrite Cloud (Databases, Auth, Functions)  
- **OCR & Scraping:** Custom Appwrite Functions using OCR.space API and Cheerio for scraping  
- **AI Integration:** Groq API for LLM-powered answer generation  
- **Deployment:** Planned with Appwrite Cloud deployments (frontend + backend)  

Architecture Overview:  
User uploads or selects question papers → Backend extracts text and questions → Frontend displays questions → Users generate AI answers and track progress → Data stored securely in Appwrite → Dashboard summarizes user prep.

---

## Installation & Setup

1. Clone the repository:  
```bash
   git clone https://github.com/HawaleShailesh004/EXAMMITRA---H.git


2. Navigate to the frontend and backend folders:

cd exam-mitra-frontend
npm install
cd ../exam-mitra-backend
npm install

3. Setup environment variables (.env) for API keys and Appwrite credentials in both frontend and backend as needed. (No direct user input for API keys required)

4. Run the backend server:

npm run start

Run the frontend development server:

npm start
```

## Usage

- Register or login with email or Google OAuth.  
- Upload PDFs of question papers or select from scraped papers.  
- Extract questions and view AI-generated answers in various formats.  
- Mark questions as done or revision needed and track progress.  
- Navigate dashboard for quick overview of preparation status.  

## Agentic AI Components

EXAMMITRA incorporates agentic AI elements by autonomously extracting meaningful questions from unstructured PDFs, dynamically generating customized answers via LLMs, and providing intelligent progress tracking — creating an interactive autonomous assistant for exam preparation.

## Sponsor Technologies

- **Appwrite Cloud:** For backend services including database, authentication, storage, and serverless functions.  
- **Tavily Crawl:** Used (planned) for web scraping of question papers.  
- **Keywords AI:** Integrated for monitoring LLM queries and usage analytics.  
- **Mem0:** Utilized for advanced memory management in agent interactions.  
- **Superdev.build:** Leveraged for no-code environment during prototyping phases.  

## Limitations

- The current version is **not fully mobile responsive**. Mobile UI improvements are planned for future releases.  
- Some OCR and scraping results may vary in accuracy depending on PDF quality.  
- AI-generated answers depend on the quality and availability of LLM services.  

## Future Roadmap

- Enhance mobile responsiveness and accessibility.  
- Integrate additional AI copilots and agents for improved answer generation.  
- Expand scraping capabilities with Tavily Crawl API for more diverse papers.  
- Implement advanced progress analytics and gamification features.  
- Open source release with community contributions and extended documentation.  

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for exploring EXAMMITRA!  
Questions? Suggestions? Feel free to open an issue or pull request.

*This project is submitted for the 100 Agents Hackathon 2025.*

