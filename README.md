# 🤖 AI CLI Code Review Agent

An autonomous, command-line AI agent powered by the Gemini 2.5 Flash API. This agent operates in your terminal, utilizing a ReAct (Reasoning and Acting) loop and native function calling to autonomously scan, review, and fix code within a specified directory.

## ✨ Features

* **Fully Autonomous Execution:** Uses an internal reasoning loop to decide which files to read, analyze, and rewrite without human intervention.
* **Native Tool Calling:** Integrated directly with the file system using custom JavaScript tools (`list_files`, `read_file`, `write_file`).
* **Multi-Language Support:** Scans and reviews HTML, CSS, JavaScript, and TypeScript files.
* **Targeted Fixes:** Identifies and directly patches syntax errors, security vulnerabilities (like hardcoded keys), and code quality issues.

## 🚀 Prerequisites

Before you begin, ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* A valid [Google Gemini API Key](https://aistudio.google.com/)

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Vaibhav-Pandey7/Ai-CLI-Agent.git](https://github.com/Vaibhav-Pandey7/Ai-CLI-Agent.git)
   cd Ai-CLI-Agent