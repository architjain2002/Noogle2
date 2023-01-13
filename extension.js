// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode=require('vscode');
const {exec}=require('child_process');
const path=require('path');
const axios=require('axios');
const fs =require('fs');
const fetch=require('node-fetch');
const cheerio = require('cheerio');
const https = require('https');
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "cody.helloWorld",
    function () {
      // The code you place here will be executed every time your command is executed
      const editor = vscode.window.activeTextEditor;
     
      let filename;
      if (editor) {
        let document = editor.document;
        filename = document.fileName;
		let extension=path.basename(filename).split(".")[1];
		let command="",temp="";
		switch (extension){
			case "cpp":
				temp="In Cpp ";
				command=`g++ ${filename}`;
				break;
			case "java":
				temp="In Java ";
				command=`java ${filename}`;
				break;
			case "py":
				temp="In python ";
				command=`python ${filename}`;
				break;
			case "c":
				temp="In C ";
				command=`gcc ${filename}`;
				break;
			case "js":
				temp="In javascript ";
				command=`node ${filename}`;
				break;
			default:
				break;
		}
        exec(command, (error, stdout, stderr) => {
          if (stderr) {
			let ind=stderr.search(/(e|E)rror/);
			
			let str=stderr.substring(ind,stderr.length-1);
			const array=str.split("\n")
            fs.writeFileSync(
              "D:\\Vinnhack\\cody\\errorFiles\\file.txt",
              temp+array[0],
              "utf8"
            );
				
			handle(temp,array[0]);
			
          }
        });
        // Display a message box to the user
        vscode.window.showInformationMessage("Hello World from Cody!");
      }
    }
  );

  context.subscriptions.push(disposable);
}




// This method is called when your extension is deactivated
function deactivate() {}


function handle(a,b){
	function fetch_demo(){
		const search=a+b;
		fetch_demo2(search);
	}
	async function fetch_demo2(search){
		const httpsAgent = new https.Agent({ keepAlive: true });
		axios.get(`https://www.googleapis.com/customsearch/v1?key=AIzaSyC6gKMMoXgPkOnnC1TTj6C60aeLxI1v_ys&cx=32c6f4cdb22f343b0&q=${search}`, {
        
    }).then((res)=>{
        console.log(res.data);
    }).catch(err=>console.error(err));
	}
	fetch_demo();
}
module.exports = {
  activate,
  deactivate,
};
