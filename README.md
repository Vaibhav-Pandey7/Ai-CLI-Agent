# 🤖 AI CLI Code Review Agent

An autonomous, command-line AI agent powered by the Gemini 2.5 Flash API. This agent operates in your terminal, utilizing a ReAct (Reasoning and Acting) loop and native function calling to autonomously scan, review, and fix code within a specified directory.

---

## ✨ Features

- **Fully Autonomous Execution:** Uses an internal reasoning loop to decide which files to read, analyze, and rewrite without human intervention.
- **Native Tool Calling:** Integrated directly with the file system using custom JavaScript tools (`list_files`, `read_file`, `write_file`).
- **Multi-Language Support:** Scans and reviews HTML, CSS, JavaScript, and TypeScript files.
- **Targeted Fixes:** Identifies and directly patches syntax errors, security vulnerabilities (like hardcoded keys), and code quality issues.

---

## 🚀 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- A valid [Google Gemini API Key](https://aistudio.google.com/)

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Vaibhav-Pandey7/Ai-CLI-Agent.git
cd Ai-CLI-Agent
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Set up environment variables

Create a `.env` file in the root directory and add your Gemini API key:

```env
GEMINI_API_KEY=your_api_key_here
```

---

## 💻 Usage

Run the agent by executing the main file and passing the target directory as an argument.

### Example: Review a folder named `tester` located one level up

```bash
node index.js ../tester
```

### Example: Review the current directory

```bash
node index.js .
```

The agent will output its thought process in the terminal, execute function calls, and provide a final summary report of all the files it fixed.

---

## ⚠️ Disclaimer

Use with caution. This agent has the capability to overwrite and modify files directly. It is highly recommended to run this agent only on directories that are tracked by Git or backed up, so you can easily discard unwanted changes.

---

## 🔮 Future Scope

- Implementing Human-in-the-Loop (HITL) authorization before file overwrites.
- Adding token/context window management for analyzing massive codebases.