import { GoogleGenAI, Type } from "@google/genai";
import "dotenv/config";
import fs from "fs/promises"; // Use promises API for fs
import path from "path";


const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

async function list_files({ directory }) {
  let files = [];
  const extensions = [".jsx", ".html", ".ts", ".css", ".js", ".tsx"];

  async function scan(dir) {
    try {
      const items = await fs.readdir(dir);

      for (const item of items) {
        const fullpath = path.join(dir, item);

        if (
          fullpath.includes("node_modules") ||
          fullpath.includes("build") ||
          fullpath.includes("dist") ||
          fullpath.includes(".env")
        )
          continue;

        let check = await fs.stat(fullpath);

        if (check.isDirectory()) {
          await scan(fullpath);
        } else if (check.isFile()) {
          const ext = path.extname(item);
          if (extensions.includes(ext)) {
            files.push(fullpath);
          }
        }
      }
    } catch (error) {
      console.error(`Error listing files in directory ${dir}:`, error);
      // Depending on requirements, you might want to rethrow or return an error state
    }
  }
  await scan(directory);
  return { files };
}

async function read_file({ dir }) {
  try {
    const content = await fs.readFile(dir, 'utf-8');
    return { content };
  } catch (error) {
    console.error(`Error reading file ${dir}:`, error);
    return { error: `Failed to read file: ${error.message}` };
  }
}

async function write_file({ dir, content }) {
  try {
    await fs.writeFile(dir, content, 'utf-8');
    return { success: true };
  } catch (error) {
    console.error(`Error writing file ${dir}:`, error);
    return { error: `Failed to write file: ${error.message}` };
  }
}

const tools = {
  'list_files': list_files,
  'read_file': read_file,
  'write_file': write_file
};

const listFilesTool = {
  name: "list_files",
  description: "Get all JavaScript files in a directory",
  parameters: {
    type: Type.OBJECT,
    properties: {
      directory: {
        type: Type.STRING,
        description: "Directory path to scan"
      }
    },
    required: ["directory"]
  }
};

const readFileTool = {
  name: "read_file",
  description: "Read a file's content",
  parameters: {
    type: Type.OBJECT,
    properties: {
      dir: {
        type: Type.STRING,
        description: "Path to the file"
      }
    },
    required: ["dir"]
  }
};

const writeFileTool = {
  name: "write_file",
  description: "Write fixed content back to a file",
  parameters: {
    type: Type.OBJECT,
    properties: {
      dir: {
        type: Type.STRING,
        description: "Path to the file to write"
      },
      content: {
        type: Type.STRING,
        description: "The fixed/corrected content"
      }
    },
    required: ["dir", "content"]
  }
};


async function runAgent(directoryPath) {
  console.log(`🔍 Reviewing: ${directoryPath}\n`);

  const History = [{
    role: 'user',
    parts: [{ text: `Review and fix all JavaScript code in: ${directoryPath}` }]
  }];

  while (true) {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: History,
      config: {
        systemInstruction: `You are an expert JavaScript code reviewer and fixer.

**Your Job:**
1. Use list_files to get all HTML, CSS, JavaScript, and TypeScript files in the directory
2. Use read_file to read each file's content
3. Make the code production ready


4. Use write_file to FIX the issues you found (write corrected code back)
5. After fixing all files, respond with a summary report in TEXT format

**Summary Report Format:**
📊 CODE REVIEW COMPLETE

Total Files Analyzed: X
Files Fixed: Y

🔴 SECURITY FIXES:
- file.js:line - Fixed hardcoded API key
- auth.js:line - Removed eval() usage

🟠 BUG FIXES:
- app.js:line - Added null check for user object
- index.html:line - Added missing alt attribute

🟡 CODE QUALITY IMPROVEMENTS:
- styles.css:line - Removed duplicate styles
- script.js:line - Removed console.log statements

Be practical and focus on real issues. Actually FIX the code, don't just report.`,
        tools: [{
          functionDeclarations: [listFilesTool, readFileTool, writeFileTool]
        }]
      }
    });

    // Process ALL function calls at once
    if (result.functionCalls?.length > 0) {
      
      // Execute all function calls
      for (const functionCall of result.functionCalls) {
        const { name, args } = functionCall;
        
        console.log(`📌 ${name}`);
        const toolResponse = await tools[name](args);

        // Add function call to history
        History.push({
          role: "model",
          parts: [{ functionCall }]
        });

        // Add function response to history
        History.push({
          role: "user",
          parts: [{
            functionResponse: {
              name,
              response: { result: toolResponse }
            }
          }]
        });
      }
      
    } else {
      console.log('\n' + result.text);
      break;
    }
  }
}

// node agent.js ../tester

const directory = process.argv[2] || '.';

await runAgent(directory);